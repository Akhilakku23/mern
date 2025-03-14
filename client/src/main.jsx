import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react"
import { redirect } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-gwh0h4gkyuwkf747.us.auth0.com"
    clientId="dkHSLkwp4Bql6JWLZoZ0dI2uoWe5vTND"
    authorizationParams={{
      redirect_uri: "http://localhost:5174"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    >
    <App />
    </Auth0Provider>
  </StrictMode>,
)
