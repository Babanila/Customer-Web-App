import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { cx, css } from 'emotion'
import PageHeader from './PageHeader'
import CustomerList from './CustomerList'
import CustomerDetails from './CustomerDetails'
import CustomerForm from './CustomerForm'
import ErrorComponent from './ErrorComponent'

const rootDiv = css`
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <div className={cx(rootDiv)}>
      <PageHeader />
      <Switch>
        <Route exact path="/" render={(props) => <CustomerList {...props} />} />
        <Route path="/customer/:id" render={(props) => <CustomerDetails {...props} />} />
        <Route path="/new_customer" render={(props) => <CustomerForm {...props} />} />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  )
}

export default App
