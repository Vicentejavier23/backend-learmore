const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const coursesRouter = require("./routes/courses");
const authRouter = require("./routes/auth")

app.use(cors({
  origin: 'https://learnmore-frontend-phi.vercel.app', // Tu URL de Vercel sin la barra final
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/courses', coursesRouter);
app.use('/auth',authRouter)

app.get("/", (req, res) => {
  res.json({ message: "Learnmore api funcionando" });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
