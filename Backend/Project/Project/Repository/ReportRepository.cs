using Project.Helper;
using Project.Models.Report;
using Project.Models.Request;

namespace Project.Repository
{
    public class ReportRepository
    {
        public List<StudentReportModel> getStudent(SearchStudentRequest request)
        {
            string query = "Select stu_ID, stu_Name, stu_Sex, stu_Add, stu_Mail, stu_Tel, sta_Name FROM tblStudent INNER JOIN tblStatus ON tblStudent.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.stu_ID))
            {
                query = query + string.Format(" AND stu_ID = {0} ", request.stu_ID);
            }
            if (!string.IsNullOrEmpty(request.stu_Name))
            {
                query = query + string.Format(" AND stu_Name LIKE '%{0}%' ", request.stu_Name);
            }
            return Connection.QueryObjectList<StudentReportModel>(query);
        }

        public List<EmployeeReportModel> getEmployee(SearchEmployeeRequest request)
        {
            string query = "Select emp_ID, emp_Name, emp_Sex, emp_Add, emp_Mail, emp_Tel, sta_Name FROM tblEmployee INNER JOIN tblStatus ON tblEmployee.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.emp_ID))
            {
                query = query + string.Format(" AND emp_ID = {0} ", request.emp_ID);
            }
            if (!string.IsNullOrEmpty(request.emp_Name))
            {
                query = query + string.Format(" AND emp_Name LIKE '%{0}%' ", request.emp_Name);
            }
            return Connection.QueryObjectList<EmployeeReportModel>(query);
        }

        public List<TeacherReportModel> getTeacher(SearchTeacherRequest request)
        {
            string query = "Select tec_ID, tec_Name, tec_Sex, tec_Add, tec_Mail, tec_Tel, sta_Name FROM tblTeacher INNER JOIN tblStatus ON tblTeacher.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.tec_ID))
            {
                query = query + string.Format(" AND tec_ID = {0} ", request.tec_ID);
            }
            if (!string.IsNullOrEmpty(request.tec_Name))
            {
                query = query + string.Format(" AND tec_Name LIKE '%{0}%' ", request.tec_Name);
            }
            return Connection.QueryObjectList<TeacherReportModel>(query);
        }

        public List<CourseReportModel> getCourse(SearchCourse request)
        {
            string query = "Select * FROM tblCourse INNER JOIN tblSubject ON tblCourse.sub_ID = tblSubject.sub_ID INNER JOIN tblTeacher ON tblCourse.tec_ID = tblTeacher.tec_ID Where 1=1";
            if (!string.IsNullOrEmpty(request.cou_ID))
            {
                query = query + string.Format(" AND cou_ID = {0} ", request.cou_ID);
            }
            if (!string.IsNullOrEmpty(request.status))
            {
                query = query + string.Format(" AND status = '{0}' ", request.status);
            }
            return Connection.QueryObjectList<CourseReportModel>(query);
        }

        public List<EnrollReportModel> getEnroll(SearchEnrollRequest request)
        {
            string query = "Select * FROM tblEnroll INNER JOIN tblCourse ON tblEnroll.cou_ID = tblCourse.cou_ID INNER JOIN tblStudent ON tblEnroll.stu_ID = tblStudent.stu_ID "
                + " INNER JOIN tblTeacher ON tblCourse.tec_ID = tblTeacher.Tec_ID INNER JOIN tblSubject ON tblCourse.sub_ID = tblSubject.sub_ID WHERE 1=1";
            if (!string.IsNullOrEmpty(request.cou_ID))
            {
                query = query + string.Format(" AND tblEnroll.cou_ID = {0} ", request.cou_ID);
            }
            if (!string.IsNullOrEmpty(request.stu_ID))
            {
                query = query + string.Format(" AND tblEnroll.stu_ID = {0} ", request.stu_ID);
            }
            if (!string.IsNullOrEmpty(request.sta_pay))
            {
                query = query + string.Format(" AND sta_pay = '{0}' ", request.sta_pay);
            }
            return Connection.QueryObjectList<EnrollReportModel>(query);
        }
    }
}
