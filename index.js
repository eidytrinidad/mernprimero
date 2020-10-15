const express = require('express')
const mongoose = require("mongoose")
const rutas = require('./routes/rutas')
const bodyParser= require('body-parser')
const cors = require('cors')

//crear servidor
const app = express()

//Habilitar Cors

//como habilitar cors solo en el dominio deseado

// const whitelist= ['http://localhost:3000']
// const corsOptions={
//     origin:(origin,callback)=>{
//         const existe=whitelist.some(dominio=>dominio===origin);
//         if (existe) {
//             callback(null,true)
//         } else {
//             callback(new Error('No Permitido cors'))
//         }
//     }
// }
// app.use(cors(corsOptions))
app.use(cors())

const URI="mongodb+srv://Eidy:19931993@nodetutos.3zjgv.mongodb.net/veterinaria?retryWrites=true&w=majority"
mongoose.connect(URI,{ useUnifiedTopology: true,useNewUrlParser: true },()=>{
    console.log("Database Connected")
})

//Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Habilitar Routes
app.use('/',rutas)

const port = process.env.PORT || 4000

if (process.env.NODE_ENV==="production") {
    app.use(express.static('frontend/build'))
}

app.listen(port,()=>{
    console.log("Server Running")
})
