import { useEffect, useState } from 'react'
import EmployeeFormModal from './EmployeeFormModal'
import Table from './Table'

import { useSelector, useDispatch } from 'react-redux'

import {
  selectEmployees,
  fetchEmployees,
} from '../lib/store'
import { IEmployee } from '../interfaces/IEmployee'

const EmployeeForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')

  const setIsEditingWithId = (id: string) => {
    setSelectedId(id)
    setIsEditing(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const dispatch = useDispatch()
  const employees = useSelector(selectEmployees) as IEmployee[]
  useEffect(() => {
    dispatch(fetchEmployees())
  }, [])

  return (
    <div>
      <button
        style={{
          border: 'none',
          display: 'block',
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          lineHeight: '1.2',
          textAlign: 'center',
          color: '#fff',
          backgroundColor: '#04aa6d',
          marginBottom: '10px',
        }}
        onClick={() => {
          setIsOpen(true)
          setIsEditing(false)
        }}
      >
        Add Employee
      </button>
      <Table
        columns={['Name', 'Gender', 'Date of Birth', 'Salary']}
        employees={employees.map(e => ({...e, _id: e._id}))}
        setIsEditingWithId={setIsEditingWithId}
        openModal={openModal}
      />
      <EmployeeFormModal
        data={employees.filter((v) => (v._id = selectedId))[0]}
        isEditing={isEditing}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  )
}

export default EmployeeForm
