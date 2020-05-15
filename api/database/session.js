import { startSession } from 'mongoose'

export const test = () => {}

// func chay cung voi session
export const runWithSession = async (process, successcb, errorcb) => {
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

    // func chay trong session
    // param bao gồm session và func commit session
    if (typeof process === 'function') {
      process(session, async () => {
        await session.commitTransaction()
      })
    }
  } catch (error) {
    await session.abortTransaction()
    if (typeof errorcb === 'function') {
      errorcb(error)
    }
  } finally {
    // ket thuc tat ca se ket thuc session
    if (session) session.endSession()
  }
}
