import config from '@/lib/config'
import { Absence, IAbsenceType } from '@/lib/types/types'
import axios from 'axios'

const getAllAbsences = async (): Promise<IAbsenceType[]> => {
  const { data: absencesData } = await axios.get<Absence[]>(
    config.ABSENCE_API_URL
  )

  const absencesWithConflicts: IAbsenceType[] = await Promise.all(
    absencesData.map(async absence => {
      const { data } = await axios.get<Partial<IAbsenceType>>(
        `${config.CONFLICT_API_URL}/${absence.id}`
      )
      return {
        ...absence,
        conflicts: data.conflicts
      }
    })
  )

  return absencesWithConflicts
}
export default getAllAbsences
