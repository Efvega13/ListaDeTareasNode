const http = require('http');
const { listaTareas } = require('./componentes/Funciones');

const server = http.createServer((req, res) => {
  if (req.url === '/nuevasTareas' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const listaTareasJSON = JSON.stringify(listaTareas);
    res.end(listaTareasJSON);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3001, () => {
  console.log('\n Nuevo servidor iniciado en http://localhost:3001');
});

module.exports = server;