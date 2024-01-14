using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NPOI.HSSF.UserModel;
using Project.Models;
using Project.Models.Report;
using Project.Models.Request;
using Project.Models.Response;
using Project.Repository;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Reflection;
using System.ComponentModel;
using Project.Helper;

namespace Project.Controllers
{
    [Project.Helper.Authorize.AuthorizeAttribute("Employee", "Teacher", "Student")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CreateReportController : ControllerBase
    {
        ReportRepository rr = new ReportRepository();

        [HttpPost]
        public ActionResult GetStudent(SearchStudentRequest request)
        {
            List<StudentReportModel> result = rr.getStudent(request);
   
            List<Dictionary<string, string>> rowData = UtilExcelReport.ConvertDTOToListOfDictionaries(result);

            return UtilExcelReport.GenerateExcel(rowData);  

        }

        [HttpPost]
        public ActionResult GetEmployee(SearchEmployeeRequest request)
        {
            List<EmployeeReportModel> result = rr.getEmployee(request);

            List<Dictionary<string, string>> rowData = UtilExcelReport.ConvertDTOToListOfDictionaries(result);

            return UtilExcelReport.GenerateExcel(rowData);
        }

        [HttpPost]
        public ActionResult GetTeacher(SearchTeacherRequest request)
        {
            List<TeacherReportModel> result = rr.getTeacher(request);

            List<Dictionary<string, string>> rowData = UtilExcelReport.ConvertDTOToListOfDictionaries(result);

            return UtilExcelReport.GenerateExcel(rowData);
        }

        [HttpPost]
        public ActionResult GetCourse(SearchCourse request)
        {
            List<CourseReportModel> result = rr.getCourse(request);

            foreach (var list in result)
            {
                list.seatEnroll = list.num_seats - list.seat_remaining;
            }

            List<Dictionary<string, string>> rowData = UtilExcelReport.ConvertDTOToListOfDictionaries(result);

            return UtilExcelReport.GenerateExcel(rowData);
        }

        [HttpPost]
        public ActionResult GetEnroll(SearchEnrollRequest request)
        {
            List<EnrollReportModel> result = rr.getEnroll(request);

            List<Dictionary<string, string>> rowData = UtilExcelReport.ConvertDTOToListOfDictionaries(result);

            return UtilExcelReport.GenerateExcel(rowData);
        }


    }
}
