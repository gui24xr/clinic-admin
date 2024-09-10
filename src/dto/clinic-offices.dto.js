export class ClinicBranchDTO{
    constructor({id,name,status,medicalOfficesArray}){
        this.id = id,
        this.name = name,
        this.status = status
        this.medicalOffices = medicalOfficesArray
    }
}


export class MedicalOfficeDTO{
    constructor({id,name,clinicBranchId,clinicBranchName,medicalOfficeStatus}){
        this.id = id,
        this.name = name,
        this.status = medicalOfficeStatus
        this.clinicBranchId = clinicBranchId,
        this.clinicBranchName = clinicBranchName
    }
}