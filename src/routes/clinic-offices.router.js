
/*
-- Dado que los consultorios están relacionados con una sede específica:
POST /sedes => Crear una sede con nombre pasado por body.
GET /sedes => Obtener todas las sedes.
GET /sedes/:sedeId => Obtener una sede específica y sus consultorios. 
PUT /sedes/:sedeId => Actualizar una sede.
DELETE /sedes/:sedeId => Eliminar una sede.
POST /sedes/:sedeId/consultorios => Crear un consultorio dentro de una sede.
GET /consultorios => obtener consultorios usando querys
PUT /consultorios/:consultorioId => Actualizar un consultorio usando body.
PUT /consultorios/:consultorioId => Actualizar el estado de un consultorio, recibe el id de estado por query.
DELETE /consultorios/:consultorioId => Elimina un consultorio.

GET /medicalOffices/statuslist => Devuelve una lista con informacion de los posibles estados de consultorios
GET /medicalOffices/statusinfo => Devuelve una lista con la el estado actual de todos los consultorios.


*/


import express from 'express'
import { ClinicOfficesController } from '../controllers/clinic-offices.controller.js'

export const clinicOfficesRouter = express.Router()

clinicOfficesRouter.post('/clinicbranchs', ClinicOfficesController.createClinicBranch)
clinicOfficesRouter.get('/clinicbranchs',ClinicOfficesController.getClinicBranchs )
clinicOfficesRouter.get('/clinicbranchs/:cid', ClinicOfficesController.getClinicBranch)
clinicOfficesRouter.put('/clinicbranchs/:cid')
clinicOfficesRouter.delete('/clinicbranchs/:cid')
clinicOfficesRouter.post('/clinicbranchs/:cid/medicaloffices', ClinicOfficesController.createMedicalOffice)
clinicOfficesRouter.get('/medicaloffices', ClinicOfficesController.getMedicalOffices)
clinicOfficesRouter.put('/medicaloffices/:mid')
clinicOfficesRouter.put('/medicaloffices/:mid/status', ClinicOfficesController.changeMedicalOfficeStatus)
clinicOfficesRouter.delete('/medicaloffices/:cid')
clinicOfficesRouter.get('/medicalOffices/statuslist')

