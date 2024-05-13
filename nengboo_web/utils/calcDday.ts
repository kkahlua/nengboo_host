const calculateDday = (expirationDate: string): number => {
  const today = new Date()
  const expireDate = new Date(expirationDate)
  const diffTime = Math.abs(expireDate.getTime() - today.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export default calculateDday
