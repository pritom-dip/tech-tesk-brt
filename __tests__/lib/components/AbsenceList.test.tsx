import AbsenceList from '@/lib/components/AbsenceList'
import { IAbsenceType } from '@/lib/types/types'
import { useQuery } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn()
}))

const mockAbsences: IAbsenceType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  startDate: '12/12/2023',
  days: 1,
  absenceType: 'SICKNESS',
  endDate: '13/12/2023',
  approved: true,
  conflicts: false,
  employee: {
    firstName: `FirstName ${index}`,
    lastName: `LastName ${index}`,
    id: `id ${index}`
  }
}))

describe('AbsenceList component Test', () => {
  afterEach(() => jest.clearAllMocks())

  it('should load loading initially', () => {
    ;(useQuery as jest.Mock).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: null
    })
    render(<AbsenceList />)
    const loadingElement = screen.getByTestId('loading')
    expect(loadingElement).toBeInTheDocument()
  })

  it('should display data', () => {
    ;(useQuery as jest.Mock).mockReturnValueOnce({
      data: mockAbsences,
      isLoading: false,
      error: null
    })
    render(<AbsenceList />)
    const element = screen.getByText(/absences/i)
    expect(element).toBeInTheDocument()
  })

  it('display error if there is an error', () => {
    ;(useQuery as jest.Mock).mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: 'Error to fetch'
    })
    render(<AbsenceList />)
    const errorElement = screen.getByText(/error/i)
    expect(errorElement).toBeInTheDocument()
  })
})
