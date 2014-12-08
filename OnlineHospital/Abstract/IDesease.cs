using System.Collections.Generic;
using OnlineHospital.Models;

namespace OnlineHospital.Abstract
{
    public interface IDesease : IBasic
    {
        List<Desease> GetAllDeseases();
        Desease FindDesease(int id);
        void InsertOrUpdateDesease(Desease desease);
    }
}