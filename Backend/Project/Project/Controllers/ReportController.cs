using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Models.Response;
using Microsoft.AspNetCore.Mvc.Rendering;
using Project.ServiceReport;
using Project.Models.Request;
using System.Net.Mime;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        [HttpPost("{nameReport}")]
        public ActionResult PaymentReceipt(SearchEnrollRequest request, string nameReport)
        {
            //var reportName = request.stu_ID + ".pdf";
            ReportRdlc reportRdlc = new ReportRdlc();
            return File(reportRdlc.GenerateReportPaymentReceipt(request, nameReport), MediaTypeNames.Application.Octet, nameReport+".pdf");
        }

        [HttpPost("{nameReport}")]
        public ActionResult Receipt(SearchEnrollRequest request, string nameReport)
        {
            //var reportName = request.stu_ID + ".pdf";
            ReportRdlc reportRdlc = new ReportRdlc();
            return File(reportRdlc.GenerateReportReceipt(request, nameReport), MediaTypeNames.Application.Octet, nameReport + ".pdf");
        }

        [HttpPost("{nameReport}")]
        public ActionResult Certificate(SearchEnrollRequest request, string nameReport)
        {
            //var reportName = request.stu_ID + ".pdf";
            ReportRdlc reportRdlc = new ReportRdlc();
            return File(reportRdlc.GenerateCertificate(request, nameReport), MediaTypeNames.Application.Octet, nameReport + ".pdf");
        }
    }

    
}
