import dotenv from 'dotenv';

dotenv.config();

export const environment = {
    DATABASE_HOST: process.env.DATABASE_HOST,
}