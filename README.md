# express_template
A base express project preloaded with my typical utils etc preloaded.

## Running the server
* Typical: npm start or node ./bin/www to run it normally
* AWS Lambda: create a lambda function and set the entry point to aws_lambda_index.js

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
* AWS_ACCESS_KEY_ID - AWS Access key
* AWS_SECRET_ACCESS_KEY - AWS Secret key
* SNS_IOS_SANDBOX_ARN - AWS Cognito IOS Sandbox Platform arn
* SNS_IOS_ARN - AWS Cognito IOS Platform arn
* SNS_ANDROID_ARN - AWS Cognito Android Platform arn

## Auth
This server is setup to work with any valid JWKS enabled provider (Cognito, Auth0, etc), just set process.env.JWKS to the url endpoint

## Helper Models
* StatusMsg - A generic Status class, contained one property "Status", generally used for "OK"
* ErrorMsg - Only has one property, "message" returned with status code 500

## Notifications
This server contains the basics for mobile push notifications using AWS SNS.

## Initial Tables
### DeviceTokens - Table Structure
* User, varchar(64)
* Token, varchar(256)
* Platform, varchar(45)