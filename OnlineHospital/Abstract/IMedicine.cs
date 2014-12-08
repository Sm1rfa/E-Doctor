using System.Collections.Generic;
using OnlineHospital.Models;

namespace OnlineHospital.Abstract
{
    public interface IMedicine : IBasic
    {
        List<Medicine> GetAllMedicines();
        Medicine FindMedicine(int id);
        void InserOrUpdateMedicine(Medicine medicine);
    }
}