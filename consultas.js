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

const addPost = async (title, urlImg, description) => {
    const query = 'INSERT INTO posts values (DEFAULT, $1, $2, $3)'
    const values = [title, urlImg, description]
    const result = await pool.query(query, values)
    console.log('Post agregado exitosamente')
}

const getPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts')
    console.log(rows)
    return rows
}

export {
    addPost,
    getPosts
}