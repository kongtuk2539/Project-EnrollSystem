namespace Project.Models.Request
{
    public class PayBillclass
    {   
        public string? cou_ID { get; set; }
        public string? stu_ID { get; set; }
        public string? pay_time { get; set; }
        public string? pay_date { get; set; }
        public IFormFile filePaySlip { get; set; }
    }
}
