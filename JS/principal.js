window.addEventListener('load', function(){
    //referenciar elementos de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');

    const result = JSON.parse(this.localStorage.getItem('respuesta'));
    mostrarAlerta(result.nombreUsuario)
});



function mostrarAlerta(mensaje, mensajeAlerta) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
  }
  
  function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
  }