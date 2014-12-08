using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using OnlineHospital.Abstract;
using OnlineHospital.Models;

namespace OnlineHospital.Repositories
{
    public class PatientRepository : IPatient
    {
        private readonly ApplicationDbContext _dbPatient = new ApplicationDbContext();

        public void Delete(int id)
        {
            _dbPatient.Patients.Remove(FindPatient(id));
        }

        public void Save()
        {
            _dbPatient.SaveChanges();
        }

        public List<Patient> GetAllPatients()
        {
            return _dbPatient.Patients.ToList();
        }

        public Patient FindPatient(int id)
        {
            return _dbPatient.Patients.Find(id);
        }

        public void InsertOrUpdatePatient(Patient patient)
        {
            if (patient.PatientId == default(int))
            {
                _dbPatient.Patients.Add(patient);
            }
            else
            {
                _dbPatient.Entry(patient).State = EntityState.Modified;
            }
        }
    }
}