// dường dân ảnh khi trả về cho client
export const revertPath = path => {
  return path.replace('../storage/', '/')
}

// lấy ra đúng đường dẫn lưu ảnh
export const converPath = path => {
  return `../storage${path}`
}
