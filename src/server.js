import express from 'express'
import {GET_CATEGORIES,POST_CATEGORIES,DELETE_CATEGORIES,UPDATE_CATEGORIES} from "./model/categoryValidation.js"
import {REGISTER,LOGIN,DELETE_USER,GETUSER,PUTUSER} from "./model/authValidation.js"
import {GETNEWS,POSTNEWS,PUTNEWS,DELETENEWS} from "./model/newsValidation.js"
const PORT = 4000
const app = express()
app.use(express.json())
app.get('/users',GETUSER)
app.get('/categories',GET_CATEGORIES)
app.get('/news',GETNEWS)
app.post('/register',REGISTER)
app.post('/login',LOGIN)
app.post('/news',POSTNEWS)
app.post('/categories',POST_CATEGORIES)
app.put('/users',PUTUSER)
app.put('/categories',UPDATE_CATEGORIES)
app.put('/news',PUTNEWS)
app.delete('/users',DELETE_USER)
app.delete('/categories',DELETE_CATEGORIES)
app.delete('/news',DELETENEWS)

app.listen(PORT,() => console.log('http://localhost:' + PORT))