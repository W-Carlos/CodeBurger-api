/* Controller de Produtos */

import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'


// Validação dos produtos
class ProductController{

    async store(request, response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean()
        })

        try{
            //  Teste para verificar as informações e retorna o erro
            await schema.validateSync(request.body, {abortEarly: false})
        }catch(err){
            return response.status(400).json({error: err.errors})
        }

        // Definindo que apenas administradores podem criar um novo produto
        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const { filename: path } = request.file
        const { name, price, category_id, offer } = request.body

        const product = await Product.create({
            name,
            price: price,
            category_id,
            path,
            offer
        })

        return response.json(product)
    }

    // Essa rota retorna todos os produtos
    async index(request, response){
        const products = await Product.findAll({
            include:[
                {
                    model: Category, 
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

        console.log(request.userId)
        return response.json(products)
    }

    /* Metodo para editar produto */
    async update(request, response){
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean()
        })

        try{
            //  Teste para verificar as informações e retorna o erro
            await schema.validateSync(request.body, {abortEarly: false})
        }catch(err){
            return response.status(400).json({error: err.errors})
        }

        // Definindo que apenas administradores podem criar um novo produto
        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        // Verifica se o produto existe
        const { id } = request.params

        const product = await Product.findByPk(id)

        if(!product){
            return response.status(401).json({error: "Make sure your product ID is correct"})
        }

        // Verificando se o usuario está enviando uma imagem
        let path
        if(request.file){
            path = request.file.filename
        }

        const { name, price, category_id, offer } = request.body

        await Product.update(
            {
                name,
                price,
                category_id,
                path,
                offer
            },
            { where: { id }}
        
        )

        return response.status(200).json()
    }
}

export default new ProductController()