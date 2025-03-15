import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
  domain="dev-gwh0h4gkyuwkf747.us.auth0.com"
  clientId="fER7MbowcsmcQ7biTUGnSL1H5f5PHOjv"
  authorizationParams={{
    redirect_uri: "http://localhost:5173",
    audience: "https://dev-gwh0h4gkyuwkf747.us.auth0.com/api/v2/", // ✅ Correct API Identifier
    scope: "openid profile email"
  }}
>
  <App />
</Auth0Provider>

  </StrictMode>
);
