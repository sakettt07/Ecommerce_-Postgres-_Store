import {neon, neonConfig} from '@neondatabase/serverless';  
import dotenv from 'dotenv';

dotenv.config();
const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD}=process.env;

// setting up the sql connection using the env variables.
export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)
