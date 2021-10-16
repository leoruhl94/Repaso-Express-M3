const express = require("express");
const morgan = require("morgan");
// importar aqui tu archivo de rutas

const routes = require("./routes");

//_____________________________________________
const app = express();
module.exports = app;// exporto app para los tests, no borrar
const PORT = 3001;
app.use(morgan("dev"));
//__________________Escribe aqui los Middlewares___________________________

app.use(express.json());
app.use('/', routes)

//_______________________________Fin__________________________________
if (!module.parent) app.listen(PORT, console.log(`Listening in http://localhost:${PORT}/`));