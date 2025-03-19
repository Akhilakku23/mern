import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://dev-gwh0h4gkyuwkf747.us.auth0.com/api/v2/",
    issuerBaseURL: "https://dev-gwh0h4gkyuwkf747.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck