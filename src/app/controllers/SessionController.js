/* Vai ser responsavel por cuidar da sessão do usuario */

import * as Yup from 'yup'
import User from '../models/User'

// Validação do login
class SessionController {
    async store(request, response){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        /* 
        Com essa função da erro
        const userEmailOrPasswordIncorrect = () => {
            return response
                .status(401)
                .json({error: "Make sure your password or email are correct"})
        }; */

        // Menssagem de erro caso o email ou senha estejam errados 
        if(!(await schema.isValid(request.body))) {
            return response
                .status(401)
                .json({error: "Make sure your password or email are correct"})
        }
        
        const {email, password} = request.body

        const user = await User.findOne({
            where: { email },
        })

        // Validando o email
        if(!user) {
            return response
                .status(401)
                .json({error: "Make sure your password or email are correct"})
        }

        // Validando a senha
        if(!(await user.checkPassword(password))) {
            return response
                .status(401)
                .json({error: "Make sure your password or email are correct"})
        }
        

        return response.json({
            id: user.id, 
            email, 
            name: user.name, 
            admin: user.admin
        })
    }
}

export default new SessionController()