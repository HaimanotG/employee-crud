import axios from 'axios'
import { IEmployee } from '../interfaces/IEmployee'

const BASE_URL = 'http://localhost:4000/employees'

export const getEmployees = async (): Promise<IEmployee[]> =>
  axios.get(BASE_URL).then((res) => res.data)

export const createEmployee = async (employee: IEmployee): Promise<IEmployee> =>
  axios.post(`${BASE_URL}`, employee).then((res) => res.data)

export const updateEmployee = async (employee: IEmployee): Promise<IEmployee> =>
  axios.put(`${BASE_URL}/${employee._id}`, employee).then((res) => res.data)

export const deleteEmployee = async (employee: IEmployee): Promise<IEmployee> =>
  axios.delete(`${BASE_URL}/${employee._id}`).then((res) => res.data)
