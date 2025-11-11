import express from "express"
import { addPost, getPosts } from "./consultas.js"
import cors from "cors"


const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json()) 

app.get('/posts', async (req, res) => {
    try {
        const posts = await getPosts()
        res.json(posts)
    } catch (error) {
        console.error(`Error al obtener los posts: ${error}`)
        res.status(500).json({ error: 'Error al obtener los posts' })
    }
})

app.post('/posts', async(req, res) => {
    try {
        const { titulo, url, descripcion} = req.body

        if (!titulo || !url || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' })
        }

        await addPost(titulo, url, descripcion)
        res.status(201).json({ message: 'Post agregado exitosamente' })

    } catch (error) {
        console.error(`Error al agregar el post: ${error}`)
        res.status(500).json({ error: 'Error al agregar el post' })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
