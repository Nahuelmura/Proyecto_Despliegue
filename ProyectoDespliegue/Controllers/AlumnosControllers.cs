using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ProyectoDespliegue.Data;
using ProyectoDespliegue.Models;

namespace ProyectoDespliegue.Controllers;

public class AlumnosController : Controller
{
    private readonly ILogger<AlumnosController> _logger;
    private readonly ApplicationDbContext _context;

    public AlumnosController(ILogger<AlumnosController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }



    public JsonResult ListadoAlumnos(int? CargaAlumosId)
    {
        var listadoAlumnos = _context.CargaAlumos.ToList();

        if (CargaAlumosId != null)
        {
            listadoAlumnos = _context.CargaAlumos.Where(l => l.CargaAlumosId == CargaAlumosId).ToList();
        }

        return Json(listadoAlumnos);
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }








    public JsonResult GuardarAlumno(  int cargaAlumosId,  string nombre,  string apellido,  DateTime fechaNacimiento,   int dni,  string telefono,   string email,   string ciudadResidencia, bool trabaja)
    {
        string resultado = "";

        if (!String.IsNullOrEmpty(nombre) &&
            !String.IsNullOrEmpty(apellido))
        {

            nombre = nombre.ToUpper();
            apellido = apellido.ToUpper();

            if (!String.IsNullOrEmpty(telefono))
            {
                telefono = telefono.ToUpper();
            }

            if (!String.IsNullOrEmpty(email))
            {
                email = email.ToUpper();
            }

            if (!String.IsNullOrEmpty(ciudadResidencia))
            {
                ciudadResidencia = ciudadResidencia.ToUpper();
            }

            // NUEVO
            if (cargaAlumosId == 0)
            {

                var existeAlumno = _context.CargaAlumos
                    .Where(a => a.Dni == dni)
                    .Count();

                if (existeAlumno == 0)
                {

                    var nuevoAlumno = new CargaAlumos
                    {
                        Nombre = nombre,
                        Apellido = apellido,
                        FechaNacimiento = fechaNacimiento,
                        Dni = dni,
                        Telefono = telefono,
                        Email = email,
                        CiudadResidencia = ciudadResidencia,
                        Trabaja = trabaja
                    };

                    _context.Add(nuevoAlumno);

                    _context.SaveChanges();

                    resultado = "Alumno guardado exitosamente";
                }
                else
                {
                    resultado = "Ya existe un alumno con ese DNI";
                }
            }

         
            else
            {

                var editarAlumno = _context.CargaAlumos
                    .Where(a => a.CargaAlumosId == cargaAlumosId)
                    .SingleOrDefault();

                if (editarAlumno != null)
                {

                    var existeAlumno = _context.CargaAlumos
                        .Where(a => a.Dni == dni &&
                                    a.CargaAlumosId != cargaAlumosId)
                        .Count();

                    if (existeAlumno == 0)
                    {

                        editarAlumno.Nombre = nombre;
                        editarAlumno.Apellido = apellido;
                        editarAlumno.FechaNacimiento = fechaNacimiento;
                        editarAlumno.Dni = dni;
                        editarAlumno.Telefono = telefono;
                        editarAlumno.Email = email;
                        editarAlumno.CiudadResidencia = ciudadResidencia;
                        editarAlumno.Trabaja = trabaja;

                        _context.SaveChanges();

                        resultado = "Alumno editado exitosamente";
                    }
                    else
                    {
                        resultado = "Ya existe un alumno con ese DNI";
                    }
                }
            }
        }
        else
        {
            resultado = "Debe completar Nombre y Apellido";
        }

        return Json(resultado);
    }




    public JsonResult EliminarAlumno(int cargaAlumosId)
    {
        var eliminarAlumno = _context.CargaAlumos.Find(cargaAlumosId);

        if (eliminarAlumno == null)
        {
            return Json(new { success = false, message = "Alumno no encontrado." });
        }

        try
        {
            _context.CargaAlumos.Remove(eliminarAlumno);
            _context.SaveChanges();
            return Json(new { success = true });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = "Error al eliminar el alumno           : " + ex.Message });
        }
    }
}
