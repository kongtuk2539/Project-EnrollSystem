using System.ComponentModel;

namespace Project.Models.Report
{
    public class EnrollReportModel
    {
        [DisplayName("รหัสนักเรียน")]
        public int stu_ID { get; set; }

        [DisplayName("ชื่อนักเรียน")]
        public string stu_Name { get; set; }

        [DisplayName("รหัสคอร์ส")]
        public int cou_ID { get; set; }

        [DisplayName("ชื่อคอร์ส")]
        public string sub_Name { get; set; }

        [DisplayName("รหัสอาจารย์")]
        public int tec_ID { get; set; }

        [DisplayName("ชื่ออาจารย์")]
        public string tec_Name { get; set; }

        [DisplayName("คะแนนเข้าเรียน (5 คะแนน)")]
        public int score_learn { get; set; }

        [DisplayName("คะแนนเก็บ 1 (10 คะแนน)")]
        public int score_1 { get; set; }

        [DisplayName("คะแนนเก็บ 2 (10 คะแนน)")]
        public int score_2 { get; set; }

        [DisplayName("คะแนนเก็บ 3 (10 คะแนน)")]
        public int score_3 { get; set; }

        [DisplayName("คะแนนสอบ (65 คะแนน)")]
        public int score_final { get; set; }

        [DisplayName("คะแนนรวม")]
        public int score_total { get; set; }

        [DisplayName("ผลการเรียน")]
        public string result { get; set; }

        [DisplayName("วันที่ต้องชำระเงิน")]
        public DateTime pay_billpay { get; set; }

        [DisplayName("วันที่ชำระเงินแล้ว")]
        public DateTime pay_billdue { get; set; }

        [DisplayName("สถานะการชำระเงิน")]
        public string sta_pay { get; set; }

        [DisplayName("จำนวนเงินที่ชำระ")]
        public int amount_pay { get; set; }
    }
}
