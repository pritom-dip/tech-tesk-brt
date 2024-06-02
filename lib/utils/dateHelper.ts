import config from '@/lib/config'

export const getEndDate = (startDate: string, daysToAdd: number): string => {
  const start = new Date(startDate)

  if (isNaN(start.getTime())) {
    throw new Error('Invalid start date')
  }

  const endDate = new Date(start)
  endDate.setDate(start.getDate() + daysToAdd)

  return endDate.toISOString()
}

export const formattedDate = (value: string): string => {
  return new Date(value).toLocaleDateString(config.dateFormat)
}
