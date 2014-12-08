using System;
using System.Collections.Generic;

namespace OnlineHospital.Models
{
    public class Desease
    {
        public int DeseaseId { get; set; }
        public String DeseaseName { get; set; }

        public virtual ICollection<Medicine> Medicines { get; set; }
    }
}