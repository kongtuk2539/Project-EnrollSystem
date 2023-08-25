using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Project.Models;
using Project.Models.Request;
using Project.Models.Response;
using Project.Repository;
using System.Globalization;
using System.Text;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class EnrollController : ControllerBase
    {
        EnrollRepository enrr = new EnrollRepository();

        [HttpPost]
        public ActionResult<ResponseModel> GetEnroll(SearchEnrollRequest request)
        {
            List<EnrollModel> result = enrr.getEnroll(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        
        [HttpPost]
        public ActionResult<ResponseModel> Enroll(EnrollRequrst requrst)
        {
            int cou_ID = requrst.cou_ID;
            string strcou_ID = cou_ID.ToString();
            CourseRepository c = new CourseRepository();
            List<CourseModel> result = c.getCourse(strcou_ID);
            if (result[0].seat_remaining > 0)
            {
                int status = enrr.Enroll(requrst);
                //int status = 0;
                if (status > 0)
                {
                    int Coursestatus = enrr.UpdateCourse(cou_ID);
                    if (Coursestatus > 0)
                    {
                        return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
                    }
                }
            }                         
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        //[HttpPost]
        //public ActionResult<ResponseModel> checkNameStu(checkNameStudentRequrst requrst)
        //{
        //    int status = enrr.checkNameStudent(requrst);
        //    if (status > 0)
        //    {
        //        return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
        //    }
        //    return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        //}

        //[HttpPost]
        //public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        //{
        //    try
        //    {
        //        if (file == null || file.Length == 0)
        //        {
        //            return BadRequest("Please select a file to upload.");
        //        }

        //        string filePath = Path.Combine("D:\\Project_App_Music\\Backend\\Project\\Project\\paySlipfile\\", file.FileName);
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        return Ok($"File uploaded successfully: {filePath}");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading file: {ex.Message}");
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] PayBillclass requrst)
        {
            string path = requrst.filePaySlip.FileName;
            var suffix = path.Substring(path.LastIndexOf('.') + 1);
            if(suffix != "jpg")
            {
                return BadRequest("โปรดเลือกรูปภาพที่มีนามสกุล 'JPG' เท่านั้น");
            }
            DateTime time = DateTime.Now;
            string strY = time.ToString("yyyy");
            string strM = time.ToString("MM");
            string strD = time.ToString("dd");
            string fileName = "CouID" + requrst.cou_ID + "_StuID" + requrst.stu_ID + ".jpg";

            try
            {
                if (requrst == null)
                {
                    return BadRequest("Please select a file to upload.");
                }

                string folderName = "D:\\paySlipfile\\" + strY + "\\" + strM + "\\" + strD ;
                if (!Directory.Exists(folderName))
                {
                    Directory.CreateDirectory(folderName);
                }
                string filePath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await requrst.filePaySlip.CopyToAsync(stream);                  
                }
                PayBillRequrst pbr = new PayBillRequrst();
                TimeSpan timePayDate = TimeSpan.Parse(requrst.pay_time!);
                //DateTime datePayDate = DateTime.ParseExact(requrst.pay_date!, "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz '(เวลาอินโดจีน)'", CultureInfo.InvariantCulture);
                pbr.stu_ID = requrst.stu_ID;
                pbr.cou_ID = requrst.cou_ID;
                pbr.pay_time = timePayDate;
                pbr.pay_date = requrst.pay_date;
                pbr.pay_slip = filePath;
                int updatePay = enrr.UpdatePayBill(pbr);
                if (updatePay > 0)
                {
                    int stuid = Convert.ToInt32(pbr.stu_ID);
                    int couid = Convert.ToInt32(pbr.cou_ID);
                    string status = "รอตรวจสอบ";
                    int UpdateStatus = enrr.UpdateStatustblEnroll(stuid, couid, status);
                    //if (UpdateStatus > 0)
                    //{
                    //    return Ok("บันทึกข้อมูลเรียบร้อย");
                    //}
                }
                return Ok("บันทึกข้อมูลเรียบร้อย");
                //return Ok($"File uploaded successfully: {filePath}");

            }
            catch (Exception ex)
            {
                return BadRequest("บันทึกข้อมูลไม่สำเร็จ");
            }
        }


        [HttpGet, DisableRequestSizeLimit]
        public async Task<IActionResult> PhotoDownload([FromQuery] string fileUrl)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);
            if (!System.IO.File.Exists(filePath)) return NotFound();
            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(filePath), filePath);
        }
        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        [HttpPost]
        public ActionResult<ResponseModel> ReceiptCheck(SearchEnrollRequest request)
        {
            List<ReceiptCheckModel> result = enrr.getReceiptEnroll(request);
            if (result?.Count > 0)
            {
                return new ResponseModel(result, StateType.Type.SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.NOTFOUND_DATA);
        }

        [HttpPost]
        public ActionResult<ResponseModel> ConfirmReceipt(ConfirmReceiptRequest request)
        {
            if (request.statusConfirm == "confirmReceipt")
            {
                DateTime time = DateTime.Now;
                string strY = time.ToString("yy");
                string strM = time.ToString("MM");
                string strD = time.ToString("dd");
                List<AutoGenReceiptClass> result = enrr.AutoGenReceipt();
                ReceiptRequest receiptRequest = new ReceiptRequest();
                if (result[0].receipt_number == null)
                {
                    receiptRequest.receipt_number = strY + strM + strD + "1";
                }
                else
                {
                    int oldReceipt = Convert.ToInt32(result[0].receipt_number.Substring(6));
                    int newReceipt = oldReceipt + 1;
                    receiptRequest.receipt_number = strY + strM + strD + newReceipt.ToString();
                }
                receiptRequest.receipt_date = request.receipt_date;
                receiptRequest.stu_ID = request.stu_ID;
                receiptRequest.cou_ID = request.cou_ID;
                int update = enrr.UpdateReceiptEnroll(receiptRequest);
                if(update > 0)
                {
                    string status = "ชำระเงินเรียบร้อย";
                    int stuID = Convert.ToInt32(request.stu_ID);
                    int couID = Convert.ToInt32(request.cou_ID);
                    int UpdateStatus = enrr.UpdateStatustblEnroll(stuID, couID, status);
                    return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
                }

            }
            else
            {
                string status = "โปรดส่งหลักฐานการชำระเงินอีกครั้ง";
                int stuID = Convert.ToInt32(request.stu_ID);
                int couID = Convert.ToInt32(request.cou_ID);
                int UpdateStatus = enrr.UpdateStatustblEnroll(stuID, couID, status);
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);
        }

        [HttpPost]
        public ActionResult<ResponseModel> AddScore(DataScoreModel request)
        {
            bool status = enrr.Grade(request);
            if (status)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            else
            {
                return new ResponseModel(null, StateType.Type.SAVE_FAILER);
            }
            //try
            //{
            //    DataScoreModel g = enrr.Grade(request);
            //    int status = enrr.UpdateScoreEnroll(g);
            //    return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            //}
            //catch (Exception)
            //{
            //    return new ResponseModel(null, StateType.Type.SAVE_FAILER);
            //}
        }

        [HttpPut]
        public ActionResult<ResponseModel> changeStatusEnroll(changeStatusRequest request)
        {
            int UpdateStatus = enrr.changeStatusEnroll(request);
            if (UpdateStatus > 0)
            {
                return new ResponseModel(null, StateType.Type.SAVE_SUCCESS);
            }
            return new ResponseModel(null, StateType.Type.SAVE_FAILER);

        }


    }
}
