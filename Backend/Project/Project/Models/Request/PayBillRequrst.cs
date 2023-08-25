namespace Project.Models.Request
{
    public class PayBillRequrst
    {
        public string? cou_ID { get; set; }
        public string? stu_ID { get; set; }
        public TimeSpan pay_time { get; set; }
        public string? pay_date { get; set; }
        public string? pay_slip { get; set; }
    }
}
