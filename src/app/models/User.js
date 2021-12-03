import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize. VIRTUAL,// Esse campo não vai existir dentro do banco
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN
            },
            {
                sequelize,
            }
        )

        // Vai criar um hash de senha antes de salvar as informações no banco de dados
        this.addHook('beforeSave', async(user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        })

        return this
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User