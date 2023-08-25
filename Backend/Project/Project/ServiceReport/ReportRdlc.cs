using AspNetCore.Reporting;
using Project.Models;
using Project.Models.Request;
using Project.Repository;
using System.Reflection;
using System.Text;

namespace Project.ServiceReport
{
    public class ReportRdlc
    {
        public byte[] GenerateReportPaymentReceipt(SearchEnrollRequest request, string nameReport)
        {
            string fileDirPath = Assembly.GetExecutingAssembly().Location.Replace("Project.dll", string.Empty);
            string rdlcFilePath = string.Format("{0}reportRdlc\\{1}.rdlc", fileDirPath, nameReport);

            EnrollRepository enrr = new EnrollRepository();
            List<EnrollModel> _result = enrr.getEnroll(request);
            _result[0].pay_billpay = _result[0].pay_billpay.AddYears(-543);
            _result[0].pay_billdue = _result[0].pay_billdue.AddYears(-543);

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("utf-8");

            LocalReport report = new LocalReport(rdlcFilePath);
           

            report.AddDataSource("dataEnroll", _result);
             
            var result = report.Execute(RenderType.Pdf);
            
            return result.MainStream;
        }

        public byte[] GenerateReportReceipt(SearchEnrollRequest request, string nameReport)
        {
            string fileDirPath = Assembly.GetExecutingAssembly().Location.Replace("Project.dll", string.Empty);
            string rdlcFilePath = string.Format("{0}reportRdlc\\{1}.rdlc", fileDirPath, nameReport);

            EnrollRepository enrr = new EnrollRepository();
            List<ReportReceiptClass> _result = enrr.getReceipt(request);
            //_result[0].pay_date = _result[0].pay_date.AddYears(-543);
            //_result[0].receipt_date = _result[0].receipt_date.AddYears(-543);

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("utf-8");

            LocalReport report = new LocalReport(rdlcFilePath);


            report.AddDataSource("DataReceipt", _result);

            var result = report.Execute(RenderType.Pdf);

            return result.MainStream;
        }
        public byte[] GenerateCertificate(SearchEnrollRequest request, string nameReport)
        {
            string fileDirPath = Assembly.GetExecutingAssembly().Location.Replace("Project.dll", string.Empty);
            string rdlcFilePath = string.Format("{0}reportRdlc\\{1}.rdlc", fileDirPath, nameReport);

            EnrollRepository enrr = new EnrollRepository();
            List<CertificateModel> _result = enrr.getCertificate(request);
            //_result[0].pay_date = _result[0].pay_date.AddYears(-543);
            //_result[0].receipt_date = _result[0].receipt_date.AddYears(-543);

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("utf-8");

            LocalReport report = new LocalReport(rdlcFilePath);


            report.AddDataSource("DataSet3", _result);

            var result = report.Execute(RenderType.Pdf);

            return result.MainStream;
        }
        

    }
}
