const express = require('express')
const router = express.Router()
const User = require('./usersModel')
const generateToken = require('../../services/tokenGenerator')

const adminPassword = process.env.NODE_ENV_ADMIN_PASS

//listar usuarios
router.get('/', async (req, res) => {
    try {
        const response = await User.find()
        res.json({ message: 'success', status: true, body: response })
        res.end()
    } catch (error) {
        res.json({ message: 'Ocurrio un error de comunicacion co la base de datos', status: false })
        res.end()
    }
})

//registro de usuarios
router.post('/', async (req, res) => {
    const user = req.body
    const userToRegister = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password
    }

    const response = await User(userToRegister).save()
    if (response) {
        res.json({ message: "success", status: true, body: response })
    } else {
        res.status(404).json({ message: "Error al registrar", status: true, body: {} })
    }
})

//login de usuarios
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.json({ status: false, body: {}, message: 'Se espera un correo y una contraseña' })
        }
        const userFinded = await User.findOne({ email })
        if (!userFinded) {
            return res.json({ message: "Usuarion no registrado", status: false })
        }

        const response = await User.findOne({ email, password })
        if (response) {
            let token = generateToken(40)
            let body = {}

            if (response.level === 999) {
                await User.findOneAndUpdate({ email }, { token })
                body = {
                    name: response.name,
                    email: response.email,
                    phone: response.phone,
                    level: response.level,
                    token,
                    _id: response._id
                }
            } else {
                body = {
                    name: response.name,
                    email: response.email,
                    phone: response.phone,
                    level: response.level
                }
            }
            res.json({ message: "success", status: true, body })

        } else {
            res.json({ message: "Contraseña Incorrecta", status: false })
        }
    } catch (error) {
        console.log(error)
        res.end(error)
    }
})

//hacer admin un usuario
router.put('/:id/:token/:adminLevel', async (req, res) => {
    const { id, token, adminLevel } = req.params

    try {
        
        const user = await User.findOne({ token })
        if (!user) {
            res.json({ message: "Usuario no autorizado", status: false })
            res.end()
            return
        }

        const response = await User.findOneAndUpdate({ _id: id }, { level: adminLevel }, { new: true })
        if (response) {
            res.json({ message: 'success', status: true })
            res.end()
            return
        } else {
            res.json({ message: 'No se a podido establecer la comunicacion con la base de datos', status: false })
            res.end()
            return
        }
    } catch (error) {
        console.log(error)
        res.json({ message: 'A ocurrido un error por favor intentar nuevamente', status: false })
        res.end()
        return
    }

})

//eliminar usuarios
router.delete('/:id/:password', async (req, res) => {
    try {
        const { id, password } = req.params
        if (password !== adminPassword) {
            res.json({ message: "Contraseña Incorrecta", status: false })
            res.end()
            return
        }

        const usuarioEliminado = await User.findByIdAndDelete(id)
        if (usuarioEliminado) {
            res.json({ message: 'Usuario eliminado', status: true })
            res.end()
        } else {
            res.json({ message: 'No se pudo eliminar el usuario', status: false })
            res.end()
        }
    } catch (error) {
        console.log(error)
        res.json({ message: 'A ocurrido un error, volver a intentar mas tarde', status: false })
    }
})

module.exports = router;