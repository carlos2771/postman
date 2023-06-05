const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');
const  uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'
// CREAR las rutas 
const router = express.Router()

//get leer  todos los datos de usuarios
router.get("/", async (req, res) => {
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
    try {
        await client.connect() 
        const usuarios = await client.db("psbarber").collection("usuarios").find({}).toArray()
        if(usuarios){
            res.status(200).send(usuarios) // la solicitud a tenido exito 
        }else{ 
            res.status(404).send("no se encontro la coleccion usuarios")
        }
    } catch (e) {
        console.error(e);
    }finally{
       await client.close()
    }
})

// obtener usuarios por id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const usuarios = await client.db('psbarber').collection('usuarios').findOne({_id: new ObjectId(id)});
        if (usuarios) {
            res.status(200).send(usuarios)
        }else{
            res.status(404).send("No se encontro la informacion")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})


//crear usuarios
router.post("/", async(req, res)=>{
    const body = req.body
    const client = new MongoClient(uri)
    try {
        await client.connect()
        usuarios = client.db("psbarber").collection("usuarios").insertMany(body)
        if(usuarios){
            res.status(201).json({message: "se insertaron los en la base de datos ", usuarios})
        }else {
            res.status(400).send("no se creo el usuario correctamente")
        }
    } catch (error) {
        await client.close()
    }
})

//actualizar usuario por id

router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const body = req.body
    client = new MongoClient(uri)
    try {
        await client.connect()
        const usuario = await client.db("psbarber").collection("usuarios").updateOne({_id: new ObjectId(id)},{$set:{nombre: body.nombre, contraseña: body.contraseña}})
        if(usuario){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",usuario})
        }else{
            res.status(404).send("no se pudieron actualizar los clientes ")
        }
    } catch (error) {
        console.error(error);
    }finally{
        await client.close()
    }
})


// Actualizar varios usuarios
router.patch("/", async(req, res) => {
    const body = req.body
    client = new MongoClient(uri)
    try {
        await client.connect()
        const usuario = await client.db("psbarber").collection("usuarios").updateMany({apellido : "diaz"},{$set:{nombre: body.nombre}}) // usuarios que tengan apellido diaz se le cambia el nombre en el postman
        if(usuario){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",usuario})
        }else{
            res.status(404).send("no se pudieron actualizar los usuarios ")
        }
    } catch (error) {
        console.error(error);
    }finally{
        await client.close()
    }
})


// eliminar usuario 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const usuarios = await client.db('psbarber').collection('usuarios').deleteOne({_id: new ObjectId(id)});
        if (usuarios) {
            res.status(200).json({message: "se elimino el usuario correctamente ",usuarios})
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})

module.exports = router 