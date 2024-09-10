import {z} from 'zod'

export const SedesEstablecimientoSchema = z.object({
    "nombre_sede": z.string(),
    "en_servicio": z.boolean()
})