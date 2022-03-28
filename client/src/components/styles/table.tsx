import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const THead = styled.thead``

export const TBody = styled.tbody``

export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`

export const TH = styled.th`
  border: 1px solid #ddd;
  padding: 8px;

  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
`

export const TD = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`
