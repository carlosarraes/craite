import elements from 'typed-html'
import { Elysia } from 'elysia'
import { Dashboard } from '@/view/dashboard'

export const viewRoutes = (app: Elysia) => app.get('/dashboard', () => <Dashboard />)
