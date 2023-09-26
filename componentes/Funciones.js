const listaTareas = [
    {
      descripcion: 'Hacer desayuno',
      completada: false,
      id: '1'
    },
    {
      descripcion: 'Jugar Play',
      completada: false,
      id: '2'
    },
    {
      descripcion: 'trabajar 8 horas',
      completada: true,
      id: '3'
    },
    {
      descripcion: 'ver peliculas',
      completada: false,
      id: '4'
    },
  ];
  
  function crearTarea(descripcion, completada = false) {
    const nuevaTarea = {
      descripcion,
      completada,
      id: generarIDUnico(),
    };
    listaTareas.push(nuevaTarea);
    return nuevaTarea; 
  }
  
  function borrarTarea(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
      listaTareas.splice(index, 1);
      return true;
    }
    return false; 
  }
  
  function finalizarTarea(id) {
    const tarea = listaTareas.find((t) => t.id === id);
    if (tarea) {
      tarea.completada = true;
      return tarea; 
    }
    return null;
  }
  
  function visualizarTarea() {
    console.log('Lista de Tareas:');
    listaTareas.forEach((tarea) => {
      console.log(`ID: ${tarea.id}`);
      console.log(`Descripción: ${tarea.descripcion}`);
      console.log(`Completada: ${tarea.completada}`);
      console.log('-----------------------');
    });
  }
  
  function generarIDUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  
  module.exports = {
    listaTareas, 
    crearTarea,
    borrarTarea,
    finalizarTarea,
    visualizarTarea,
  };