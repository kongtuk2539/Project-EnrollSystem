using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Models.Request;
using Project.Models.Response;
using Project.Repository;

namespace Project.Controllers
{
    //[Project.Helper.Authorize.AuthorizeAttribute("Employee")]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        TeacherRepository tecr = new TeacherRepository();
  
        [HttpPost]
        public ActionResult<ResponseModel> GetTeacher(SearchTeacherRequest request)
        {
            List<TeacherModel> result = tecr.getTeacher(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddTeacherModel(TeacherRequrst requrst)
        {
            TeacherModel teacher = tecr.AddTeacher(requrst);
            if (teacher != null)
            {
                return new ResponseModel(teacher, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseModel> UpdateTeacher([FromBody] TeacherRequrst requrst, int id)
        {
            int status = tecr.UpdateTeacher(requrst, id);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseModel> DeleteTeacher(bool status, int id)
        {
            int deleteStatus = tecr.DeleteTeacher(status, id);
            if (deleteStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.DEL_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.DEL_FAILER);
        }
    }
}
