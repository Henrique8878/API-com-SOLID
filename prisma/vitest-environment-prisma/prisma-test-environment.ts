import { Environment } from 'vitest/environments'
import 'dotenv/config'
import { env } from '@/env/.index'
import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

async function GenerateUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'Please, insert a value from environment variable DATABASE_URL',
    )
  }

  const newURL = new URL(process.env.DATABASE_URL)
  newURL.searchParams.set('schema', schema)
  return newURL.toString()
}

export default <Environment>{
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    process.env.DATABASE_URL = await GenerateUrl(schema)
    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        const prisma = new PrismaClient()
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
