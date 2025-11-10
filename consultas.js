import { Pool } from "pg"

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'likeme',
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