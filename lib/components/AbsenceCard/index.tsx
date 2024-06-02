'use client'
import Badge from '@/lib/components/Badge'
import LoadingSpinner from '@/lib/components/LoadingSpinner'
import useAbsence from '@/lib/hooks/useAbsence'
import { IAbsenceType } from '@/lib/types/types'
import { formattedDate, getEndDate } from '@/lib/utils/dateHelper'
import getStatusType from '@/lib/utils/getStatusType'
import Link from 'next/link'
import { useMemo } from 'react'

const headers: Record<string, Function> = {
  absenceType: (absence: IAbsenceType) => getStatusType(absence.absenceType),
  startDate: (absence: IAbsenceType) => formattedDate(absence.startDate),
  days: (absence: IAbsenceType) => absence.days,
  endDate: (absence: IAbsenceType) =>
    formattedDate(getEndDate(absence.startDate, absence.days)),
  approved: (absence: IAbsenceType) => (
    <Badge
      color={absence.approved ? 'blue' : 'grey'}
      text={absence.approved ? 'Yes' : 'No'}
    />
  ),
  conflict: (absence: IAbsenceType) => (
    <Badge
      color={absence.conflicts ? 'green' : 'red'}
      text={absence.conflicts ? 'No' : 'yes'}
    />
  )
}

const AbsenceCard = ({ id }: { id: string }) => {
  const { data: absences, isLoading, error } = useAbsence()

  const getEmployeeAbsences: IAbsenceType[] =
    useMemo(
      () => absences && absences.filter(absence => absence.employee.id === id),
      [absences, id]
    ) ?? []

  if (isLoading || !absences) return <LoadingSpinner />
  if (error) return <div>error...</div>

  return (
    <div className="container mx-auto p-4">
      <Link className="uppercase" href={'/'}>
        Back To Previous Page
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {getEmployeeAbsences.length > 0 &&
          getEmployeeAbsences.map(absence => (
            <div key={absence.id} className="p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                {absence.employee.firstName} {absence.employee.lastName}
              </h2>
              <div className="flex flex-col gap-2">
                {Object.keys(headers).map(key => (
                  <div
                    key={key}
                    className="flex justify-start align-center gap-6 capitalize"
                  >
                    <div>{key}: </div>
                    <div>{headers[key](absence)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AbsenceCard
