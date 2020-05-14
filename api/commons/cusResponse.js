export const res422 = (res, message) => {
  res.status(422)
  res.send({ message: message || 'Nhập thiếu trường dữ liệu' })
}

export const res401 = res => {
  res.status(401)
  res.send({ message: 'Không có quyền truy cập' })
}

export const res200 = (res, data, page) => {
  const response = {
    success: true,
    data,
  }

  if (page) {
    response.page = page
  }

  res.status(200)
  res.send(response)
}
