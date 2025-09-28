import fs from 'fs';
import pool from '../../../src/services/postgres/PostgresService.js'

async function run() {
    const pendingMigrations = await pool.query('SELECT name from migrations WHERE run_at is NULL');
    if (pendingMigrations.rowCount === 0) {
        console.log('No pending migrations.');
        return;
    }
    
    pendingMigrations
    .rows
    .forEach(async (row) => {
        const sql = fs.readFileSync(`database/migrations/${row.name}.sql`, 'utf8');
        await pool.query(sql);
        await pool.query('UPDATE migrations SET run_at = NOW() WHERE name = $1', [row.name]);
    });
}

run();