using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.Request;
using Project.Models.Response;
using Project.Repository;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class StudentController : Controller
    {
        StudentRepository stur = new StudentRepository();

        [Project.Helper.Authorize.AuthorizeAttribute("Employee", "Student")]
        //[Authorize]
        [HttpPost]
        public ActionResult<ResponseModel> GetStudent(SearchStudentRequest request)
        {
            List<StudentModel> result = stur.getStudent(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddStudentModel(StudentRequrst requrst)
        {
            StudentModel student = stur.AddStudent(requrst);
            if (student != null)
            {
                return new ResponseModel(student, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseModel> UpdateStudent([FromBody] StudentRequrst requrst, int id)
        {
            int status = stur.UpdateStudent(requrst, id);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [Project.Helper.Authorize.AuthorizeAttribute("Employee", "Student")]
        //[Authorize]
        [HttpDelete("{id}")]
        public ActionResult<ResponseModel> DeleteStudent(bool status, int id)
        {
            int deleteStatus = stur.DeleteStudent(status, id);
            if (deleteStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.DEL_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.DEL_FAILER);
        }

        [HttpPost]
        public ActionResult<int> test()
        {     
            return stur.createPK();
        }
    }
}
