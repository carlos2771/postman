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
        const rol = await client.db("psbarber").collection("roles").find({}).toArray()
        if(rol){
            res.status(200).send(rol) // la solicitud a tenido exito 
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
        const roles = await client.db('psbarber').collection('roles').findOne({_id: new ObjectId(id)});
        if (roles) {
            res.status(200).send(roles)
        }else{
            res.status(400).send("No se encontro la informacion")
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
        rol = client.db("psbarber").collection("roles").insertMany(body)
        if(rol){
            res.status(201).json({message: "se insertaron los roles en la base de datos ", rol})
        }else {
            res.status(400).send("no se creo el rol correctamente")
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
        const rol = await client.db("psbarber").collection("roles").updateOne({_id: new ObjectId(id)},{$set:{nombre: body.nombre, id_rol: body.id_rol}})
        if(rol){
            res.status(201).json({message: "se actualizo el rol correctamente en la base de datos ",rol})
        }else{
            res.status(404).send("no se pudo actualizar el rol")
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
        constrol = await client.db("psbarber").collection("roles").updateMany({nombre : "Renee.Zcboncak"},{$set:{nombre: body.nombre}}) // usuarios que tengan apellido diaz se le cambia el nombre en el postman
        if(rol){
            res.status(201).json({message: "se actualizaron los roles en la base de datos ",rol})
        }else{
            res.status(404).send("no se pudieron actualizar los roles ")
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
        const rol = await client.db('psbarber').collection('roles').deleteOne({_id: new ObjectId(id)});
        if (rol) {
            res.status(200).json({message: "se elimino el usuario correctamente ",rol})
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