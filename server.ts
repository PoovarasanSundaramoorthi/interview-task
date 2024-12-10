require('ts-node').register();  // Register ts-node for runtime compilation
import app from './src/app';      // Now use imports after registration
import { port } from './src/config';
import sequelize from './src/config/database';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// Handle uncaught exceptions globally
process.on('uncaughtException', (err: Error) => {
    console.log("UNCAUGHT EXCEPTION!!! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

// Sync Sequelize models with MySQL database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err: Error) => {
        console.error('Unable to sync the database:', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`${port} server running successfully`);
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (err: Error) => {
    console.log("UNHANDLED REJECTION!!! Shutting down...");
    console.log(err.name, err.message);
});
