const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: '*'
}));

const PORT = process.env.PORT || 3000;
const coursesRouter = require("./routes/courses");
const authRouter = require("./routes/auth")


app.use(express.json());

app.use('/courses', coursesRouter);
app.use('/auth',authRouter)

app.get("/", (req, res) => {
  res.json({ message: "Learnmore api funcionando" });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
