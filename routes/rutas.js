const express = require('express')
const router = express.Router()
const pacientesController = require('../controllers/pacienteController')


router.post("/pacientes",pacientesController.nuevoCliente)
router.get("/pacientes",pacientesController.obtenerPacientes)
router.get("/pacientes/:id",pacientesController.obtenerPaciente)
router.put("/pacientes/:id",pacientesController.actualizarPaciente)
router.delete("/pacientes/:id",pacientesController.eliminarPaciente)


module.exports=router
    