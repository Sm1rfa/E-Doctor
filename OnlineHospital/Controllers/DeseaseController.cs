using System.Web.Mvc;
using OnlineHospital.Models;
using OnlineHospital.Repositories;

namespace OnlineHospital.Controllers
{
    public class DeseaseController : Controller
    {
        private readonly DeseaseRepository _deseaseRepository = new DeseaseRepository();
        // GET: Desease
        public ActionResult Index()
        {
            return View(_deseaseRepository.GetAllDeseases());
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            return View(_deseaseRepository.FindDesease(id));
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Create(Desease desease)
        {
            if (ModelState.IsValid)
            {
                _deseaseRepository.InsertOrUpdateDesease(desease);
                _deseaseRepository.Save();

                return Json(desease.DeseaseName);
            }

            return Json("Not valid");
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            return View(_deseaseRepository.FindDesease(id));
        }

        [HttpPost]
        public ActionResult Edit(Desease desease)
        {
            _deseaseRepository.InsertOrUpdateDesease(desease);
            _deseaseRepository.Save();

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            _deseaseRepository.Delete(id);
            _deseaseRepository.Save();

            return RedirectToAction("Index");
        }
    }
}