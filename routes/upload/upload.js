const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
/* const Buildings = require('../buildings/buildingsModel') */
const tokenGenerator = require('../../services/tokenGenerator')

const storage = multer.diskStorage({
    destination: 'files/', // Carpeta donde se guardarán los archivos
    filename: (req, file, cb) => {
        const randomChain = tokenGenerator(5)
        cb(null, file.fieldname + '-' + randomChain + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

router.post('/:id',upload.array('image',6), async (req, res) => {
    const files = req.files
    const _id = req.params.id
   /*  const respuesta = await Buildings.findOneAndUpdate({_id},{images:files}) */
   /*  if (respuesta){
        res.json({ message: "success images", status: true, body: respuesta })
    }
    else{
        res.json({ message: "No se pudo subir la imagen", status: false })
    } */
    res.json({ message: "No se pudo subir la imagen", status: false })
})


module.exports = router;