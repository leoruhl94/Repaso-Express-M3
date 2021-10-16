const express = require("express");
const morgan = require("morgan");
// importar aqui tu archivo de rutas



//_____________________________________________
const app = express();
module.exports = app;// exporto app para los tests, no borrar
const PORT = 3001;
app.use(morgan("dev"));
//__________________Escribe aqui los Middlewares___________________________


//_______________________________Fin__________________________________
if (!module.parent) app.listen(PORT, console.log(`Listening in http://localhost:${PORT}/`));