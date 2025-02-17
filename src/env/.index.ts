//Arquivo de configuração de variáveis de ambiente, instalar e importar o dotenv/config instalar o zod, validar os dados com safeParse, se success for true eu envio um _env.data se não eu gero um erro

import 'dotenv/config'
import * as z from 'zod'


const envSchema = z.object({
    NODE_ENV:   z.enum(['dev','test','production']),
    PORT:z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success===false){
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

export const env = _env.data

