/* Se ejecuta cuando la pagina se ha cargado completamente
  En caso se desee ejecutar el script apenas haya cargado el DOM
  -> window.addEventListener('DOMContentLoaded', function() { // Funcion anonima });
  -> En la importacion del script se debe agregar el atributo defer
*/
window.addEventListener('load', function() { // Funcion anonima

    // Referenciar elementos de la pagina
    const tipoDocumento = document.getElementById('tipoDocumento');
    const numeroDocumento = document.getElementById('numeroDocumento');
    const password = document.getElementById('password');
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');
    const mensajeAlerta = document.getElementById('mensajeAlerta');
  
    // Implementar listener para el evento click
    btnIniciarSesion.addEventListener('click', function() {
  
      // Validar campos
      // trim() elimina los espacios en blanco al inicio y al final de la cadena
  
      if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' || 
        numeroDocumento.value === null || numeroDocumento.value.trim() === '' || 
        password.value === null || password.value.trim() === '') {
            mostrarAlerta('Error: Complete las credenciales', mensajeAlerta);
            return;
      }
       ocultarAlerta(mensajeAlerta);
       //consumir accion mvc
       autenticar();

    });
  
  });
  
  function mostrarAlerta(mensaje, mensajeAlerta) {
    mensajeAlerta.innerHTML = mensaje;
    mensajeAlerta.style.display = 'block';
  }
  
  function ocultarAlerta() {
    mensajeAlerta.innerHTML = '';
    mensajeAlerta.style.display = 'none';
  }
  async function autenticar(){
    const url = 'http://localhost:8083/login/authentication-async';
    const data = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    };
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            mostrarAlerta('Error: Ocurrio un problema con la autenticación');
            throw new Error(`Error: ${response.statusText}`);
        }

        // validar respuesta
        const respuesta = await response.json();
        console.log('Respuesta del servidor: ', respuesta)
        if(respuesta.codigo === '00'){
            localStorage.setItem('respuesta', JSON.stringify(respuesta));
            window.location.replace = 'principal.html';
        } else {
            mostrarAlerta(respuesta.mensaje);
        }

    } catch(error){
        console.error('Error: Ocurrio un problema no identificado',error);
        mostrarAlerta('Error: Ocurrio un problema con la autenticación');
    }
  }