import Table from '@/lib/components/Table'
import { IAbsenceType } from '@/lib/types/types'
import { render, screen } from '@testing-library/react'

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

describe('Table Component', () => {
  it('Should load successfully', () => {
    render(<Table absences={mockAbsences} />)
    const element = screen.getByText(/absences/i)
    const tableElement = screen.getByRole('table')
    expect(element).toBeInTheDocument()
    expect(tableElement).toBeInTheDocument()
  })

  it('Should display the table headers', () => {
    render(<Table absences={mockAbsences} />)
    const columnHeaderElements = screen.getAllByRole('columnheader')
    const result = Object.keys(mockAbsences[0]).length
    expect(columnHeaderElements.length).toBe(result)
  })

  it('Should display all the rows', () => {
    render(<Table absences={mockAbsences} />)
    const rowElements = screen.getAllByRole('row')
    expect(rowElements.length).toBe(mockAbsences.length + 1)
  })
})
