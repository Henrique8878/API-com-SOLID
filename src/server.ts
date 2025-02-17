import { app } from './app'
import { env } from './env/.index'

// Separar o app do server para depois facilitar a realização de testes unitários e testes E2E

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running !')
  })
