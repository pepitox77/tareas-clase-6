function probarValidarIntegrantes() {
  console.assert(
    validarIntegrantes("") ===
      "El campo integrantes debe tener al menos un numero",
    "Validar integrantes no valido que el campo no este vacio"
  );
  console.assert(
    validarIntegrantes("0") ===
      "El campo integrantes debe tener al menos un numero",
    "Validar integrantes no valido que el campo no tenga solamente un 0"
  );
  console.assert(
    validarIntegrantes(
      "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    ) === "El campo debe tener menos de 50 integrantes",
    "Validar integrantes no valido que el campo tenga menos de 50 personas"
  );

  console.assert(
    validarIntegrantes("14") === "",
    "Validar integrantes no funciono con numeros correctos"
  );
}

function probarValidarEdadIntegrantes() {
  console.assert(
    validarEdadIntegrantes("") ===
      "El campo edad integrantes debe tener al menos un numero",
    "Validar edad integrantes no valido que el campo no este vacio"
  );
  console.assert(
    validarEdadIntegrantes("0") ===
      "El campo edad integrantes debe tener al menos un numero",
    "Validar edad integrantes no valido que el campo no tenga solamente un 0"
  );

  console.assert(
    validarEdadIntegrantes("123") === "La edad del integrante es muy alta",
    "Validar edad integrantes no valido que la edad es muy alta"
  );

  console.assert(
    validarEdadIntegrantes("1.2") === "Las edades no pueden tener decimales",
    "Validar edad integrantes no valido que la edad solamente contenga numeros"
  );
  console.assert(
    validarEdadIntegrantes("14") === "",
    "Validar edad integrantes no funciono con numeros correctos"
  );
}

probarValidarIntegrantes();
probarValidarEdadIntegrantes();
