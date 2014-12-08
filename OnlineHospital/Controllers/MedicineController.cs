using System;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using OnlineHospital.Models;
using OnlineHospital.Repositories;

namespace OnlineHospital.Controllers
{
    public class MedicineController : Controller
    {
        private readonly DeseaseRepository _deseaseRepository;
        private readonly MedicineRepository _medicineRepository;

        public MedicineController(DeseaseRepository deseaseRepository, MedicineRepository medicineRepository)
        {
            _deseaseRepository = deseaseRepository;
            _medicineRepository = medicineRepository;
        }

        // GET: Medicine
        public ActionResult Index()
        {
            IQueryable<Medicine> medicines = _medicineRepository.AllIncludingMedicines(m => m.Desease);
            return View(medicines.ToList());
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            return View(_medicineRepository.FindMedicine(id));
        }

        [HttpGet]
        public ActionResult Create()
        {
            ViewBag.DeseaseId = new SelectList(_deseaseRepository.GetAllDeseases(), "DeseaseId", "DeseaseName");
            return View();
        }

        [HttpPost]
        public JsonResult Create([Bind(Include = "MedicineId, MedicineName, DeseaseId")] Medicine medicine,
            String deseaseName)
        {
            if (ModelState.IsValid)
            {
                Desease desease =
                    _deseaseRepository.GetAllDeseases().Where(d => d.DeseaseName == deseaseName).FirstOrDefault();

                medicine.DeseaseId = desease.DeseaseId;

                _medicineRepository.InserOrUpdateMedicine(medicine);
                _medicineRepository.Save();
                return Json(medicine.MedicineName);
            }

            ViewBag.DeseaseId = new SelectList(_deseaseRepository.GetAllDeseases(), "DeseaseId", "DeseaseName",
                medicine.DeseaseId);
            return Json("Invalid");
        }

        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Medicine medicine = _medicineRepository.FindMedicine(id.Value);
            if (medicine == null)
            {
                return HttpNotFound();
            }
            ViewBag.DeseaseId = new SelectList(_deseaseRepository.GetAllDeseases(), "DeseaseId", "DeseaseName",
                medicine.DeseaseId);
            return View(medicine);
        }

        [HttpPost]
        public ActionResult Edit([Bind(Include = "MedicineId,MedicineName,DeseaseId")] Medicine medicine)
        {
            if (ModelState.IsValid)
            {
                _medicineRepository.InserOrUpdateMedicine(medicine);
                _medicineRepository.Save();
                return RedirectToAction("Index");
            }
            ViewBag.DeseaseId = new SelectList(_deseaseRepository.GetAllDeseases(), "DeseaseId", "DeseaseName",
                medicine.DeseaseId);
            return View(medicine);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            _medicineRepository.Delete(id);
            _medicineRepository.Save();

            return RedirectToAction("Index");
        }
    }
}