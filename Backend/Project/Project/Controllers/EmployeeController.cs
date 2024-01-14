using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.Request;
using Project.Models.Response;
using Project.Repository;

namespace Project.Controllers
{
    [Project.Helper.Authorize.AuthorizeAttribute("Employee", "Teacher", "Student")]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        EmployeeRepository empr = new EmployeeRepository();

        [HttpGet]
        public IActionResult Gettest() 
        {
            return new JsonResult("Test API");
        }

        [HttpPost]
        public ActionResult<ResponseModel> GetEmployee(SearchEmployeeRequest request)
        {
            List<EmployeeModel> result = empr.getEmployee(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            //ResponseModel resM = new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
            //return new JsonResult(resM);
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddEmployeeModel(EmployeeRequrst requrst)
        {
            EmployeeModel employee = empr.AddEmployee(requrst);
            if (employee != null)
            {
                return new ResponseModel(employee, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseModel> UpdateEmployee([FromBody] EmployeeRequrst requrst, int id)
        {
            int status = empr.UpdateEmployee(requrst, id);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseModel> DeleteEmployee(bool status, int id)
        {
            int deleteStatus = empr.DeleteEmployee(status, id);
            if (deleteStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.DEL_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.DEL_FAILER);
        }

    }
}
