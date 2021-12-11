/* Model para adicionar produto */

import Sequelize, {Model} from 'sequelize'

class Product extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.STRING,
            category: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                // Este campo não existe no banco de dados
                // Gerando uma url quando o usuario solicita informações do produto
                type: Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3000/product-file/${this.path}`
                }
            }
        },
        {
            sequelize,
        }
        )
    }
}

export default Product