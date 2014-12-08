using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DHTMLX.Scheduler;

namespace OnlineHospital.Models
{
    public class Appointments
    {
        [DHXJson(Alias = "appointments_id")]
        public int AppointmentsId { get; set; }

        [DHXJson(Alias = "text")]
        public string Description { get; set; }

        [DHXJson(Alias = "start_date")]
        public DateTime StartDate { get; set; }

        [DHXJson(Alias = "end_date")]
        public DateTime EndDate { get; set; }
    }
}