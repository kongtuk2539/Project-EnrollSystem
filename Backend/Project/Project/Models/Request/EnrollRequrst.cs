namespace Project.Models.Request
{
    public class EnrollRequrst
    {
        public int stu_ID { get; set; }
        public int cou_ID { get; set; }
        public int sub_ID { get; set; }
        //public string? pay_billpay { get; set; }
        //public string? pay_billdue { get; set; }
        public int amount_pay { get; set; }
        public string? sta_pay { get; set; }
    }
}
