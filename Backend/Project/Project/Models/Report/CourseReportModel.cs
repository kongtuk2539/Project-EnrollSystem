using System.ComponentModel;

namespace Project.Models.Report
{
    public class CourseReportModel
    {
        [DisplayName("รหัสคอร์ส")]
        public int cou_ID { get; set; }

        [DisplayName("ชื่อคอร์ส")]
        public string? sub_Name { get; set; }

        [DisplayName("ชื่ออาจารย์ผู้สอน")]
        public string? tec_Name { get; set; }

        [DisplayName("จำนวนที่นั่ง")]
        public int num_seats { get; set; }

        [DisplayName("จำนวนที่นั่งคงเหลือ")]
        public int seat_remaining { get; set; }

        [DisplayName("จำนวนผู้ลงทะเบียน")]
        public int seatEnroll { get; set; }

        [DisplayName("วันที่เปิดลงทะเบียน")]
        public DateTime time_open { get; set; }

        [DisplayName("วันที่ปิดลงทะเบียน")]
        public DateTime time_close { get; set; }

        [DisplayName("วันที่เริ่มคอร์ส")]
        public DateTime time_start { get; set; }

        [DisplayName("วันที่ปิดคอร์ส")]
        public DateTime time_end { get; set; }

        [DisplayName("สถานะคอร์ส")]
        public string? status { get; set; }

        [DisplayName("ราคาคอร์ส")]
        public int total_price { get; set; }

      
    }
}
