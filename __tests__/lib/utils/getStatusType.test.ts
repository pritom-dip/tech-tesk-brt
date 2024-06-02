import getStatusType from '@/lib/utils/getStatusType'

describe('getStatusType Function', () => {
  it('should return the correct StatusType for SICKNESS', () => {
    const status = 'SICKNESS'
    const expectedStatusType = 'Sickness'

    expect(getStatusType(status)).toBe(expectedStatusType)
  })

  it('should return the correct StatusType for ANNUAL_LEAVE', () => {
    const status = 'ANNUAL_LEAVE'
    const expectedStatusType = 'Annual Leave'

    expect(getStatusType(status)).toBe(expectedStatusType)
  })
})
