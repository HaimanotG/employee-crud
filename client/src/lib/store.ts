import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from './api'
import { IEmployee } from '../interfaces/IEmployee'
import { put, takeEvery } from 'redux-saga/effects'

function* getEmployeeActions() {
  const employees: IEmployee[] = yield getEmployees()
  yield put({ type: 'EMPLOYEES_FETCH_SUCCEEDED', payload: employees })
}

function* createEmployeeAction({
  payload,
}: {
  type: 'CREATE_EMPLOYEE_REQUESTED'
  payload: IEmployee
}) {
  yield createEmployee(payload)
  yield put({ type: 'EMPLOYEES_FETCH_REQUESTED' })
}

function* updateEmployeeAction({
  payload,
}: {
  type: 'UPDATE_EMPLOYEE_REQUESTED'
  payload: IEmployee
}) {
  yield updateEmployee(payload)
  yield put({ type: 'EMPLOYEES_FETCH_REQUESTED' })
}

function* deleteEmployeeAction({
  payload,
}: {
  type: 'DELETE_EMPLOYEE_REQUESTED'
  payload: IEmployee
}) {
  yield deleteEmployee(payload)
  yield put({ type: 'EMPLOYEES_FETCH_REQUESTED' })
}

function* rootSaga() {
  yield takeEvery('EMPLOYEES_FETCH_REQUESTED', getEmployeeActions)
  yield takeEvery('UPDATE_EMPLOYEE_REQUESTED', updateEmployeeAction)
  yield takeEvery('DELETE_EMPLOYEE_REQUESTED', deleteEmployeeAction)
  yield takeEvery('CREATE_EMPLOYEE_REQUESTED', createEmployeeAction)
}

const reducer = (
  state: IEmployee[] = [],
  action: { type: 'EMPLOYEES_FETCH_SUCCEEDED'; payload: IEmployee[] },
) => {
  switch (action.type) {
    case 'EMPLOYEES_FETCH_SUCCEEDED':
      return action.payload
    default:
      return state
  }
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const selectEmployees = (state: IEmployee[]): IEmployee[] => state
export const fetchEmployees = () => ({ type: 'EMPLOYEES_FETCH_REQUESTED' })

export const removeEmployee = (employee: IEmployee) => ({
  type: 'DELETE_EMPLOYEE_REQUESTED',
  payload: employee,
})
export const addEmployee = (employee: IEmployee) => ({
  type: 'CREATE_EMPLOYEE_REQUESTED',
  payload: employee,
})

export const editEmployee = (employee: IEmployee) => ({
  type: 'UPDATE_EMPLOYEE_REQUESTED',
  payload: employee,
})
