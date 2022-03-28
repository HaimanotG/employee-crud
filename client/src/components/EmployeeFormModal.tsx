import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'
import { IEmployee } from '../interfaces/IEmployee'
import { addEmployee, editEmployee } from '../lib/store'

const StyledInput = styled.input`
  border: 1px solid #ddd;
  padding: 16px;
`

const EmployeeFormModal: FC<{
  data: IEmployee
  isOpen: boolean
  closeModal: () => void
  isEditing: boolean
}> = ({ isOpen, closeModal, isEditing, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>({
    defaultValues: isEditing ? data : ({} as IEmployee),
  })
  const dispatch = useDispatch()
  const onSubmit = (data: IEmployee) => {
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all fields')
      return
    }
    if (isEditing) {
      dispatch(editEmployee(data))
    } else {
      dispatch(addEmployee(data))
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        as="div"
        onClose={closeModal}
      >
        <div
          style={{ minHeight: '100vh', padding: '0 16px', textAlign: 'center' }}
        >
          <Dialog.Overlay
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '50%',
              padding: '13px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 10px rgba(0,0,0,.2)',
              zIndex: '1',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'all .2s ease-in-out',
              transformOrigin: 'top',
            }}
          >
            <Dialog.Title
              as="h3"
              style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                lineHeight: '1.2',
                margin: '0 0 .5rem',
                textAlign: 'center',
                color: '#333',
              }}
            >
              {isEditing ? 'Edit Employee' : 'Add Employee'}
            </Dialog.Title>
            <div className="mt-2" style={{ margin: '20px auto' }}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <StyledInput placeholder="Name" {...register('name')} />
                <StyledInput
                  placeholder="Date of Birth"
                  {...register('dateOfBirth')}
                />
                <StyledInput placeholder="Gender" {...register('gender')} />
                <StyledInput placeholder="Salary" {...register('salary')} />
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    display: 'block',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    lineHeight: '1.2',
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#04aa6d',
                  }}
                  type="submit"
                  onClick={closeModal}
                >
                  Save
                </button>
              </form>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <button
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                type="button"
                style={{
                  border: '1px solid #04aa6d',
                  display: 'block',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1.5rem',
                  fontWeight: '500',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  width: '100%',
                  color: '#333',
                  backgroundColor: '#fff',
                }}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EmployeeFormModal
