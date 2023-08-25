using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class SubjectModel
    {
        public int sub_ID { get; set; }
        public string? sub_Name { get; set; }
        public int sub_Price { get; set; }
        public string? sta_Name { get; set; }
    }
}
