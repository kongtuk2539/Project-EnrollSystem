using System.ComponentModel;

namespace Project.Models.Report
{
    public class EmployeeReportModel
    {
        [DisplayName("รหัสพนักงาน")]
        public int emp_ID { get; set; }

        [DisplayName("ชื่อพนักงาน")]
        public string? emp_Name { get; set; }

        [DisplayName("เพศ")]
        public string? emp_Sex { get; set; }

        [DisplayName("ที่อยู่")]
        public string? emp_Add { get; set; }

        [DisplayName("อีเมล")]
        public string? emp_Mail { get; set; }

        [DisplayName("เบอร์โทร")]
        public string? emp_Tel { get; set; }

        [DisplayName("สถานะ")]
        public string? sta_Name { get; set; }
    }
}
