import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import EmployeeForm from './components/EmployeeForm'
import { store } from './lib/store'

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

function EmployeeApp() {
  return (
    <Container className="">
      <h1>Employee Records</h1>
      <EmployeeForm/>
    </Container>
  )
}

function App() {
  return (
    <Provider store={store}>
      <EmployeeApp />
    </Provider>
  );
}

export default App
