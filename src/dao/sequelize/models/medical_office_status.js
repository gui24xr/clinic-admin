import { myDB } from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const MedicalOfficeStatusModel = myDB.define('medical_office_status',{
    office_status_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    office_status:{
        type: DataTypes.STRING,
        allowNull: false
    },

},{tableName:'medical_office_status',timestamps:false})
