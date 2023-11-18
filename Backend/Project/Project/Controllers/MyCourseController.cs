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
    public class MyCourseController : ControllerBase
    {
        MyCourseRepository myc = new MyCourseRepository();

        [HttpPost]
        public ActionResult<ResponseModel> GetEmployee(SearchEnrollRequest request)
        {
            List<CourseModel> result = myc.getMyCourse(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

    }
}
