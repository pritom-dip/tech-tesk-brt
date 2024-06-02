export const statusMap: Record<string, string> = {
  SICKNESS: 'Sickness',
  MEDICAL: 'Medical',
  ANNUAL_LEAVE: 'Annual Leave'
}

const getStatusType = (status: string) => {
  return statusMap[status]
}

export default getStatusType
