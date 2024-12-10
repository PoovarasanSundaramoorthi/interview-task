import dotenv from 'dotenv';  // Import dotenv for loading environment variables
dotenv.config();  // Load environment variables from a .env file

// Declare types for the environment variables to avoid 'undefined' errors
const { JWT_SECRET, PORT, DB_PASSWORD, DB_NAME, DB_USER, DB_HOST } = process.env;

// Ensure the environment variables are correctly typed
const port: string | undefined = PORT;
const jwtKey: string | undefined = JWT_SECRET;
const dbHost: string | undefined = DB_HOST;
const dbPassword: string | undefined = DB_PASSWORD;
const dbName: string | undefined = DB_NAME;
const dbUser: string | undefined = DB_USER;

console.log('port config:>> ', port);

// Exporting the values
export { port, jwtKey, dbHost, dbPassword, dbName, dbUser };  // Use named exports instead of module.exports
