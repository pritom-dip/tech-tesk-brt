export const statusMap: Record<string, string> = {
  SICKNESS: 'Sickness',
  MEDICAL: 'Annual Leave',
  ANNUAL_LEAVE: 'Medical'
}

const getStatusType = (status: string) => {
  return statusMap[status]
}

export default getStatusType
