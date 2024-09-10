import { myDB } from "../../../config/database.js";
import { DataTypes } from "sequelize";
import { SedesEstablecimientoModel } from "./sedes.models.js";
import { MedicalOfficeStatusModel } from "./medical_office_status.js";

export const ConsultoriosModel = myDB.define('consultorios',{
    id_consultorio:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    id_sede_establecimiento:{
        type: DataTypes.INTEGER,
        references: {
            model: SedesEstablecimientoModel, // Nombre del modelo al que se refiere
            key: 'id_sede_establecimiento'    // Columna en el modelo de referencia
          }
    },
    nombre_consultorio:{
        type: DataTypes.STRING,
        allowNull: true
    },
    office_status_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },


},{tableName:'consultorios',timestamps:false})



// Definir las relaciones
SedesEstablecimientoModel.hasMany(ConsultoriosModel, { foreignKey: 'id_sede_establecimiento' });
ConsultoriosModel.hasOne(MedicalOfficeStatusModel,{foreignKey:'office_status_id'})
ConsultoriosModel.belongsTo(SedesEstablecimientoModel, { foreignKey: 'id_sede_establecimiento' });


/*

-- Tabla de Consultorios
CREATE TABLE consultorios (
    id_consultorio INT AUTO_INCREMENT,
    id_sede_establecimiento INT DEFAULT NULL,
    nombre_consultorio VARCHAR(100),
    office_status_id INT,
    PRIMARY KEY (id_consultorio),
    FOREIGN KEY (id_sede_establecimiento) REFERENCES sedes_establecimiento(id_sede_establecimiento) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (office_status_id) REFERENCES medical_office_status(office_status_id) ON UPDATE CASCADE ON DELETE SET NULL
);


*/