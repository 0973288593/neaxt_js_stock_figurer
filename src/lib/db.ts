import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'model_ceopla',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default db;