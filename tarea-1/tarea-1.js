/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


////////////////////////////////////// FUNCIONES ///////////////////////////////////


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

function borrarIntegrantesAnteriores() {
  const $integrantes = document.querySelectorAll('.integrante');
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove()
  }
}

function removerIntegrantesPorID() { // la classname de los input cambia cuando devuelven un error, no puedo usar solamente borrarIntegrantesAnteriores()
  integrantes = document.querySelectorAll('#edad-integrante')
  for (let i = 0; i < integrantes.length; i++) {
    integrantes[i].remove()
  }
}

function crearIntegrantes(cantidadIntegrantes) {
  if (Number(cantidadIntegrantes) >= 50) {
    return
  }
  for (let i = 0; i < cantidadIntegrantes; i++) {
    crearIntegrante(i);
  }
}

function removerErrores() {
  const $errores = document.querySelector('#errores')
  removeAllChildNodes($errores)

}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function borrarResultados(resultados) {

  for (let i = 0; i < resultados.length; i++) {
    resultados[i].innerText = ""
  }
}

function eliminarTextoResultados() {
  document.querySelector('#edad-mayor').innerText = ""
  document.querySelector('#edad-menor').innerText = ""
  document.querySelector('#edad-promedio').innerText = ""
}

function demostrarEdades() {

  const numeros = obtenerEdadesIntegrantes();
  document.querySelector('#edad-mayor').innerText = `La edad mayor es ${obtenerNumeroMayor(numeros)}`
  document.querySelector('#edad-menor').innerText = `La edad menor es ${obtenerNumeroMenor(numeros)}`
  document.querySelector('#edad-promedio').innerText = `El promedio de las edades es ${calcularNumeroPromedio(numeros)}`

}

function resetear() {
  borrarIntegrantesAnteriores()
  eliminarTextoResultados()
  removerIntegrantesPorID()
  removerErrores()
}



function crearIntegrante(indice) {
  const $label = document.createElement('label');
  $label.textContent = 'Edad del integrante #: ' + (indice + 1);
  $label.className = 'integrante'
  const $input = document.createElement('input');
  $input.type = 'number';
  $input.className = 'integrante'
  $input.id = 'edad-integrante'
  $input.name = 'edadNombre' + (indice);
  const $listaIntegrantes = document.querySelector('#lista-integrantes');
  $listaIntegrantes.appendChild($label);
  $listaIntegrantes.appendChild($input);
}

function obtenerEdadesIntegrantes() {
  const $integrantes = document.querySelectorAll('#edad-integrante');
  const edades = [];
  for (let i = 0; i < $integrantes.length; i++) {
    if ($integrantes[i].value != '') {
      edades.push(Number($integrantes[i].value));
    }
  }
  if (edades.length != 0) {
    return edades;
  }
}


////////////////////// BOTONES INGRESAR, CALCULAR Y RESETEAR /////////////////////////




document.querySelector('#ingresar').onclick = function () {
  if (document.querySelector('#cantidad-integrantes').value === '') {
    return
  }
  const $cantidadIntegrantes = document.querySelector('#cantidad-integrantes')
  const cantidadIntegrantes = Number($cantidadIntegrantes.value)
  borrarIntegrantesAnteriores()
  removerIntegrantesPorID()
  removerErrores()
  eliminarTextoResultados()
  crearIntegrantes(cantidadIntegrantes)
}

document.querySelector('#calcular').onclick = function () {
  /*resultados = document.querySelectorAll('[name="edad-resultado"]')
  borrarResultados(resultados)*/
  eliminarTextoResultados()
  const contador = document.querySelectorAll('#edad-integrante').length
  const errores = {
  }

  for (i = 0; i < contador; i++) {

    edadIntegrante = document.querySelector('[name=edadNombre' + String(i) + ']').value

    errores['edadNombre' + i] = validarEdadIntegrantes(edadIntegrante)
  }

  const esExito = manejarErrores(errores) === 0;
  if (esExito) {
    demostrarEdades()
  }
}


document.querySelector('#reset').onclick = resetear;


//////////////////////VALIDACION Y MANEJO DE ERRORES/////////////////////////




function validarIntegrantes(integrantes) {
  if (Number(integrantes) === 0) {
    return "El campo integrantes debe tener al menos un numero"
  }
  else if (Number(integrantes) >= 50) {
    return "El campo debe tener menos de 50 integrantes"
  }
  return ""
}
function validarEdadIntegrantes(edadIntegrantes) {
  if (Number(edadIntegrantes) === 0) {
    return "El campo edad integrantes debe tener al menos un numero"
  }
  else if (Number(edadIntegrantes) >= 120) {
    return "La edad del integrante es muy alta"
  }
  else if (!/^\d+$/.test(edadIntegrantes)) {
    return "Las edades no pueden tener decimales"
  }
  return ""
}

function validarFormulario(event) {
  const $form = document.querySelector("#lista-integrantes")


  const integrantes = Number($form.integrantes.value)
  const errorIntegrantes = validarIntegrantes(integrantes)

  const errores = {
    integrantes: errorIntegrantes,
  }
  manejarErrores(errores)
  event.preventDefault();

}


function manejarErrores(errores) {
  const keys = Object.keys(errores)
  const $errors = document.querySelector('#errores')

  let cantidadErrores = 0;
  keys.forEach(function (key) {
    let error = errores[key];
    if (error) {
      removeAllChildNodes($errors)
      cantidadErrores++

      $form[key].className = "error"
      const $error = document.createElement('li')
      $error.innerText = error;
      $error.id = key + "error"
      if (error) {
        $errors.appendChild($error)
      }

    }

    else {
      $form[key].className = ""
      if (document.querySelector('#' + key + "error")) {
        document.querySelector('#' + key + "error").remove()
      }
    }


  }
  )
  return cantidadErrores
}



const $form = document.querySelector("#lista-integrantes");
$form.onsubmit = validarFormulario


