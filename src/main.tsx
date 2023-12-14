import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { getInitialState } from './state'

const initialState = getInitialState()
console.log('initialState', initialState)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App initialState={initialState} />
  </React.StrictMode>,
)
