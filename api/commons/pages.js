// formatpage khi trả vê cho client có dạng list
export const convertPage = (current, total, next, limit) => {
  return {
    current,
    limit,
    total,
    next,
  }
}

export const testpage = () => {}
