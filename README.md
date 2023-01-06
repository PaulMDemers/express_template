# express_template
A base express project preloaded with my typical utils etc preloaded.

## Status Codes
* 200 - OK
* 401 - Token missing, invalid, or expired
* 412 - Account requires onboarding
* 500 - Server Error

## Environment Variables
* MySQLHost - Host for the MySQL Database
* MySQLUser - User for the MySQL Database
* MySQLPasswd - Password for the MySQL Database
* MySQLDB - Selected MySQL Database
* ServerVersion - A string denoting the current server version, typically Major.Minor.Bugfix
* JWKS - JWKS endpoint url

## Auth
This server is setup to work with any valid JWKS enabled provider (Cognito, Auth0, etc), just set process.env.JWKS to the url endpoint

## Helper Models
* StatusMsg - A generic Status class, contained one property "Status", generally used for "OK"
* ErrorMsg - Only has one property, "message" returned with status code 500