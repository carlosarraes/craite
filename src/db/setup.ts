import { Elysia } from 'elysia'
import { db } from '.'

export const setup = (app: Elysia) => app.state('db', db)
