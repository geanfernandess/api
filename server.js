const debug = require("debug")("node");
const http = require("http");

const app = require("./server/app");
const db = require('./server/config/database');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT_APP || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

// Funçao para verificar a conexao com o banco de dados
async function checkDatabaseConnection() {
  try {
      await db.any('SELECT 1'); 
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error.message);
      process.exit(1); 
  }
}

// So inicia o servidor se tiver uma conexão com o banco de dados
checkDatabaseConnection().then(() => {
  server.listen(port, () => {
    console.log(`Aplicação iniciada na porta ${port}`);
  });
});