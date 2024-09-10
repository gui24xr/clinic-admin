import { ClinicOfficesRepositories } from "../repositories/clinic-offices.repositories.js"

export class ClinicOfficesController{

    static async createClinicBranch(req,res,next){
        //Crea una sede y la devuelve. 
        const {nombre_sede} = req.body
        try{
             const result = await ClinicOfficesRepositories.createClinicBranch({clinicBranchName:nombre_sede})           
             return res.status(201).json({
                message: 'ok',
                payload: result
             })
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }


    static async getClinicBranchs(req,res,next){
        const {nombre_sede,id_sede_establecimiento,en_servicio} = req.body
        try{
            const result = await ClinicOfficesRepositories.getClinicBranchs({
                clinicBranchName : nombre_sede,
                clinicBranchId: id_sede_establecimiento,
                clinicBranchStatus:en_servicio
            })
            return res.status(201).json({
                message: 'ok',
                payload: result
             })

        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }

    static async getClinicBranch(req,res,next){
        const {cid:id_sede_establecimiento} = req.params
        try{
            const result = await ClinicOfficesRepositories.getClinicBranchs({
               clinicBranchId: id_sede_establecimiento,
            })
            return res.status(201).json({
                message: 'ok',
                payload: result
             })

        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }


    static async createMedicalOffice (req,res,next){
        //Crea una sede y la devuelve. 
        const {cid:id_sede_establecimiento}= req.params
        const {nombre_consultorio} = req.body
        try{
             const result = await ClinicOfficesRepositories.createMedicalOffice({
                clinicBranchId: id_sede_establecimiento,
                medicalOfficeName: nombre_consultorio
             })   
             return res.status(201).json({
                message: 'ok',
                payload: result
             })
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }

    static async getMedicalOffices(req,res,next){
        const {medicalOfficeId,medicalOfficeName,medicalOfficeStatusId,clinicBranchId} = req.query
        try{
            const result = await ClinicOfficesRepositories.getMedicalOffices({
                medicalOfficeId : medicalOfficeId,
                medicalOfficeName: medicalOfficeName,
                medicalOfficeStatusId:medicalOfficeStatusId,
                clinicBranchId: clinicBranchId,
            })
            return res.status(201).json({
                message: 'ok',
                payload: result
             })

        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }

    
 /*
    
    static async getConsultorios(req,res,next){
        try{
            const results = await ClinicOfficesRepositories.getConsultorios({})
            return res.status(200).json({
                message:'OK',
                payload: results
            })
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }

   


    static async deleteConsultorio (req,res,next){
        const {id} = req.params
        try{
            await SedesEstablecimientoModel.destroy({
                where:{
                    id_sede_establecimiento: id
                }
            })
    
            const results = await SedesEstablecimientoModel.findAll()
            res.json(results)
    
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }
    */
}