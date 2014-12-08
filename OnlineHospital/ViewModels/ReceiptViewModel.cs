using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineHospital.Models;

namespace OnlineHospital.ViewModels
{
    public class ReceiptViewModel
    {
       public Patient patients { get; set; }
       public Desease deseases { get; set; }
    }
}