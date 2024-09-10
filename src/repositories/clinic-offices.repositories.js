
import { ClinicOfficesDAO } from "../dao/sequelize/dao.sequelize.clinic-offices.js"

export class ClinicOfficesRepositories{

    /* Debe crear una sede de establecimiento y devolver un DTO de la sede creada. De no crear la sede lanza excepcion...*/
    static async createClinicBranch({clinicBranchName}){
        try{
            const result = await ClinicOfficesDAO.createClinicBranch({clinicBranchName:clinicBranchName})
            return result
        }catch(error){
            console.log(error)
            throw error
        }
    }

    static async getClinicBranchs({clinicBranchName,clinicBranchId,clinicBranchStatus}){
        try{
            const result = await ClinicOfficesDAO.getClinicBranchs({
                    clinicBranchName : clinicBranchName,
                    clinicBranchId: clinicBranchId,
                    clinicBranchStatus: clinicBranchStatus
                })
            return result
        }catch(error){
            console.log(error)
            throw error
        }
    }


    static async getClinicBranch({clinicBranchId}){
        try{
            const result = await ClinicOfficesDAO.getClinicBranchs({
                   clinicBranchId:clinicBranchId
                })
            return result
        }catch(error){
            console.log(error)
            throw error
        }
    }


    static async createMedicalOffice({clinicBranchId,medicalOfficeName}){
        //Crea uh consultorio disponible por el medicalOfficeStatus: 1
        //Esto es puramente logica de negocio.
        try{
            const newMedicalOffice = ClinicOfficesDAO.createMedicalOffice({
                clinicBranchId:clinicBranchId,
                medicalOfficeName:medicalOfficeName,
                medicalOfficeStatus:1
            })
            return  newMedicalOffice
        }catch(error){
            console.log(error)
            throw error
        }
    }

    static async getMedicalOffices({medicalOfficeId,medicalOfficeName,medicalOfficeStatusId,clinicBranchId}){
        try{
            const result = await ClinicOfficesDAO.getMedicalOffices({
                medicalOfficeId : medicalOfficeId,
                medicalOfficeName: medicalOfficeName,
                medicalOfficeStatusId:medicalOfficeStatusId,
                clinicBranchId: clinicBranchId,
                })
            return result
        }catch(error){
            console.log(error)
            throw error
        }
    }

    static async changeMedicalOfficeStatus({medicalOfficeId,newStatusId}){
        try{
            const result = await ClinicOfficesDAO.upddateMedicalOffice(medicalOfficeId,{
                newMedicalOfficeStatusId:newStatusId
                })
            return result
        }catch(error){
            console.log(error)
            throw error
        }
    }






}