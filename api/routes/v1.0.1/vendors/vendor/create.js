import express from 'express'
import { model, startSession } from 'mongoose'
import { ObjectId } from 'mongodb'
import upload from '../../../../commons/upload'
import { res422, res200 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import {
  VendorSchema,
  UserSchema,
  LocationSchema,
  CategorySchema,
} from '../../../../database/Schemas'
import { generateHash, generateHashPromise } from '../../../../database/Schemas/User'
import { revertPath } from '../../../../commons/revertPath'

const Vendor = model(table.vendor, VendorSchema)
const User = model(table.user, UserSchema)
const Location = model(table.location, LocationSchema)
const Category = model(table.category, CategorySchema)

const router = express.Router()

// api tạo nhà cung cấp
// yêu cầu nhập đầy đủ thông tin: email, password, confirm_password, phone,
/**
 * // dung de tạo tài khoản
 * email
 * password
 * confirm_password
 *
 * // tạo thông tin cho nhà cung cấp
 * name
 * phone
 * image
 * description
 * base[{ name, lat, long }]
 * category
 * city
 */
router.post('/create', upload.single('image'), async (req, res) => {
  const {
    email,
    password,
    confirm_password,
    name,
    phone,
    description,
    base,
    category,
    city,
  } = req.body
  console.log('base', base)

  // check null cac truong
  if (
    !email ||
    !password ||
    !confirm_password ||
    !name ||
    !phone ||
    !Array.isArray(base) ||
    base.length < 1 ||
    !category ||
    !city ||
    !req.file
  ) {
    res422(res, 'Thiếu param')
    return
  }

  // kiem tra xem 2 password co giong nhau ko
  if (password !== confirm_password) {
    res422(res, 'confirm_password không giống với password')
    return
  }

  let session

  try {
    // khoi tai transaction
    session = await startSession({
      defaultTransactionOptions: {
        writeConcern: { w: 'majority' },
        readConcern: { level: 'snapshot' },
      },
    })

    await session.startTransaction({
      writeConcern: { w: 'majority' },
      readConcern: { level: 'snapshot' },
    })

    // kiem tra xem email da duoc tao hay chua
    const rFindUser = await User.findOne({ email })

    if (rFindUser) {
      res422(res, 'Tài khoản đã tồn tại')
      return
    }

    // gne hash key lam password
    const newHash = await generateHashPromise({ email, password, type: 'vendor' })

    // phải sử dụng lưu dạng mảng mới sử dụng session được (cay)
    const newUser = await User.insertMany([{ ...newHash }], { session })

    if (newUser.length <= 0) throw Error('Thêm tài khoản không thành công')

    // tạo nhà cung cấp
    const paramVendor = {
      name,
      description,
      image: revertPath(req.file.path),
      category,
      city,
      phone,
    }

    const newVendor = await Vendor.insertMany([paramVendor], { session })

    if (newVendor.length <= 0) throw Error('Thêm nhà cung cấp không thành công')

    // update số lượng vendor trong category và city
    await Category.findByIdAndUpdate(
      category,
      {
        $inc: {
          total_vendor: 1,
        },
      },
      { session }
    )

    await Location.findByIdAndUpdate(
      city,
      {
        $inc: {
          total_vendor: 1,
        },
      },
      { session }
    )

    // update vendor_id vào tài khoản mới tạo
    await User.findByIdAndUpdate(
      newUser[0].getId(),
      {
        $set: {
          vendor: newVendor[0].getId(),
        },
      },
      {
        session,
      }
    )

    // lưu thông tin các cơ sở của vendor
    const parambase = base.reduce((pre, next) => {
      return [...pre, { ...next, vendor: newVendor[0].getId(), type: 'base_of_vendor' }]
    }, [])

    const dataBase = await Location.insertMany(parambase, { session, new: true })

    const arrBase = dataBase.reduce((pre, next) => {
      return [...pre, next.getId()]
    }, [])

    // lưu mảng id các cơ sở của vendor vào
    await Vendor.findByIdAndUpdate(
      newVendor[0].getId(),
      {
        $set: {
          base: arrBase,
        },
      },
      { session }
    )
    await session.commitTransaction()
    // await session.abortTransaction()
    res200(res, '')
  } catch (error) {
    await session.abortTransaction()
    res422(res, error)
  } finally {
    // ket thuc tat ca se ket thuc session
    if (session) session.endSession()
  }
})

export default router
