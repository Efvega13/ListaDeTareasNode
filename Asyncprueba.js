const readline = require('readline');
const fs = require('fs').promises; // Importamos fs.promises para utilizar promesas en fs

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

async function agregarTarea(indicador, descripcion) {
  tareas.push({ indicador, descripcion, completada: false });
  await guardarTareas();
  console.log('Tarea agregada.');
}

async function eliminarTarea(indicador) {
  const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    await guardarTareas();
    console.log('Tarea eliminada.');
  } else {
    console.log('La tarea no existe.');
  }
}

async function completarTarea(indicador) {
  const tarea = tareas.find(tarea => tarea.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
    await guardarTareas();
    console.log('Tarea marcada como completada.');
  } else {
    console.log('La tarea no existe.');
  }
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? 'Completada' : 'Pendiente';
    console.log(`${tarea.indicador}: ${tarea.descripcion} (${estado})`);
  });
}

async function guardarTareas() {
  try {
    await fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2));
  } catch (error) {
    console.error('Error al guardar tareas:', error);
  }
}

async function main() {
  if (fs.existsSync('tareas.json')) {
    const data = await fs.readFile('tareas.json', 'utf8');
    tareas.push(...JSON.parse(data));
  }

  mostrarOpciones();

  rl.on('line', async input => {
    switch (input) {
      case '1':
        const indicador = await pregunta('Indicador de la tarea: ');
        const descripcion = await pregunta('Descripción de la tarea: ');
        await agregarTarea(indicador, descripcion);
        mostrarOpciones();
        break;
      case '2':
        const indicadorEliminar = await pregunta('Indicador de la tarea a eliminar: ');
        await eliminarTarea(indicadorEliminar);
        mostrarOpciones();
        break;
      case '3':
        const indicadorCompletar = await pregunta('Indicador de la tarea a completar: ');
        await completarTarea(indicadorCompletar);
        mostrarOpciones();
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

  function pregunta(texto) {
    return new Promise(resolve => {
      rl.question(texto, respuesta => {
        resolve(respuesta);
      });
    });
  }
}

main();