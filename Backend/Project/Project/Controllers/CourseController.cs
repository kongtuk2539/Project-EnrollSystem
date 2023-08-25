using Microsoft.AspNetCore.Http;
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
    public class CourseController : ControllerBase
    {
        CourseRepository cour = new CourseRepository();

        [HttpGet]
        public ActionResult<ResponseModel> getSubjectSelect()
        {
            List<SubjectSelect> result = cour.getSubjectSelect();
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpGet]
        public ActionResult<ResponseModel> getTeacherSelect()
        {
            List<TeacherSelect> result = cour.getTeacherSelect();
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> GetCourse(SearchCourse request)
        {
            List<CourseModel> result = cour.getCourse(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddCourseModel(CourseRequrst requrst)
        {
            int status = cour.AddCourse(requrst);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseModel> UpdateCourse([FromBody] CourseRequrst requrst, int id)
        {
            int status = cour.UpdateCourse(requrst, id);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseModel> DeleteCourse(bool status, int id)
        {
            int deleteStatus = cour.DeleteCourse(status, id);
            if (deleteStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.DEL_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.DEL_FAILER);
        }

    }
}
