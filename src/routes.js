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

routes.post('/users', UserController.store) // Cria novo usuario

routes.post('/sessions', SessionController.store) // Cria nova seção de produtos

routes.use(authMiddleware)// Todas as rotas que estiverem abaixo vão receber o middleware

routes.post('/products', upload.single('file'), ProductController.store) // Cria novo produto
routes.get('/products', ProductController.index) // Mostra todos os produtos
routes.put('/products/:id', upload.single('file'), ProductController.update)// Rota de atualização de produto

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store) // Cria novo pedido
routes.put('/orders/:id', OrderController.update) // Atualiza o status do pedido
routes.get('/orders', OrderController.index) // Mostra todos os pedidod

export default routes