const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function mostrarOpciones() {
  console.log('Opciones:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Mostrar tareas');
  console.log('5. Salir');
}


const tareas = [];


function agregarTarea(indicador, descripcion) {
  tareas.push({ indicador, descripcion, completada: false });
  guardarTareas();
}


function eliminarTarea(indicador) {
  const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    guardarTareas();
  }
}


function completarTarea(indicador) {
  const tarea = tareas.find(tarea => tarea.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
    guardarTareas();
  }
}


function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? 'Completada' : 'Pendiente';
    console.log(`${tarea.indicador}: ${tarea.descripcion} (${estado})`);
  });
}


function guardarTareas() {
  fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));
}


if (fs.existsSync('tareas.json')) {
  const data = fs.readFileSync('tareas.json', 'utf8');
  tareas.push(...JSON.parse(data));
}


mostrarOpciones();


rl.on('line', (input) => {
  switch (input) {
    case '1':
      rl.question('Indicador de la tarea: ', (indicador) => {
        rl.question('Descripción de la tarea: ', (descripcion) => {
          agregarTarea(indicador, descripcion);
          console.log('Tarea agregada.');
          mostrarOpciones();
        });
      });
      break;
    case '2':
      rl.question('Indicador de la tarea a eliminar: ', (indicador) => {
        eliminarTarea(indicador);
        console.log('Tarea eliminada.');
        mostrarOpciones();
      });
      break;
    case '3':
      rl.question('Indicador de la tarea a completar: ', (indicador) => {
        completarTarea(indicador);
        console.log('Tarea marcada como completada.');
        mostrarOpciones();
      });
      break;
    case '4':
      mostrarTareas();
      mostrarOpciones();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, elige una opción válida.');
      mostrarOpciones();
  }
});