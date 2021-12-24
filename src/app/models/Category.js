/* Model para fazer a interface entre a aplicação e o banco de dados */

import Sequelize, {Model} from 'sequelize'

class Category extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING
        },
        {
            sequelize,
        }
        )

        return this
    }
}

export default Category