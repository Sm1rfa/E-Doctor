using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using OnlineHospital.Abstract;
using OnlineHospital.Models;

namespace OnlineHospital.Repositories
{
    public class MedicineRepository : IMedicine
    {
        private readonly ApplicationDbContext _dbMedicine = new ApplicationDbContext();

        public void Delete(int id)
        {
            _dbMedicine.Medicines.Remove(FindMedicine(id));
        }

        public void Save()
        {
            _dbMedicine.SaveChanges();
        }

        public List<Medicine> GetAllMedicines()
        {
            return _dbMedicine.Medicines.ToList();
        }

        public Medicine FindMedicine(int id)
        {
            return _dbMedicine.Medicines.Find(id);
        }

        public void InserOrUpdateMedicine(Medicine medicine)
        {
            if (medicine.MedicineId == default(int))
            {
                _dbMedicine.Medicines.Add(medicine);
            }
            else
            {
                _dbMedicine.Entry(medicine).State = EntityState.Modified;
            }
        }

        public IQueryable<Medicine> AllIncludingMedicines(params Expression<Func<Medicine, object>>[] includeProperties)
        {
            IQueryable<Medicine> query = _dbMedicine.Medicines;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }
    }
}