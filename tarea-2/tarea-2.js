/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

////////////////////////////////// FUNCIONES /////////////////////////////////////////

function calcularSalarioMensual(salarioAnual) {
  return salarioAnual / 12;
}

function obtenerNumeroMenor(lista) {
  let numeroMenor = lista[0];
  for (i = 0; i < lista.length; i++) {
    if (lista[i] < numeroMenor) {
      numeroMenor = lista[i];
    }
  }

  return numeroMenor;
}
function obtenerNumeroMayor(lista) {
  let numeroMayor = lista[0];
  for (i = 0; i < lista.length; i++) {
    if (lista[i] > numeroMayor) {
      numeroMayor = lista[i];
    }
  }

  return numeroMayor;
}
function calcularNumeroPromedio(lista) {
  let numeroPromedio = 0;
  for (i = 0; i < lista.length; i++) {
    if (lista[i] != 0) {
      numeroPromedio = numeroPromedio + lista[i] / lista.length;
    }
  }
  return numeroPromedio.toFixed(2);
}

function borrarResultados() {
  resultados = document.querySelectorAll(".resultado");
  borrarIntegrantesAnteriores(resultados);
}

function borrarIntegrantesAnteriores(integrante) {
  for (let i = 0; i < integrante.length; i++) {
    integrante[i].innerText = "";
  }
}

function convertirListaDeSalariosAnualesAMensuales(listaSalarioAnual) {
  let listaSalarioMensual = [];
  for (i = 0; i < listaSalarioAnual.length; i++) {
    listaSalarioMensual.push(
      Number(calcularSalarioMensual(listaSalarioAnual[i]))
    );
  }
  return listaSalarioMensual;
}

function obtenerListaSalarioAnual() {
  let listaDeInputsCreados = document.querySelectorAll("input");
  let listaDeSalariosAnuales = [];
  for (i = 0; i < listaDeInputsCreados.length; i++) {
    if (listaDeInputsCreados[i].value != "") {
      // esto previene que los inputs vacios sean 0 para el punto extra
      listaDeSalariosAnuales.push(Number(listaDeInputsCreados[i].value));
    }
  }
  if (listaDeSalariosAnuales.length != 0) {
    // para que no devuelva un array vacio, sin esto los input vacios se van a mostrar como Undefined
    return listaDeSalariosAnuales;
  }
}

function mostrarResultados() {
  borrarResultados();
  listaDeSalariosAnuales = obtenerListaSalarioAnual();
  let listaSalarioMensual = convertirListaDeSalariosAnualesAMensuales(
    listaDeSalariosAnuales
  );
  document.querySelector(
    "#salario-anual-menor"
  ).innerText = `El saluario anual menor es: $${obtenerNumeroMenor(
    listaDeSalariosAnuales
  )}.`;
  document.querySelector(
    "#salario-anual-mayor"
  ).innerText = `El saluario anual mayor es: $${obtenerNumeroMayor(
    listaDeSalariosAnuales
  )}.`;
  document.querySelector(
    "#salario-anual-promedio"
  ).innerText = `El saluario anual promedo es: $${calcularNumeroPromedio(
    listaDeSalariosAnuales
  )}.`;
  document.querySelector(
    "#salario-mensual-promedio"
  ).innerText = `El saluario mensual promedio es: $${calcularNumeroPromedio(
    listaSalarioMensual
  )}.`;
}

/////////////////////////////////// BOTONES: CREAR Y QUITAR //////////////////////////////////

document.querySelector("#crear").onclick = function () {
  let $formulario = document.getElementById("formulario");
  let $nuevoInput = document.createElement("input");
  let contador = document.querySelectorAll(".integrante-familiar");
  $nuevoInput.type = "number";
  $nuevoInput.id = "nuevosinputs";
  $nuevoInput.name = "nameSueldoIntegrante" + String(contador.length);
  let $nuevoLabel = document.createElement("label");
  $nuevoLabel.className = "integrante-familiar";

  $nuevoLabel.textContent = `Sueldo integrante ${String(contador.length + 1)}:`;
  $formulario.appendChild($nuevoLabel);
  $formulario.appendChild($nuevoInput);
};

document.querySelector("#quitar").onclick = function () {
  let $formulario = document.getElementById("formulario");
  $formulario.removeChild(formulario.lastChild);
  $formulario.removeChild(formulario.lastChild);
};

//////////////////////////////////////////// VALIDACION Y MANEJO DE ERRORES ////////////////////////

function validarSueldoIntegrantes(integrantes) {
  if (integrantes === "") {
    return "El campo debe tener al menos un numero";
  }
  return "";
}

function validarFormulario(event) {
  const contador = document.querySelectorAll("#nuevosinputs").length;

  let errores = {};
  for (i = 0; i < contador; i++) {
    sueldoIntegrantes = document.querySelector(
      "[name=nameSueldoIntegrante" + String(i) + "]"
    ).value;
    errores["nameSueldoIntegrante" + i] =
      validarSueldoIntegrantes(sueldoIntegrantes);
  }

  const esExito = manejarErrores(errores) === 0;
  if (esExito) {
    mostrarResultados();
  }

  event.preventDefault();
}

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  const $errors = document.querySelector("#errores");
  resultados = document.querySelectorAll(".resultado");
  let cantidadErrores = 0;
  keys.forEach(function (key) {
    let error = errores[key];
    if (error) {
      borrarIntegrantesAnteriores(resultados);
      cantidadErrores++;
      $form[key].className = "error";
      const $error = document.createElement("li");
      $error.innerText = error;
      $error.id = key + "error";
      //if (!document.querySelector('#' + key + "error")){
      if ($errors.childNodes.length < 2) {
        $errors.appendChild($error);
      }
    } else {
      $form[key].className = "";
      if (document.querySelector("#" + key + "error")) {
        document.querySelector("#" + key + "error").remove();
      }
    }
  });
  return cantidadErrores;
}
const $form = document.querySelector("#formulario");
$form.onsubmit = validarFormulario;
