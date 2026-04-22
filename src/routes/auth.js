const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')


router.post('/register',async(req , res)=>{
    const {email , password} = req.body
    const exists = await prisma.user.findUnique({where : {email}})
    if(exists)return res.status(400).json({message : 'Usuario ya registrado'})
    const hash = await bcrypt.hash(password,10)
    const usuario = await prisma.user.create({
        data :{email,password:hash}
    })
    res.status(201).json({id : usuario.id, email:usuario.email})
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body
    const existEmail = await prisma.user.findUnique({where :{ email}})
    if(!existEmail) return res.status(401).json({message: 'Usuario no encontrado'})
    const valid = await bcrypt.compare(password , existEmail.password)
    if(!valid) return res.status(401).json({message : 'Contraseña incorrecta'})
    const token = jwt.sign({id : existEmail.id}, process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})
})
module.exports = router