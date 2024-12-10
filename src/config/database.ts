import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME as string,  // Database name
    process.env.DB_USER as string,  // MySQL username
    process.env.DB_PASSWORD as string,  // MySQL password
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',  // MySQL dialect
    }
);

export default sequelize;
