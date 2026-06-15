using System.Globalization;

namespace ProyectoDespliegue.Models;

public class CargaAlumos
{
    public int CargaAlumosId { get; set; }

    public string? Nombre { get; set; }
    public string? Apellido { get; set; }

    public DateTime FechaNacimiento { get; set; }

    public int Dni { get; set; }

    public string? Telefono { get; set; }

    public string? Email { get; set; }

    public string? CiudadResidencia { get; set; }

    public bool Trabaja { get; set;}




}
