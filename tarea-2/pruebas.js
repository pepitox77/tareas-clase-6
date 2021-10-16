function probarValidarSueldoIntegrantes() {
  console.assert(
    validarSueldoIntegrantes("") === "El campo debe tener al menos un numero",
    "validar sueldo integrantes no valido que el campo tenga al menos un numero"
  );

  console.assert(
    validarSueldoIntegrantes("1234") === "",
    "validar sueldo integrantes fallo con caracteres validos"
  );
}

probarValidarSueldoIntegrantes();
