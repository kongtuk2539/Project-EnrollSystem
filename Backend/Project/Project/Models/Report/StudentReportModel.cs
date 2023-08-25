using System.ComponentModel;

namespace Project.Models.Report
{
    public class StudentReportModel
    {
        [DisplayName("รหัสนักเรียน")]
        public int stu_ID { get; set; }

        [DisplayName("ชื่อนักเรียน")]
        public string? stu_Name { get; set; }

        [DisplayName("เพศ")]
        public string? stu_Sex { get; set; }

        [DisplayName("ที่อยู่")]
        public string? stu_Add { get; set; }

        [DisplayName("อีเมล")]
        public string? stu_Mail { get; set; }

        [DisplayName("เบอร์โทร")]
        public string? stu_Tel { get; set; }

        [DisplayName("สถานะ")]
        public string? sta_Name { get; set; }
    }
}
