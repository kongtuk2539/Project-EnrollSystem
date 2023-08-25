namespace Project.Models
{
    public class EnrollModel
    {
        public int stu_ID { get; set; }
        public string stu_Name { get; set; }
        public int cou_ID { get; set; }
        public string sub_Name { get; set; }
        public int tec_ID { get; set; }
        public string tec_Name { get; set; }
        public string sta_pay { get; set; }
        public int score_learn { get; set; }
        public int score_1 { get; set; }
        public int score_2 { get; set; }
        public int score_3 { get; set; }
        public int score_final { get; set; }
        public int score_total { get; set; }
        public string result { get; set; }
        public DateTime pay_billpay { get; set; }
        public DateTime pay_billdue { get; set; }
        public int amount_pay { get; set; }
    }
}
