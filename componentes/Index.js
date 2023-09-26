require('colors');
const readline = require('readline');
const http = require('http');
const { crearTarea, borrarTarea, finalizarTarea, visualizarTarea } = require('./Funciones');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

const mostrarMenu = () => {
  console.log('======================='.green);
  console.log('   Tus Tareas    '.green);
  console.log('======================='.green);
  console.log(`${'Seleccione una opción:'.underline.cyan}`);
  console.log(`${'1.'.cyan} Agregar nueva tarea`);
  console.log(`${'2.'.cyan} Visualizar nueva tarea`);
  console.log(`${'3.'.cyan} Finalizar nueva tarea`);
  console.log(`${'4.'.cyan} Borrar nueva tarea`);
  console.log(`${'5.'.cyan} Salir`);
};

const menu = () => {
  mostrarMenu();
  rl.question('', async (opcion) => {
    switch (opcion.trim()) {
      case '1':
        console.clear();
        rl.question('Ingresa la nueva tarea: ', async (description) => {
          try {
            await crearTarea(description);
            console.log('\n Nueva tarea creada exitosamente!'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '2':
        console.clear();
        visualizarTarea();
        menu();
        break;

      case '3':
        console.clear();
        visualizarTarea();
        rl.question('¿Qué tarea desea finalizar? ', async (complete) => {
          try {
            await finalizarTarea(complete);
            console.log('\n Nueva tarea completada exitosamente'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '4':
        console.clear();
        visualizarTarea();
        rl.question('¿Qué tarea desea borrar? ', async (eliminar) => {
          try {
            await borrarTarea(eliminar);
            console.log('\n Nueva tarea eliminada exitosamente'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '5':
        rl.close();
        break;

      default:
        console.clear();
        console.log('\n Ingresa una opción válida, por favor.'.red);
        menu();
        break;
    }
  });
};

server.listen(3000, () => {
  console.log('\n Nuevo servidor iniciado en http://localhost:3000'.green);
});

module.exports = {
  menu,
};