using System.ComponentModel;

namespace Project.Models.Report
{
    public class TeacherReportModel
    {
        [DisplayName("รหัสอาจารย์")]
        public int tec_ID { get; set; }

        [DisplayName("ชื่ออาจารย์")]
        public string? tec_Name { get; set; }

        [DisplayName("เพศ")]
        public string? tec_Sex { get; set; }

        [DisplayName("ที่อยู่")]
        public string? tec_Add { get; set; }

        [DisplayName("อีเมล")]
        public string? tec_Mail { get; set; }

        [DisplayName("เบอร์โทร")]
        public string? tec_Tel { get; set; }

        [DisplayName("สถานะ")]
        public string? sta_Name { get; set; }
    }
}
