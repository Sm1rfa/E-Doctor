using System.Collections.Generic;
using OnlineHospital.Models;

namespace OnlineHospital.Abstract
{
    public interface IPatient : IBasic
    {
        List<Patient> GetAllPatients();
        Patient FindPatient(int id);
        void InsertOrUpdatePatient(Patient patient);
    }
}