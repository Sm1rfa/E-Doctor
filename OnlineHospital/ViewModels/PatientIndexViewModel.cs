using System.Collections.Generic;
using OnlineHospital.Models;

namespace OnlineHospital.ViewModels
{
    public class PatientIndexViewModel
    {
        public List<Patient> Patients { get; set; }
        public List<Desease> Deseases { get; set; }
    }
}