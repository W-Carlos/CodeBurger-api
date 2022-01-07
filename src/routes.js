import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"

import ProductController from "./app/controllers/ProductController"
import SessionController from "./app/controllers/SessionController"
import CategoryController from "./app/controllers/CategoryController"
import UserController from "./app/controllers/UserController"
import OrderController from "./app/controllers/OrderController"

import authMiddleware from './app/middlewares/auth'
import { route } from "express/lib/application"

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)// Todas as rotas que estiverem abaixo vão receber o middleware

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)

export default routes