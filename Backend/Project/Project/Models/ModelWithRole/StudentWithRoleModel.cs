namespace Project.Models.ModelWithRole
{
    public class StudentWithRoleModel
    {
        public int stu_ID { get; set; }
        public string? stu_Pass { get; set; }
        public string? stu_Name { get; set; }
        public string? stu_Sex { get; set; }
        public string? stu_Add { get; set; }
        public string? stu_Mail { get; set; }
        public string? stu_Tel { get; set; }
        public string? sta_Name { get; set; }
        public string? role { get; set; }

        public StudentWithRoleModel()
        {
            role = "Student";
        }
    }
}
