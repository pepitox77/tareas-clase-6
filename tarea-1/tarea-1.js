/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

function obtenerNumeroMenor(lista) {
    let numeroMenor = lista[0]
    for (i = 0; i < lista.length; i++) {
        if (lista[i] < numeroMenor) {
            numeroMenor = lista[i]
        }
    }

    return numeroMenor
}
function obtenerNumeroMayor(lista) {
    let numeroMayor = lista[0]
    for (i = 0; i < lista.length; i++) {
        if (lista[i] > numeroMayor) {
            numeroMayor = lista[i]
        }
    }

    return numeroMayor
}
function calcularNumeroPromedio(lista) {
    let numeroPromedio = 0
    for (i = 0; i < lista.length; i++) {
         numeroPromedio = numeroPromedio + lista[i] / lista.length
    }
    return numeroPromedio
}

document.querySelector('#calcular').onclick = function() {
    const numeros = obtenerEdadesIntegrantes();
document.querySelector('#edad-mayor').innerText = `La edad mayor es ${obtenerNumeroMayor(numeros)}`
document.querySelector('#edad-menor').innerText = `La edad menor es ${obtenerNumeroMenor(numeros)}`
document.querySelector('#edad-promedio').innerText = `El promedio de las edades es ${calcularNumeroPromedio(numeros)}`
}
  


document.querySelector('#ingresar').onclick = function() {
    const $cantidadIntegrantes = document.querySelector('#cantidad-integrantes')
    const cantidadIntegrantes = Number($cantidadIntegrantes.value)
    borrarIntegrantesAnteriores()
    crearIntegrantes(cantidadIntegrantes)
  }


  function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll('.integrante');
    for (let i = 0; i < $integrantes.length; i++) {
      $integrantes[i].remove()
    }
  }

  function crearIntegrantes(cantidadIntegrantes) {
    for (let i = 0; i < cantidadIntegrantes; i++) {
      crearIntegrante(i);
    }
  }

  function crearIntegrante(indice) {
  
    const $label = document.createElement('label');
    $label.textContent = 'Edad del integrante #: ' + (indice + 1);
    $label.className = 'integrante'
    const $input = document.createElement('input');
    $input.type = 'number';
    $input.className = 'integrante'
    $input.id = 'edad-integrante'
  
  
    const $listaIntegrantes = document.querySelector('#lista-integrantes');
    $listaIntegrantes.appendChild($label);
    $listaIntegrantes.appendChild($input);
  }
  
  function obtenerEdadesIntegrantes() {
    const $integrantes = document.querySelectorAll('#edad-integrante');
    const edades = [];
    for (let i = 0; i < $integrantes.length; i++) {
      edades.push(Number($integrantes[i].value));
    }
    return edades;
  }

  function eliminarTextoResultados(){
    document.querySelector('#edad-mayor').innerText =""
    document.querySelector('#edad-menor').innerText =""
    document.querySelector('#edad-promedio').innerText =""
  }



document.querySelector('#reset').onclick = resetear;

function resetear(){
borrarIntegrantesAnteriores()
eliminarTextoResultados()
}




