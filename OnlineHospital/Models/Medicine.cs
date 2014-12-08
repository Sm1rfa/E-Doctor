using System;

namespace OnlineHospital.Models
{
    public class Medicine
    {
        public int MedicineId { get; set; }
        public String MedicineName { get; set; }

        public virtual int DeseaseId { get; set; }
        public virtual Desease Desease { get; set; }
    }
}