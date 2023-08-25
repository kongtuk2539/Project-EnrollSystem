namespace Project.Models.Request
{
    public class CourseRequrst
    {
        public int sub_ID { get; set; }
        public int tec_ID { get; set; }
        public int num_seats { get; set; }
        public int seat_remaining { get; set; }
        public string time_open { get; set; }
        public string time_close { get; set; }
        public string time_start { get; set; }
        public string time_end { get; set; }
        public string? status { get; set; }
        public int total_price { get; set; }
    }
}
