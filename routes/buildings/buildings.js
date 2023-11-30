const express = require('express')
const router = express.Router()
const Buildings = require('./buildingsModel')

router.get('/', async (req, res) => {
    const response = await Buildings.find()
    res.json({ message: "success", status: true, body: response })
})

router.get('/:id', (req, res) => {
    //obtener 1 inmueble
    const id = req.params.id
    Buildings.findById(id).then(response => {
        res.json({ message: "success", status: true, body: response })
    }).catch(error => {
        res.json({ message: "error", status: false, body: error })
    })
    
})

router.post('/', async (req, res) => {
    const body = {
        municipios: req.body.municipios,
        parroquias: req.body.parroquias,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        cantidadCuartos: Number(req.body.cantidadCuartos),
        ventaOAlquiler: req.body.ventaOAlquiler,
        cantidadBanos: Number(req.body.cantidadBanos),
        cantidadEstacionamientos: Number(req.body.cantidadEstacionamientos),
        metrosTerreno: Number(req.body.metrosTerreno),
        metrosConstruccion: Number(req.body.metrosConstruccion),
        idPublicante: req.body.idPublicante,
        tipo: req.body.tipo
    }

    const response = await Buildings(body).save()

    res.json({ message: "success", status: true, body: response })

    /* try {
        if (response) {
            res.json({ message: "success", status: true, body: response })
        
        } else {
            res.json({ message: "Error al registrar", status: false, body: {} })
            
        }

    } catch (error) {
        res.json({ message: "Error de comunicacion con de base de datos ", status: false, body: {} })
    } */
})

router.put('/', (req, res) => {
    //editar un inmuebles
    res.json({ message: "success", status: true, body: {} })
})

router.delete('/:id', async(req, res) => {
    //eliminar un inmuebles
    
    const response = await Buildings.findOneAndDelete({_id: req.params.id})
    if(response){
        res.json({ message: "success", status: true, body: response })
    }else{
        res.json({ message: "error", status: false, body: {} })
    }
    res.end()
})

module.exports = router;