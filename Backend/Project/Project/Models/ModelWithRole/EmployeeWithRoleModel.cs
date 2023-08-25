﻿namespace Project.Models.ModelWithRole
{
    public class EmployeeWithRoleModel
    {
        public int emp_ID { get; set; }
        public string? emp_Pass { get; set; }
        public string? emp_Name { get; set; }
        public string? emp_Sex { get; set; }
        public string? emp_Add { get; set; }
        public string? emp_Mail { get; set; }
        public string? emp_Tel { get; set; }
        public string? sta_Name { get; set; }
        public string? role { get; set; }

        public EmployeeWithRoleModel()
        {
            role = "Employee";
        }
    }
}
