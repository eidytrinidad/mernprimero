const Pacientes = require("../models/Pacientes")
const Paciente= require("../models/Pacientes")

//funcion cuando se crea un nuevo cliente

const nuevoCliente=async(req,res,next)=>{

    //crear objeto
    const paciente=new Paciente(req.body)

   try {

    await paciente.save()
    res.json({mensaje:"Se Agrego Correctamente"})
       
   } catch (error) {
       console.log(error)
       next()
   }
}

//Obtiene Todos los registros
const obtenerPacientes= async(req,res,next)=>{

   try {

    const pacientes = await Pacientes.find()
   
    res.json(pacientes)
       
   } catch (error) {
       console.log(error)
       next()
   }
}

//obtiene un registro
const obtenerPaciente = async(req,res,next)=>
{
    const id= req.params.id;
    try {
        const paciente= await Paciente.findById(id)
        res.json(paciente)
    } catch (error) {
        console.log(error)
       next()
    }
}

//Actualiza un registro por ID
const actualizarPaciente= async(req,res,next)=>{
    const id= req.params.id;
    try {
        const paciente=await Paciente.findByIdAndUpdate({_id: req.params.id},req.body,{
            new:true
        })
        res.json(paciente)
        
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente= async(req,res,next)=>{
    const id= req.params.id;
    try {
        await Paciente.findByIdAndRemove(id)
        res.json({mensaje:"Eliminado"})
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    nuevoCliente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}

