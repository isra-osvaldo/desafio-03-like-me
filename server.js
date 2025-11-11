import express from "express"
import { addPost, getPosts } from "./consultas.js"
import cors from "cors"


const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json()) 

app.get('/posts', async (req, res) => {
    const posts = await getPosts()
    res.json(posts)
})

app.post('/posts', async(req, res) => {
    const { titulo, url, descripcion} = req.body
    await addPost(titulo, url, descripcion)
    res.send('Post agregado exitosamente')
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
