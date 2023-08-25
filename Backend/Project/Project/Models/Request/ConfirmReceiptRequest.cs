namespace Project.Models.Request
{
    public class ConfirmReceiptRequest
    {
        public string? stu_ID { get; set; }
        public string? cou_ID { get; set; }
        public string? statusConfirm { get; set; }
        public string? receipt_date { get; set; }
    }
}
