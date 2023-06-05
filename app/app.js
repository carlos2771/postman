// requerimos express
const express = require("express")
const app = express()

//bodyparser para parsear los cuerpos
const bodyparser = require("body-parser")

// traigo las rutas del index 
const rutasApi = require("../routes")

const port = 3000
//Middleware
app.use(bodyparser.json())// para poder trabajar con json
app.use(bodyparser.urlencoded({extended :true}))// para poder trabajar con formularios codificados en url
app.use(express.json())



rutasApi(app)
//ruta principal
app.get ("/", (req, res)=>{
    res.status(200).send("api Usuarios")
})


//poner a escuchar el puerto
app.listen(port,()=> {
    console.log(`se esta escuchando en el puerto ${port}`);
})

