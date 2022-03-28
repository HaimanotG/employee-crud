import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import DeleteIcon from '../icons/Delete'
import EditIcon from '../icons/Edit'
import { IEmployee } from '../interfaces/IEmployee'
import { removeEmployee } from '../lib/store'

import { StyledTable, TBody, TD, TH, THead, TR } from './styles/table'

const ActionWrappers = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Table: FC<{
  employees: IEmployee[]
  columns: string[]
  openModal: () => void
  setIsEditingWithId: (id: string) => void
}> = ({ employees, columns, openModal, setIsEditingWithId }) => {
  const dispatch = useDispatch()

  return (
    <StyledTable>
      <THead>
        {columns.map((c) => (
          <TH key={c}>{c}</TH>
        ))}
        <TH>Actions</TH>
      </THead>
      <TBody>
        {employees.map((employee) => {
          const { _id, name, gender, salary, dateOfBirth } = employee
          return (
            <TR key={_id}>
              <TD>{name}</TD>
              <TD>{gender}</TD>
              <TD>{dateOfBirth}</TD>
              <TD>{salary}</TD>
              <TD>
                <ActionWrappers>
                  <EditIcon
                    onClick={() => {
                      openModal()
                      setIsEditingWithId(_id ?? '')
                    }}
                  />
                  <DeleteIcon
                    className=""
                    onClick={() => {
                      const confirm = window.confirm(
                        'Are you sure you want to delete this employees record?',
                      )

                      if (confirm) {
                        dispatch(removeEmployee(employee))
                      }
                    }}
                  />
                </ActionWrappers>
              </TD>
            </TR>
          )
        })}
      </TBody>
    </StyledTable>
  )
}

export default Table
