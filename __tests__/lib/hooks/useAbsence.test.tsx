import useAbsence from '@/lib/hooks/useAbsence'
import getAllAbsences from '@/lib/services/absence.service'
import { IAbsenceType } from '@/lib/types/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

jest.mock('@/lib/services/absence.service')

const mockedGetAllAbsences = getAllAbsences as jest.MockedFunction<
  typeof getAllAbsences
>

const mockAbsences: IAbsenceType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  startDate: '12/12/2023',
  days: 1,
  absenceType: 'SICKNESS',
  approved: true,
  conflicts: false,
  employee: {
    firstName: `FirstName ${index}`,
    lastName: `LastName ${index}`,
    id: `id ${index}`
  }
}))

describe('useAbsence Hook', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    return wrapper
  }

  afterEach(() => jest.clearAllMocks())

  it('should return loading state initially', async () => {
    ;(mockedGetAllAbsences as jest.Mock).mockResolvedValueOnce([])

    const { result } = renderHook(() => useAbsence(), {
      wrapper: createWrapper()
    })

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('should return data after fetching', async () => {
    ;(mockedGetAllAbsences as jest.Mock).mockResolvedValueOnce(mockAbsences)

    const { result } = renderHook(() => useAbsence(), {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual(mockAbsences)
  })
})
