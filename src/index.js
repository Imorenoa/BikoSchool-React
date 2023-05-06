import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/App'
import {DarkModeProvider } from './themeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <DarkModeProvider>
            <App />
      </DarkModeProvider>
  </React.StrictMode>
)
