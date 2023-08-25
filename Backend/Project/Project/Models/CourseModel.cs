namespace Project.Models
{
    public class CourseModel
    {
        public int cou_ID { get; set; }
        public string? sub_Name { get; set; }
        public string? tec_Name { get; set; }
        public int? sub_ID { get; set; }
        public int? tec_ID { get; set; }
        public int num_seats { get; set; }
        public int seat_remaining { get; set; }
        public DateTime time_open { get; set; }
        public DateTime time_close { get; set; }
        public DateTime time_start { get; set; }
        public DateTime time_end { get; set; }
        public string? status { get; set; }
        public int total_price { get; set; }
    }
}
