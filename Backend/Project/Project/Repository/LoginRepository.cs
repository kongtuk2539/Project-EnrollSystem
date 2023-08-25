using Project.Helper;
using Project.Models;
using Project.Models.Authorize;
using Project.Models.ModelWithRole;
using Project.Models.Request;

namespace Project.Repository
{
    public class LoginRepository
    {

        public UserClass Login(string id, string password)
        {
            string FindID = id.Substring(0, 1);
            UserClass user = new UserClass();

            if (FindID == "3")
            {
                var Data = this.getStudentWithPassword(id, password);

                if(Data != null)
                {
                    user.Id = Data.stu_ID;
                    user.Username = Data.stu_ID.ToString();
                    user.FullName = Data.stu_Name;
                    user.Role = "Student";
                    return user;
                }   

            }
            else if (FindID == "2")
            {
                var Data = this.getTeacherWithPassword(id, password);

                if(Data != null)
                {
                    user.Id = Data.tec_ID;
                    user.Username = Data.tec_ID.ToString();
                    user.FullName = Data.tec_Name;
                    user.Role = "Teacher";
                    return user;
                }

            }
            else if (FindID == "4")
            {
                var Data = this.getEmployeeWithPassword(id, password);

                if (Data != null)
                {
                    user.Id = Data.emp_ID;
                    user.Username = Data.emp_ID.ToString();
                    user.FullName = Data.emp_Name;
                    user.Role = "Employee";
                    return user;
                }

            }
            else
            {
                user = null;
            }

            return user = null;
        }


        public List<EmployeeWithRoleModel> getEmployee(string request)
        {
            string query = "Select emp_ID, emp_Pass, emp_Name, emp_Sex, emp_Add, emp_Mail, emp_Tel, sta_Name FROM tblEmployee INNER JOIN tblStatus ON tblEmployee.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request))
            {
                query = query + string.Format(" AND emp_ID = '{0}' ", request);
            }
            //if (!string.IsNullOrEmpty(request))
            //{
            //    query = query + string.Format(" AND emp_Name LIKE '%{0}%' ", request);
            //}
            return Connection.QueryObjectList<EmployeeWithRoleModel>(query);
        }

        public EmployeeModel getEmployeeWithPassword(string userName, string password)
        {
            string query = "Select emp_ID, emp_Pass, emp_Name, emp_Sex, emp_Add, emp_Mail, emp_Tel, sta_Name FROM tblEmployee INNER JOIN tblStatus ON tblEmployee.sta_Num = tblStatus.sta_Num Where 1=1";
            query = query + string.Format(" AND emp_ID = '{0}' ", userName);
            query = query + string.Format(" AND emp_Pass = '{0}' ", UtilEncodePassword.EncodePasswordToBase64(password));
            query = query + string.Format(" AND tblStatus.sta_Num = 1 ");

            var results = Connection.QueryObjectList<EmployeeModel>(query);
            if (results?.Count > 0)
                return results[0];

            return null;
        }

        public List<TeacherWithRoleModel> getTeacher(string request)
        {
            string query = "Select tec_ID, tec_Pass, tec_Name, tec_Sex, tec_Add, tec_Mail, tec_Tel, sta_Name FROM tblTeacher INNER JOIN tblStatus ON tblTeacher.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request))
            {
                query = query + string.Format(" AND tec_ID = '{0}' ", request);
            }
            //if (!string.IsNullOrEmpty(request))
            //{
            //    query = query + string.Format(" AND tec_Name LIKE '%{0}%' ", request);
            //}
            return Connection.QueryObjectList<TeacherWithRoleModel>(query);
        }

        public TeacherModel getTeacherWithPassword(string userName, string password)
        {
            string query = "Select tec_ID, tec_Pass, tec_Name, tec_Sex, tec_Add, tec_Mail, tec_Tel, sta_Name FROM tblTeacher INNER JOIN tblStatus ON tblTeacher.sta_Num = tblStatus.sta_Num Where 1=1";
            query = query + string.Format(" AND tec_ID = '{0}' ", userName);
            query = query + string.Format(" AND tec_Pass = '{0}' ", UtilEncodePassword.EncodePasswordToBase64(password));
            query = query + string.Format(" AND tblStatus.sta_Num = 1 ");

            var results = Connection.QueryObjectList<TeacherModel>(query);
            if (results?.Count > 0)
                return results[0];

            return null;
        }

        public List<StudentWithRoleModel> getStudent(string request)
        {
            string query = "Select stu_ID, stu_Pass, stu_Name, stu_Sex, stu_Add, stu_Mail, stu_Tel, sta_Name FROM tblStudent INNER JOIN tblStatus ON tblStudent.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request))
            {
                query = query + string.Format(" AND stu_ID = '{0}' ", request);
            }
            //if (!string.IsNullOrEmpty(request))
            //{
            //    query = query + string.Format(" AND stu_Name LIKE '%{0}%' ", request);
            //}
            return Connection.QueryObjectList<StudentWithRoleModel>(query);
        }


        public StudentModel getStudentWithPassword(string userName, string password)
        {
            string query = "Select stu_ID, stu_Pass, stu_Name, stu_Sex, stu_Add, stu_Mail, stu_Tel, sta_Name FROM tblStudent INNER JOIN tblStatus ON tblStudent.sta_Num = tblStatus.sta_Num Where 1=1";
            query = query + string.Format(" AND stu_ID = '{0}' ", userName);
            query = query + string.Format(" AND stu_Pass = '{0}' ", UtilEncodePassword.EncodePasswordToBase64(password));
            query = query + " AND tblStatus.sta_Num = 1 ";
            var results = Connection.QueryObjectList<StudentModel>(query);
            if (results?.Count > 0)
                return results[0];

            return null;
        }
    }
}
