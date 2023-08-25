namespace Project.Models
{
    public class ReceiptCheckModel
    {
        public int stu_ID { get; set; }
        public string? stu_Name { get; set; }
        public int cou_ID { get; set; }  
        public int sub_ID { get; set; }
        public string? sub_Name { get; set; }
        public DateTime pay_date { get; set; }
        public int amount_pay { get; set; }
        public TimeSpan? pay_time { get; set; }
        public string? pay_slip { get; set; }
    }
}
