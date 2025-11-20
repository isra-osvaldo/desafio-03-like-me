import { Pool } from "pg"
import 'dotenv/config'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
})


// POST
export const addPost = async (title, urlImg, description) => {
    const query = 'INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *'
    const values = [title, urlImg, description]
    const result = await pool.query(query, values)
    return result.rows[0]
}

// GET
export const getPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY id')
    console.log(rows)
    return rows
}

// PUT
export const updatePost = async ({ titulo, img, descripcion, likes, id }) => {
    const sqlQuery = {
        text: 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *',
        values: [titulo, img, descripcion, likes, id]
    }
    const response = await pool.query(sqlQuery)

    if (response.rowCount === 0) return null
    return response.rows[0]   
}

// DELETE
export const deletePost = async (id) => {
    const sqlQuery = {
        text: 'DELETE FROM posts WHERE id = $1 RETURNING *',
        values: [id]
    }
    const response = await pool.query(sqlQuery)
    if (response.rowCount === 0) return null
    return response.rows[0]
}

