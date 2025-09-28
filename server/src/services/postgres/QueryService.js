import pool from './PostgresService.js';

export default class QueryService {
  static async create(table, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data)
      .map((_, index) => `$${index + 1}`)
      .join(', ');
    const values = Object.values(data);
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    await pool.query(query, values);
  }

  static async get(table, select, conditions) {
    const conditionStrings = Object.entries(conditions)
      .map(([key, _], index) => `${key}=$${index + 1}`)
      .join(' AND ');

    const selectString = select.join(', ');
    const query = `SELECT ${selectString} FROM ${table} WHERE ${conditionStrings}`;
    const values = Object.values(conditions);
    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
  }

  static async update(table, conditions, values) {
    const conditionStrings = Object.entries(conditions)
      .map(([key, _], index) => `${key}=$${index + 1}`)
      .join(' AND ');
    const setClause = Object.entries(values)
      .map(([key, _], index) => `${key}=$${index + 1 + Object.keys(conditions).length}`)
      .join(', ');
    const query = `UPDATE ${table} SET ${setClause} WHERE ${conditionStrings}`;
    const allValues = [...Object.values(conditions), ...Object.values(values)];
    await pool.query(query, allValues);
  }

  static async delete(table, conditions) {
    const conditionStrings = Object.entries(conditions)
      .map(([key, _], index) => `${key}=$${index + 1}`)
      .join(' AND ');
    const values = Object.values(conditions);
    const query = `DELETE FROM ${table} WHERE ${conditionStrings}`;
    await pool.query(query, values);
  }
}
