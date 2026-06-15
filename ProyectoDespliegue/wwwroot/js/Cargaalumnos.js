$(document).ready(function () {
  ListadoAlumnos();
});

function ListadoAlumnos() {
  $.ajax({
    url: "../../Alumnos/ListadoAlumnos",
    data: {},
    type: "POST",
    dataType: "json",

    success: function (listadoAlumnos) {
      let contenidoTabla = ``;

      $.each(listadoAlumnos, function (index, alumno) {
        contenidoTabla += `
                    <tr>

                        <td>${alumno.nombre ?? ""}</td>
                        <td>${alumno.apellido ?? ""}</td>
                        <td class="ocultar-en-768px">
                            ${alumno.fechaNacimiento ?? ""}
                        </td>
                        <td>${alumno.dni ?? ""}</td>
                        <td class="ocultar-en-768px">
                            ${alumno.telefono ?? ""}
                        </td>
                        <td class="ocultar-en-768px">
                            ${alumno.email ?? ""}
                        </td>
                        <td class="ocultar-en-768px">
                            ${alumno.ciudadResidencia ?? ""}
                        </td>
                        <td>
                            ${alumno.trabaja ? "Sí" : "No"}
                        </td>
<td>

    <button type="button"
            class="btn btn-warning btn-sm"
            onclick="AbrirModalEditar(${alumno.cargaAlumosId})">

        Editar

    </button>

</td>

                        <td>
                            <button type="button"
                                    class="btn btn-danger btn-sm"
                                    onclick="EliminarAlumno(${alumno.cargaAlumosId})">

                                Eliminar
                            </button>
                        </td>

                    </tr>
                `;
      });

      $("#tbody-alumnos").html(contenidoTabla);
    },

    error: function () {
      console.error("Error al cargar alumnos.");
    },
  });
}

function GuardarAlumno(esModal = false) {
  let alumno;

  if (esModal) {
    alumno = {
      CargaAlumosId: $("#CargaAlumosIdModal").val(),
      Nombre: $("#NombreModal").val(),
      Apellido: $("#ApellidoModal").val(),
      FechaNacimiento: $("#FechaNacimientoModal").val(),
      Dni: $("#DniModal").val(),
      Telefono: $("#TelefonoModal").val(),
      Email: $("#EmailModal").val(),
      CiudadResidencia: $("#CiudadResidenciaModal").val(),
      Trabaja: $("#TrabajaModal").is(":checked"),
    };
  } else {
    alumno = {
      CargaAlumosId: $("#CargaAlumosId").val(),
      Nombre: $("#Nombre").val(),
      Apellido: $("#Apellido").val(),
      FechaNacimiento: $("#FechaNacimiento").val(),
      Dni: $("#Dni").val(),
      Telefono: $("#Telefono").val(),
      Email: $("#Email").val(),
      CiudadResidencia: $("#CiudadResidencia").val(),
      Trabaja: $("#Trabaja").is(":checked"),
    };
  }

  if (alumno.Nombre.trim() == "") {
    alert("Debe ingresar un nombre");
    return;
  }

  if (alumno.Apellido.trim() == "") {
    alert("Debe ingresar un apellido");
    return;
  }

  if (alumno.Dni.trim() == "") {
    alert("Debe ingresar un DNI");
    return;
  }

  $.ajax({
    url: "../../Alumnos/GuardarAlumno",
    type: "POST",
    dataType: "json",
    data: alumno,
 success: function (response) {
      alert(response);
 console.log(response);
 $("#modalEditarAlumno").modal("hide");

      ListadoAlumnos();

      LimpiarFormulario();
    },

    error: function () {
      alert("Error al guardar alumno");
    },
  });
}
function AbrirModalEditar(cargaAlumosId) {
  $.ajax({
    url: "../../Alumnos/ListadoAlumnos",
    data: { CargaAlumosId: cargaAlumosId },
    type: "POST",
    dataType: "json",
    success: function (listadoAlumnos) {
      console.log("Respuesta del servidor:", listadoAlumnos);
      let alumno = listadoAlumnos[0];
      document.getElementById("CargaAlumosIdModal").value =
        alumno.cargaAlumosId;
      document.getElementById("NombreModal").value = alumno.nombre;
      document.getElementById("ApellidoModal").value = alumno.apellido;
      document.getElementById("FechaNacimientoModal").value =
        alumno.fechaNacimiento.split("T")[0];
      document.getElementById("DniModal").value = alumno.dni;
      document.getElementById("TelefonoModal").value = alumno.telefono;
      document.getElementById("EmailModal").value = alumno.email;
      document.getElementById("CiudadResidenciaModal").value =
        alumno.ciudadResidencia;

      document.getElementById("TrabajaModal").checked = alumno.trabaja;

      $("#modalEditarAlumno").modal("show");
    },

    error: function () {
      alert("Disculpe, existió un problema");
    },
  });
}

function EliminarAlumno(cargaAlumosId) {
  let confirmar = confirm("¿Desea eliminar el alumno?");

  if (confirmar) {
    $.ajax({
      url: "../../Alumnos/EliminarAlumno",
      type: "POST",
      dataType: "json",
      data: { cargaAlumosId: cargaAlumosId },
      success: function (response) {
        if (response.success) {
          alert("Alumno eliminado correctamente");
          ListadoAlumnos();
        } else {
          alert(response.message);
        }
      },

      error: function () {
        alert("Error al eliminar alumno");
      },
    });
  }
}
