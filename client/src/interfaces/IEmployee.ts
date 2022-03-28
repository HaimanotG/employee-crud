export type GenderType = 'Female' | 'Male'

export interface IEmployee {
  _id?: string
  name: string
  dateOfBirth: string
  salary: number
  gender: GenderType
}
