export interface IEmployeeType {
  firstName: string
  lastName: string
  id: string
}

export interface Absence {
  id: string | number
  startDate: string
  days: number
  absenceType: string
  employee: IEmployeeType
  approved: true
}

export type IAbsenceType = Absence & { conflicts?: boolean }
