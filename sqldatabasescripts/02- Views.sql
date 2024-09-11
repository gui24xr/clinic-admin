CREATE VIEW  vw_medical_offices AS
SELECT 
	consultorios.id_consultorio as id_consultorio,
    consultorios.nombre_consultorio as nombre_consultorio,
    consultorios.id_sede_establecimiento as id_sede_establecimiento,
	sedes_establecimiento.nombre_sede as nombre_sede,
    consultorios.office_status_id as office_status_id,
    medical_office_status.office_status as office_status
FROM consultorios
LEFT JOIN sedes_establecimiento ON consultorios.id_sede_establecimiento = sedes_establecimiento.id_sede_establecimiento
LEFT JOIN medical_office_status ON consultorios.office_status_id = medical_office_status.office_status_id;


SELECT * FROM vw_medical_offices WHERE id_sede_establecimiento = 1;


CREATE VIEW vw_datos_personales AS
SELECT 
	fichas_datos_personales.dni as dni,
    fichas_datos_personales.apellido as apellido,
    CONCAT(fichas_datos_personales.nombre1,' ', fichas_datos_personales.nombre2) as nombres,
    fichas_datos_personales.fecha_nacimiento as fecha_nacimiento,
    fichas_datos_personales.email as email,
	CONCAT(datos_domicilios.calle,' ', datos_domicilios.altura_calle) as domicilio,
    datos_domicilios.codigo_postal as codigo_postal,
    CONCAT(datos_domicilios.localidad,'/',datos_domicilios.provincia,'/',datos_domicilios.pais) as ubicacion,
    datos_telefonicos.telefono_movil as telefono_movil,
    datos_telefonicos.telefono_fijo as telefono_fijo,
    datos_telefonicos.telefono_urgencia as contacto_urgencia
FROM fichas_datos_personales 
LEFT JOIN datos_domicilios ON fichas_datos_personales.dni = datos_domicilios.dni
LEFT JOIN datos_telefonicos ON fichas_datos_personales.dni = datos_telefonicos.dni;


/* ---------------------------------------------------------------------------------------------------- */
CREATE VIEW vw_empleados AS
SELECT 
	empleados.legajo_empleado AS legajo_empleado,
    empleados.dni,
    funciones_empleados.nombre_funcion_empleado as funcion_empleado,
    vw_datos_personales.apellido,
    vw_datos_personales.nombres,
    vw_datos_personales.email,
    vw_datos_personales.telefono_movil
FROM empleados
LEFT JOIN vw_datos_personales ON empleados.dni = vw_datos_personales.dni
RIGHT JOIN funciones_empleados ON empleados.codigo_funcion_empleado = funciones_empleados.codigo_funcion_empleado;

/* ---------------------------------------------------------------------------------------------------- */
CREATE VIEW vw_pacientes AS
SELECT
	pacientes.legajo_paciente,
    pacientes.dni,
    vw_datos_personales.apellido,
    vw_datos_personales.nombres,
    vw_datos_personales.fecha_nacimiento,
    calcular_edad(vw_datos_personales.fecha_nacimiento) as edad,
    vw_datos_personales.email,
    vw_datos_personales.telefono_movil,
    vw_datos_personales.contacto_urgencia,
    vw_datos_personales.domicilio,
    vw_datos_personales.ubicacion,
    usuarios_sistema.user_system_role
FROM pacientes
LEFT JOIN vw_datos_personales ON pacientes.dni = vw_datos_personales.dni
LEFT JOIN usuarios_sistema ON pacientes.dni = usuarios_sistema.dni;

/* ---------------------------------------------------------------------------------------------------- */
CREATE VIEW vw_usuarios AS
SELECT
	usuarios_sistema.dni,
	CONCAT(vw_datos_personales.apellido,' ', vw_datos_personales.nombres) as datos_personales,
    get_funcion_persona(usuarios_sistema.dni) as funcion,
    usuarios_sistema.user_system_role,
    usuarios_sistema.user_status,
    usuarios_sistema.user_password,
    usuarios_sistema.user_last_connection,
    calcular_dias_transcurridos(usuarios_sistema.user_last_connection) as last_view,
    usuarios_sistema.user_password_recovery_code,
    usuarios_sistema.user_password_recovery_expiration
FROM usuarios_sistema
LEFT JOIN vw_datos_personales ON usuarios_sistema.dni = vw_datos_personales.dni;

/* ---------------------------------------------------------------------------------------------------- */
CREATE VIEW vw_medicos AS
SELECT
	vw_medico_especialidades.id_medico as id_medico,
	vw_medico_especialidades.matricula_medico as matricula_medico,
    vw_empleados.dni as dni,
    vw_empleados.apellido as apellido,
    vw_empleados.nombres as nombres,
    vw_empleados.email as email,
    vw_empleados.telefono_movil as telefono_movil,
    vw_medico_especialidades.especialidad as especialidad
FROM vw_empleados
LEFT JOIN 
	(
		SELECT 
			medicos.id_medico as id_medico,
            medicos.legajo_empleado as legajo_empleado,
            medicos.matricula_medico as matricula_medico,
            especialidades_medicas.nombre_especialidad_medica as especialidad
		FROM medicos
		LEFT JOIN especialidades_medicas ON medicos.id_especialidad_medica = especialidades_medicas.id_especialidad_medica
    ) AS vw_medico_especialidades ON vw_empleados.legajo_empleado = vw_medico_especialidades.legajo_empleado WHERE funcion_empleado = 'medico';

/* ---------------------------------------------------------------------------------------------------- */
    
CREATE VIEW vw_prestaciones_medicas AS
SELECT
prestaciones_medicas.id_prestacion_medica as id_prestacion_medica,
vw_medicos.id_medico as id_medico,
vw_medicos.matricula_medico as matricula_medico,
vw_medicos.apellido as apellido,
vw_medicos.nombres as nombres,
vw_medicos.especialidad as especialidad,
vw_prestaciones_sedes.nombre_sede as sede
FROM prestaciones_medicas
LEFT JOIN vw_medicos ON prestaciones_medicas.id_medico = vw_medicos.id_medico
LEFT JOIN
	(
		SELECT 
			prestaciones_medicas.id_prestacion_medica as id_prestacion_medica,
            prestaciones_medicas.id_sede_establecimiento as id_sede_establecimiento,
            sedes_establecimiento.nombre_sede as nombre_sede
		FROM prestaciones_medicas
		LEFT JOIN sedes_establecimiento ON prestaciones_medicas.id_sede_establecimiento = sedes_establecimiento.id_sede_establecimiento
	) as vw_prestaciones_sedes ON prestaciones_medicas.id_sede_establecimiento = vw_prestaciones_sedes.id_sede_establecimiento;
    
/* ---------------------------------------------------------------------------------------------------- */

CREATE VIEW vw_turnos AS
SELECT
turnos.id_turno as id_turno,
turnos.id_prestacion_medica as prestacion_medica,
turnos.fecha_turno as fecha_turno,
turnos.horario_cita as horario_cita,
turnos.legajo_paciente as legajo_paciente,
turnos.es_sobreturno as es_sobreturno,
turnos.estado_turno as estado_turno,
vw_prestaciones_medicas.especialidad as especialidad,
CONCAT(vw_prestaciones_medicas.apellido,' ',vw_prestaciones_medicas.nombres) as medico,
vw_pacientes.dni as dni,
CONCAT(vw_pacientes.apellido,' ',vw_pacientes.nombres) as paciente,
vw_pacientes.contacto_urgencia as contacto_urgencia,
vw_pacientes.edad as edad,
vw_pacientes.email as email_paciente,
CONCAT(vw_pacientes.domicilio,' ',vw_pacientes.ubicacion) as datos_paciente
FROM turnos              
LEFT JOIN vw_pacientes ON turnos.legajo_paciente = vw_pacientes.legajo_paciente       
LEFT JOIN vw_prestaciones_medicas ON turnos.id_prestacion_medica = vw_prestaciones_medicas.id_prestacion_medica

/* ---------------------------------------------------------------------------------------------------- */




