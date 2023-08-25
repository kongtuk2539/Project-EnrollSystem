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
    public class SubjectController : ControllerBase
    {
        SubjectRepository sjr = new SubjectRepository();
        [HttpPost]
        public ActionResult<ResponseModel> GetSubject(SearchSubjectRequest request)
        {
            List<SubjectModel> result = sjr.getSubject(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddSubjectModel(SubjectRequrst requrst)
        {
            int status = sjr.AddSubject(requrst);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseModel> UpdateSubject([FromBody] SubjectRequrst requrst, int id)
        {
            int status = sjr.UpdateSubject(requrst, id);
            if (status > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseModel> DeleteSubject(bool status, int id)
        {
            int deleteStatus = sjr.DeleteSubject(status, id);
            if (deleteStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.DEL_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.DEL_FAILER);

            #region message อีกรูปแบบ
            //if (deleteStatus > 0)
            //{
            //    return new ResponseModel() { Data = null, message = "ลบข้อมูลสำเร็จ", messageCode = "BSYSI004" };
            //}
            //return new ResponseModel() { Data = null, message = "ลบข้อมูลไม่สำเร็จ", messageCode = "BSYSE002" };
            #endregion
        }
    }
}
