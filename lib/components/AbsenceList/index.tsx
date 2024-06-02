'use client'

import useAbsence from '@/lib/hooks/useAbsence'
import LoadingSpinner from '@/lib/components/LoadingSpinner'
import Table from '@/lib/components/Table'

const AbsenceList = () => {
  const { data: absences, isLoading, error } = useAbsence()

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>error</div>

  return (
    <div>
      <Table absences={absences || []} />
    </div>
  )
}

export default AbsenceList
