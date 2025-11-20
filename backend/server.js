import express from "express"
import { addPost, getPosts, updatePost, deletePost } from "./consultas.js"
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
        const { titulo, img, descripcion} = req.body

        if (!titulo || !img || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' })
        }

        const newPost = await addPost(titulo, img, descripcion)
        res.status(201).json(newPost)

    } catch (error) {
        console.error(`Error al agregar el post: ${error}`)
        res.status(500).json({ error: 'Error al agregar el post' })
    }
})


app.put('/post/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { titulo, img, descripcion, likes } = req.body
        const post = await updatePost({titulo, img, descripcion, likes, id})

        if (!post) {
            return res.status(404).json({ error: `Post no encontrado con este id: ${id}` })
        }
        return res.status(201).json({
            message: 'Post actualizado exitosamente',
            post
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el post' })
        console.error('Error => ', error)
    }
})

app.delete('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params
        const post = await deletePost(id)

        if (!post) {
            return res.status(404).json({ error: `Post no encontrado con este id: ${id}` })
        }
        return res.status(200).json({
            message: 'Post eliminado exitosamente',
            post
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' })
        console.error('Error => ', error)
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
