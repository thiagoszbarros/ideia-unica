import fs from 'fs';
import pool from '../../../src/services/postgres/PostgresService.js';

async function create(){
    const fileName = Date.now().toString();
    fs.writeFile(`database/migrations/${fileName}.sql`, '', async (err) => {
        if (err){
            console.error('Error creating migration file:', err);
            return;
        };
        await pool.query(`INSERT INTO migrations (name) VALUES ($1)`, [fileName]);
        console.log(`Migration file created: ${fileName}`);
    });
}

create();