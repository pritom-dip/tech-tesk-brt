import AbsenceCard from '@/lib/components/AbsenceCard'

const SingleAbsence = ({ params }: { params: { id: string } }) => {
  return (
    <main className="container mx-auto p-4">
      <AbsenceCard id={params.id} />
    </main>
  )
}

export default SingleAbsence
