/* Controller de Categorias. É aqui que vai chegar os dados */

import * as Yup from 'yup'
import Category from '../models/Category'

// Validação dos produtos
class CategoryController{
    async store(request, response){
            try{ const schema = Yup.object().shape({
                    name: Yup.string().required()
                })

                try{
                    //  Teste para verificar as informações e retorna o erro
                    await schema.validateSync(request.body, {abortEarly: false})
                }catch(err){
                    return response.status(400).json({error: err.errors})
                }

                const { name } = request.body

                const category = await Category.create({ name })

                return response.json(category)
            }catch(err){
                console.log(err)
            }
    }

    // Essa rota retorna todos os produtos
    async index(request, response){
        const category = await Category.findAll()

        return response.json(category)
    }
}

export default new CategoryController()