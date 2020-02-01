export const res422 = res => {
  res.status(422)
  res.send({ message: 'Nhập thiếu trường dữ liệu' })
}

export const res401 = res => {
  res.status(401)
  res.send({ message: 'Không có quyền truy cập' })
}
