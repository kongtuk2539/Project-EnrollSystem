namespace Project.Models
{
    public class ReportReceiptClass
    {
        public int stu_ID { get; set; }
        public string? stu_Name { get; set; }
        public string? receipt_number { get; set; }
        public DateTime receipt_date { get; set; }
        public int cou_ID { get; set; }
        public string? sub_Name { get; set; }
        public TimeSpan pay_time { get; set; }
        public DateTime pay_date { get; set; }
        public int amount_pay { get; set; }
    }
}
