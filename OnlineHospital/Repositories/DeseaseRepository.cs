using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using OnlineHospital.Abstract;
using OnlineHospital.Models;

namespace OnlineHospital.Repositories
{
    public class DeseaseRepository : IDesease
    {
        private readonly ApplicationDbContext _dbDesease = new ApplicationDbContext();

        public void Delete(int id)
        {
            _dbDesease.Deseases.Find(FindDesease(id));
        }

        public void Save()
        {
            _dbDesease.SaveChanges();
        }

        public List<Desease> GetAllDeseases()
        {
            return _dbDesease.Deseases.ToList();
        }

        public Desease FindDesease(int id)
        {
            return _dbDesease.Deseases.Find(id);
        }

        public void InsertOrUpdateDesease(Desease desease)
        {
            if (desease.DeseaseId == default(int))
            {
                _dbDesease.Deseases.Add(desease);
            }
            else
            {
                _dbDesease.Entry(desease).State = EntityState.Modified;
            }
        }

        public IQueryable<Desease> AllIncludingDeseases(params Expression<Func<Desease, object>>[] includeProperties)
        {
            IQueryable<Desease> query = _dbDesease.Deseases;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }
    }
}