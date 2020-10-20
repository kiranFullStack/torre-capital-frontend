import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Login} />
        <ProtectedRoute exact path='/todo' component={Dashboard} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  )
}

export default App
