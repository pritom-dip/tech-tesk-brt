import { getEndDate, formattedDate } from '@/lib/utils/dateHelper'

describe('Date Helper Function', () => {
  it('should return the correct end date if everything provides correctly', () => {
    const startDate = '2023-06-01T00:00:00.000Z'
    const daysToAdd = 10
    const expectedEndDate = '2023-06-11T00:00:00.000Z'

    expect(getEndDate(startDate, daysToAdd)).toBe(expectedEndDate)
  })

  it('should throw an error for invalid dates', () => {
    const invalidStartDate = 'invalid-date'
    const daysToAdd = 10

    expect(() => getEndDate(invalidStartDate, daysToAdd)).toThrow(
      'Invalid start date'
    )
  })

  it('should change the month if days are more than the actual month days', () => {
    const startDate = '2023-01-31T00:00:00.000Z'
    const daysToAdd = 1
    const expectedEndDate = '2023-02-01T00:00:00.000Z'

    expect(getEndDate(startDate, daysToAdd)).toBe(expectedEndDate)
  })
})

describe('Formatted Date Function', () => {
  it('should format the date in en-GB format', () => {
    const date = '2023-06-01T00:00:00.000Z'
    const expectedFormattedDate = '01/06/2023'

    expect(formattedDate(date)).toBe(expectedFormattedDate)
  })
})
