using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DHTMLX.Common;
using DHTMLX.Scheduler;
using DHTMLX.Scheduler.Data;
using OnlineHospital.Models;

namespace OnlineHospital.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly ApplicationDbContext _dbAppointment = new ApplicationDbContext();

        // GET: Appointment
        public ActionResult Index()
        {
            var scheduler = new DHXScheduler(this);
            scheduler.Skin = DHXScheduler.Skins.Flat;

            scheduler.Config.first_hour = 6;
            scheduler.Config.last_hour = 20;

            scheduler.LoadData = true;
            scheduler.EnableDataprocessor = true;

            return View(scheduler);
        }

        public ContentResult Data()
        {
            var apps = _dbAppointment.Appointmentses.ToList();
            return new SchedulerAjaxData(apps);
        }

        public ActionResult Save(int? id, FormCollection actionValues)
        {
            var action = new DataAction(actionValues);

            try
            {
                var changedEvent = DHXEventsHelper.Bind<Appointments>(actionValues);
                switch (action.Type)
                {
                    case DataActionTypes.Insert:
                        _dbAppointment.Appointmentses.Add(changedEvent);
                        break;
                    case DataActionTypes.Delete:
                        _dbAppointment.Entry(changedEvent).State = EntityState.Deleted;
                        break;
                    default:// "update"  
                        _dbAppointment.Entry(changedEvent).State = EntityState.Modified;
                        break;
                }
                _dbAppointment.SaveChanges();
                action.TargetId = changedEvent.AppointmentsId;
            }
            catch (Exception a)
            {
                action.Type = DataActionTypes.Error;
            }

            return (new AjaxSaveResponse(action));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbAppointment.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}