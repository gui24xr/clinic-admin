import { myDB } from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const SedesEstablecimientoModel = myDB.define('sedes_establecimiento',{
    id_sede_establecimiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre_sede:{
        type: DataTypes.STRING,
        allowNull: true
    },
    en_servicio:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }

},{tableName:'sedes_establecimiento',timestamps:false})




/*
CREATE TABLE sedes_establecimiento (
    id_sede_establecimiento INT AUTO_INCREMENT,
    nombre_sede VARCHAR(100),
    en_servicio BOOLEAN,
    PRIMARY KEY (id_sede_establecimiento)
);
*/

