
async function obtenerDatos() {
    try {
    // obtenemos Datos de la api
      let respuesta = await axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/db');
      let datos = respuesta.data;
      let dispositivos = datos.dispositivos;

      // creamos la tabla que contenera los elementos obtenidos
      let contenedor = document.getElementById('div');
      let tabla = document.createElement('table');
      tabla.className = 'tabla-Datos';

      // elementos de encabezado de la tabla
      let encabezado = document.createElement('tr');
      let encabezadoMarca = document.createElement('th');
      encabezadoMarca.id = 'encabezadoMarca'
      let encabezadoModelo = document.createElement('th');
      let encabezadoColor = document.createElement('th');
      let encabezadoAlmacenamiento = document.createElement('th');
      let encabezadoProcesador = document.createElement('th');
      let encabezadoId = document.createElement('th');
      encabezadoMarca.textContent = 'Marca';
      encabezadoModelo.textContent = 'Modelo';
      encabezadoColor.textContent = 'Color';
      encabezadoAlmacenamiento.textContent = 'Almacenamiento';
      encabezadoProcesador.textContent = 'Procesador';
      encabezadoId.textContent = 'ID'

      // agregamos cada elemento obtenido como hijo del contenedor encabezado
      encabezado.appendChild(encabezadoMarca);
      encabezado.appendChild(encabezadoModelo);
      encabezado.appendChild(encabezadoColor);
      encabezado.appendChild(encabezadoAlmacenamiento);
      encabezado.appendChild(encabezadoProcesador);
      encabezado.appendChild(encabezadoId);
      tabla.appendChild(encabezado);

      // obtenemos la informacion de cada elemento y le damos un contenedor
      dispositivos.forEach(dispositivo => {
        let fila = document.createElement('tr');
        fila.className = 'fila'
        let celdaMarca = document.createElement('td');
        celdaMarca.id = 'celdaMarca';
        let celdaModelo = document.createElement('td');
        let celdaColor = document.createElement('td');
        let celdaAlmacenamiento = document.createElement('td');
        let celdaProcesador = document.createElement('td');
        let celdaId = document.createElement('td');

        // manipulamos los elementos para mostrar la informacion       
        let filaAbierta = false; 
        let modeloAbierto = false
        
        encabezadoMarca.addEventListener('click', function() {
          if (!filaAbierta) {
            fila.style.display = 'table-row';
            celdaMarca.textContent = dispositivo.marca;
            filaAbierta = true;
          } else {
            fila.style.display = 'none';
            celdaMarca.textContent = '';
            filaAbierta = false;
          }
        });

        let btnLeer = document.getElementById('read')
        btnLeer.addEventListener('click', function() {
          if (!filaAbierta) {
            fila.style.display = 'table-row';
            celdaMarca.textContent = dispositivo.marca;
            celdaModelo.textContent = dispositivo.modelo;
            celdaColor.textContent = dispositivo.color;
            celdaAlmacenamiento.textContent = dispositivo.almacenamiento;
            celdaProcesador.textContent = dispositivo.procesador;
            celdaId.textContent = dispositivo.id;

            filaAbierta = true;
          } else {
            fila.style.display = 'none';
            celdaMarca.textContent = '';
            filaAbierta = false;
          }
        });
        
        encabezadoModelo.addEventListener('click', function(event) {
          event.stopPropagation(); // Evita que el clic se propague al encabezado de marca
          if (filaAbierta) {           
            if (!modeloAbierto) {
              celdaModelo.textContent = dispositivo.modelo;
              modeloAbierto = true;
            } else {
              celdaModelo.textContent = '';
              modeloAbierto = false;
            }
          }
        });
        
        celdaMarca.addEventListener('click', function() {
          if (celdaMarca.textContent !== '' && filaAbierta) {
            if (celdaModelo.textContent === '') {
              celdaModelo.textContent = dispositivo.modelo;
              celdaColor.textContent = dispositivo.color;
              celdaAlmacenamiento.textContent = dispositivo.almacenamiento;
              celdaProcesador.textContent = dispositivo.procesador;
              celdaId.textContent = dispositivo.id;

            } else {
              celdaModelo.textContent = '';
              celdaColor.textContent = '';
              celdaAlmacenamiento.textContent = '';
              celdaProcesador.textContent = '';
            }
          }
        });
        
        fila.appendChild(celdaMarca);
        fila.appendChild(celdaModelo);
        fila.appendChild(celdaColor);
        fila.appendChild(celdaAlmacenamiento);
        fila.appendChild(celdaProcesador)
        fila.appendChild(celdaId)
        tabla.appendChild(fila);
      });
  
      contenedor.innerHTML = '';
      contenedor.appendChild(tabla);
      btnCrearelementoTabla()

    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  }

  async function AgregarNuevoElementoTabla(marca, modelo, color, almacenamiento, procesador) {
    try {
      // Objeto que contiene los datos a agregar
      let nuevoElemento = {
        marca: marca,
        modelo: modelo,
        color: color,
        almacenamiento: almacenamiento,
        procesador: procesador
      };
  
      let respuesta = await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Especifica que los datos enviados son JSON
        },
        body: JSON.stringify(nuevoElemento) // Convierte el objeto a JSON
      });
  
      // Verificar si la solicitud se realizó con éxito
      if (respuesta.ok) {
        let resultado = await respuesta.json();
        console.log("Elemento agregado:", resultado);
      } else {
        console.error("Error al agregar elemento:", respuesta.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  function btnCrearelementoTabla() {
    let btnElementoCrear = document.getElementById('create');
    let contenedorInput = document.getElementById('creraElemento')
  
    btnElementoCrear.addEventListener('click', function() {
      contenedorInput.classList.add('crear-elemento-input-visible');
    })

    btnElementoCrear.addEventListener('dblclick', function(){
      let inputMarca = document.getElementById('inputMarca').value;
      let inputModelo = document.getElementById('inputModelo').value;
      let inputColor = document.getElementById('inputcolor').value;
      let inputAlmacenamiento = document.getElementById('inputAmacelamieto').value;
      let inputProcesador = document.getElementById('inputProcesador').value;

      if(inputMarca == '' && inputModelo == '' && inputColor == '' && inputAlmacenamiento == '' && inputProcesador == ''){
        alert('Complete los campos correctamente')
      }else{
        AgregarNuevoElementoTabla(inputMarca, inputModelo, inputColor, inputAlmacenamiento, inputProcesador);
        alert('Su equipo se agrego correctamente')
      } 
    })
  }

  async function actualizarElementosTabla(idModelo, marca, modelo, color, almacenamiento, procesador) {
    try {
   
      let response = await fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${idModelo}`);
  
      if (!response.ok) {
        console.error('Error al obtener el elemento para actualizar.');
        return;
      }
  
      let elementoExistente = await response.json();
  
      
      elementoExistente.marca = marca;
      console.log(elementoExistente.marca + 'elemento')
      elementoExistente.modelo = modelo;
      elementoExistente.color = color;
      elementoExistente.almacenamiento = almacenamiento;
      elementoExistente.procesador = procesador;
  
      // Realiza una solicitud PATCH para actualizar el elemento en el servidor
      let respuesta = await fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${idModelo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementoExistente)
      });
  
      if (respuesta.ok) {
        console.log(respuesta, 'respuesta ')
        console.log(`La actualización fue exitosa`);
        alert(`La actualización fue exitosa, \n 
              Nueva Marca: ${elementoExistente.marca} \n
              Nuevo modelo: ${elementoExistente.modelo} \n
              Nuevo color: ${elementoExistente.color} \n
              Nuevo almacenamiento: ${elementoExistente.almacenamiento} \n
              nuevo procesador: ${elementoExistente.procesador}`)
      } else {
        console.error('Error al actualizar la tabla.');
        alert('Error al actualizar la tabla.')
      }
    } catch (error) {
      console.error('Error en la función de actualización:', error);
    }
  }
  
  function btnActualizar() {
    let obtenerID = document.getElementById('idElemento').value;
    console.log(obtenerID, 'este es el')
    let obtenerMarca = document.getElementById('elementoMarca').value;
    let obtenerModelo = document.getElementById('elementoModelo').value;
    let obtenerColor = document.getElementById('elementoColor').value;
    let obtenerAlmacenamiento = document.getElementById('elementoAlmacenamiento').value;
    let obtenerProcesador = document.getElementById('elementoProcesador').value;
  
      if (obtenerID !== '' && !isNaN(obtenerID)) {
        actualizarElementosTabla(
          obtenerID,
          obtenerMarca,
          obtenerModelo,
          obtenerColor,
          obtenerAlmacenamiento,
          obtenerProcesador
        );
      } else {
        console.error('ID no válido.');
      };
  };
  let ElementoBtn = document.getElementById('Update');
  ElementoBtn.addEventListener('click', function(){
    let elementoAModificar = document.getElementById('elementoAModificar')
    btnActualizar()
    elementoAModificar.classList.add('elementoAModificar-Visible');
    
  })

async function eliminarElemento(idAeliminar) {
    try {
      let response = await fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${idAeliminar}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        console.log('Elemento eliminado correctamente.');
        alert('Elemento eliminado correctamente.')
      } else {
        console.error('Error al eliminar elemento:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
  

function eliminarSegunId(){
  let btnEliminar = document.getElementById('delete');
  btnEliminar.addEventListener('click', function(){
    let inputDelete = document.getElementById('deleteId').value
    eliminarElemento(inputDelete);
  })
}
  
obtenerDatos()
eliminarSegunId()
