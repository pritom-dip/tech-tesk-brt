import AbsenceCard from '@/lib/components/AbsenceCard'
import useAbsence from '@/lib/hooks/useAbsence'
import { IAbsenceType } from '@/lib/types/types'
import { render, screen } from '@testing-library/react'

jest.mock('@/lib/hooks/useAbsence')

const mockedUseAbsence = useAbsence as jest.MockedFunction<typeof useAbsence>

const mockAbsences: IAbsenceType = {
  id: '1',
  startDate: '12/12/2023',
  days: 1,
  absenceType: 'SICKNESS',
  approved: true,
  conflicts: false,
  employee: {
    firstName: `FirstName`,
    lastName: `LastName`,
    id: `2ea05a52-4e31-450d-bbc4-5a6c73167d17`
  }
}

describe('AbsenceCard component', () => {
  afterEach(() => jest.clearAllMocks())

  test('should render successfully', () => {
    mockedUseAbsence.mockReturnValueOnce({
      data: [mockAbsences],
      isLoading: false,
      error: null
    })
    render(<AbsenceCard id="1" />)

    const renderedElement = screen.getByText(/Back To Previous Page/i)
    expect(renderedElement).toBeInTheDocument()
  })

  test('should display loading', () => {
    mockedUseAbsence.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: null
    })
    render(<AbsenceCard id="1" />)

    const loadingElement = screen.getByTestId('loading')
    expect(loadingElement).toBeInTheDocument()
  })

  it('should render employee absences data', () => {
    mockedUseAbsence.mockReturnValueOnce({
      data: [mockAbsences],
      isLoading: false,
      error: null
    })

    render(<AbsenceCard id={mockAbsences.employee.id} />)

    expect(screen.getByText(/FirstName/i)).toBeInTheDocument()
    expect(screen.getByText(/AbsenceType/i)).toBeInTheDocument()
    expect(screen.getByText(/Sickness/i)).toBeInTheDocument()
  })
})
