import { SedesEstablecimientoModel } from "./models/sedes.models.js";
import { ConsultoriosModel } from "./models/consultorios.models.js";
import { ClinicBranchDTO,MedicalOfficeDTO } from "../../dto/clinic-offices.dto.js";
import { myDB } from "../../config/database.js";

export class ClinicOfficesDAO{

    /*
        1- Crea una sede y devuelve un dto con sus datos.
        2- Si no la crea lanza una excepcion.
    */
    static async createClinicBranch({clinicBranchName}){
        try{
            const newClinicBranch = await SedesEstablecimientoModel.create({
                nombre_sede: clinicBranchName
            })
            //Mandamos los datos del nuevo registro y consultorios un [] ya que acaba de ser creada.
            return getClinicBranchDTO({...newClinicBranch.dataValues,consultorios:[]})
        }catch(error){
            console.log(error)
            throw error
        }
    }


      /*
        1- Devuelve un array de DTO con las sedes buscadas con sus consultorios.
        2- Si no hay nada, devuelve un array vacio.
    */
    static async getClinicBranchs({clinicBranchName,clinicBranchId,clinicBranchStatus}){
        try{
            //Preparamos el filtro a utilizar.
            const filter = {}
            if (clinicBranchName) filter.nombre_sede = clinicBranchName
            if (clinicBranchId) filter.id_sede_establecimiento = clinicBranchId
            if (clinicBranchStatus) filter.en_servicio = clinicBranchStatus
            //Busco todas las sedes.
            const clinicBranchsList = await SedesEstablecimientoModel.findAll({where:filter})
    
            //Si no hay sedes entonces devuelvo un array vacio y si hay sedes devuelvo un array de DTO de ellas con sus consultorios.
            if (clinicBranchsList.length < 1) return []
            else{
                //Me traigo la lista de consultorios para agregar a cada sede.Ya que sequelize trae los datos en la primera posicion decontructuro el array y le llamo medicalOffices.
                const [medicalOffices] = await myDB.query('SELECT * FROM vw_medical_offices', {raw: true})
                //Recorro y mapeo cada sede y por cada una de ellas filtro medicalOffices para obtener los consultorios que pertenecen a la sede actual
                //Con toda la info construyo DTO
                const arrayDTO = clinicBranchsList.map( branchItem => {
                    const idSedeActual = branchItem.dataValues.id_sede_establecimiento;
                    branchItem.consultorios = medicalOffices.filter(item => item.id_sede_establecimiento == idSedeActual).map(item => getMedicalOfficeDTO(item))
                    return getClinicBranchDTO(branchItem)
                })
                return arrayDTO
            }
          
        }catch(error){
            console.log(error)
            throw error
        }
    }

    /* Crea el consultorio en la sede con id pasado por parametro
        Devuelve un dto del consultorio creado
        Si no lo crea x algun motivo o xq la seede no existe lanza excepcion
    */
    static async createMedicalOffice({clinicBranchId,medicalOfficeName,medicalOfficeStatus}){
        try{
            //1. Existe la sede?? findOne Devuelve null si no existe
            const selectedClinicBranch = SedesEstablecimientoModel.findOne({
                where:{id_sede_establecimiento:clinicBranchId}
            })
            
            if (!selectedClinicBranch) return 
            const newMedicalOffice = await ConsultoriosModel.create({
                id_sede_establecimiento:clinicBranchId,
                nombre_consultorio:medicalOfficeName,
                office_status_id:medicalOfficeStatus
            })
            //Ya tengo la medicalOfficeCreada en su tabla, ahora consulto la view para obtener datos cruzados.
            const [medicalOffices] = await myDB.query(`SELECT * FROM vw_medical_offices WHERE id_consultorio=${newMedicalOffice.id_consultorio}`, {raw: true})
            //Como en este caso me devuelve solamente 1 registro y sabemos que existe y viene en un array
            return getMedicalOfficeDTO(medicalOffices[0])
          
        }catch(error){
            console.log(error)
            throw error
        }
    }


    static async getMedicalOffices({medicalOfficeId,medicalOfficeName,medicalOfficeStatusId,clinicBranchId}){
        try{
            //Preparamos la consulta y el filtro a utilizar.       
            let query = 'SELECT * FROM vw_medical_offices WHERE 1=1'
            const filterArray= [] //Array donde guardo los fragmentos de texto de cada condicion.
            //Segun las condiciones vengan o no vengan voy llenando el array de condiciones y formnado el texto de consulta.
            if (medicalOfficeId) filterArray.push(`id_consultorio = ${medicalOfficeId}`)
            if (medicalOfficeName) filterArray.push(`nombre_consultorio = ${medicalOfficeName}`)
            if (medicalOfficeStatusId) filterArray.push(`office_status_id = ${medicalOfficeStatusId}`)
            if (clinicBranchId) filterArray.push(`id_sede_establecimiento = ${clinicBranchId}`)
      
            //Recorro el array del filtros y voy agregando condiciones a la query agregando fragmentos de texto y AND.
            for (let i = 0; i < filterArray.length; i++) {
                query = query + ` AND ` + filterArray[i]
            }

            console.log('Valores entrantes: ',{medicalOfficeId,medicalOfficeName,medicalOfficeStatusId,clinicBranchId})
            console.log('La query resultante es: ', query)

            //Obtengo los resultados de busqueda.
            const [medicalOfficesList] = await myDB.query(query, {raw: true})
               
            //Si no hay sedes entonces devuelvo un array vacio y si hay sedes devuelvo un array de DTO.
            if (medicalOfficesList.length < 1) return []
            else{
                    const arrayDTO = medicalOfficesList.map(item => (getMedicalOfficeDTO(item)))
                    return arrayDTO
                }
        }catch(error){
            console.log(error)
            throw error
        }
    }

    
}








//Recibe una sede de et
function getClinicBranchDTO(dbRecord){

 return new ClinicBranchDTO({
    id: dbRecord.id_sede_establecimiento,
    name: dbRecord.nombre_sede,
    status: dbRecord.en_servicio,
    medicalOfficesArray: dbRecord.consultorios
 })
}


function getMedicalOfficeDTO(dbRecord){
    
    return new MedicalOfficeDTO({
        id:dbRecord.id_consultorio,
        name:dbRecord.nombre_consultorio,
        medicalOfficeStatus: dbRecord.office_status,
        clinicBranchId: dbRecord.id_sede_establecimiento,
        clinicBranchName: dbRecord.nombre_sede
    })
}
   
