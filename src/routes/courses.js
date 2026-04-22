const express =  require('express')
const router = express.Router()
const prisma = require('../prisma')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/',authMiddleware,async(req ,res)=>{
    const{title , price , categoria , descripcion} = req.body
    const course = await prisma.course.create({
        data:{title , price , categoria , descripcion}
    })
    res.status(201).json(course)
})

router.get('/', async (req,res)=>{
    const courses = await prisma.course.findMany()
    res.json(courses)
})

router.get('/:id',async (req,res)=>{
    const course = await prisma.course.findUnique({
        where : {id : parseInt(req.params.id)}
    })
    if(!course) return res.status(404).json({message : 'Curso no encontrado'})
    res.json(course)
})

router.post("/", async (req, res) => {
    const { title, price, categoria, descripcion } = req.body;
  
    const course = await prisma.course.create({
      data: { title, price, categoria, descripcion },
    });
  
    res.status(201).json(course);
  });

module.exports = router