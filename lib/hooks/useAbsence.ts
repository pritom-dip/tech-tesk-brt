import { useQuery } from '@tanstack/react-query'
import getAllAbsences from '../services/absence.service'

export const getAbsencesKey = () => ['absences']

const useAbsence = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: getAbsencesKey(),
    queryFn: () => getAllAbsences()
  })
  return { isLoading, error, data }
}

export default useAbsence
