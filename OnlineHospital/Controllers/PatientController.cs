using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using OnlineHospital.Models;
using OnlineHospital.Repositories;
using OnlineHospital.ViewModels;

namespace OnlineHospital.Controllers
{
    public class PatientController : Controller
    {
        private readonly DeseaseRepository _deseaseRepository;
        private readonly PatientRepository _patientsRepository;

        public PatientController(PatientRepository patientRepository, DeseaseRepository deseaseRepository)
        {
            _patientsRepository = patientRepository;
            _deseaseRepository = deseaseRepository;
        }

        // GET: Patient
        public ActionResult Index()
        {
            List<Patient> patients = _patientsRepository.GetAllPatients().ToList();
            List<Desease> deseases = _deseaseRepository.AllIncludingDeseases(d => d.Medicines).ToList();

            var viewModel = new PatientIndexViewModel
            {
                Deseases = deseases,
                Patients = patients
            };

            return View(viewModel);
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            return View(_patientsRepository.FindPatient(id));
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Patient patient)
        {
            if (ModelState.IsValid)
            {
                _patientsRepository.InsertOrUpdatePatient(patient);
                _patientsRepository.Save();

                return RedirectToAction("Index");
            }
            return View(patient);
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            return View(_patientsRepository.FindPatient(id));
        }

        [HttpPost]
        public ActionResult Edit(Patient patient)
        {
            if (ModelState.IsValid)
            {
                _patientsRepository.InsertOrUpdatePatient(patient);
                _patientsRepository.Save();

                return RedirectToAction("Index");
            }

            return View(patient);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            _patientsRepository.Delete(id);
            _patientsRepository.Save();

            return RedirectToAction("Index");
        }

        public ActionResult MakeReceipt(int id)
        {
            return View(_patientsRepository.FindPatient(id));
        }
    }
}