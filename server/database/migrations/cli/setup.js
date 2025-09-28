import pool from '../../../src/services/postgres/PostgresService.js';

async function setup(){
    await pool.query('CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW(), run_at TIMESTAMP);');
}

setup();
