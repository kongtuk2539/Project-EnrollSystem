using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Data.SqlClient;

namespace Project.Repository
{
    public class StudentRepository
    {
        public List<StudentModel> getStudent(SearchStudentRequest request)
        {
            string query = "Select stu_ID, stu_Pass, stu_Name, stu_Sex, stu_Add, stu_Mail, stu_Tel, sta_Name FROM tblStudent INNER JOIN tblStatus ON tblStudent.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.stu_ID))
            {
                query = query + string.Format(" AND stu_ID = {0} ", request.stu_ID);
            }
            if (!string.IsNullOrEmpty(request.stu_Name))
            {
                query = query + string.Format(" AND stu_Name LIKE '%{0}%' ", request.stu_Name);
            }
            List<StudentModel> student = Connection.QueryObjectList<StudentModel>(query);
            if (student.Count == 1)
            {
                student[0].stu_Pass = UtilEncodePassword.DecodeFrom64(student[0].stu_Pass);
            }
            return student;
        }
        public StudentModel AddStudent(StudentRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblStudent(stu_ID, stu_Pass, stu_Name, stu_Sex, stu_Add, stu_Mail, stu_Tel) VALUES(@stu_ID, @stu_Pass, @stu_Name, @stu_Sex, @stu_Add, @stu_Mail, @stu_Tel)");
            List<SqlParameter> parameters = new List<SqlParameter>();
            int stuID = createPK();
            parameters.Add(new SqlParameter("@stu_ID", stuID));
            parameters.Add(new SqlParameter("@stu_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.stu_Pass!)));
            parameters.Add(new SqlParameter("@stu_Name", requrst.stu_Name));
            parameters.Add(new SqlParameter("@stu_Sex", requrst.stu_Sex));
            parameters.Add(new SqlParameter("@stu_Add", requrst.stu_Add));
            parameters.Add(new SqlParameter("@stu_Mail", requrst.stu_Mail));
            parameters.Add(new SqlParameter("@stu_Tel", requrst.stu_Tel));
            Connection.ExecuteSQLCommand(strSQL, parameters);
            SearchStudentRequest student = new SearchStudentRequest
            {
              stu_ID = stuID.ToString(),
              stu_Name = ""
            };
            List<StudentModel> response = getStudent(student);
            return response[0];
        }
        public int UpdateStudent(StudentRequrst requrst, int stu_ID)
        {
            string strSQL = string.Format("UPDATE tblStudent SET stu_Pass = @stu_Pass, stu_Name = @stu_Name, stu_Sex = @stu_Sex, stu_Add = @stu_Add, stu_Mail = @stu_Mail, stu_Tel = @stu_Tel WHERE stu_ID = {0}", stu_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@stu_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.stu_Pass!)));
            parameters.Add(new SqlParameter("@stu_Name", requrst.stu_Name));
            parameters.Add(new SqlParameter("@stu_Sex", requrst.stu_Sex));
            parameters.Add(new SqlParameter("@stu_Add", requrst.stu_Add));
            parameters.Add(new SqlParameter("@stu_Mail", requrst.stu_Mail));
            parameters.Add(new SqlParameter("@stu_Tel", requrst.stu_Tel));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }
        public int DeleteStudent(bool status, int stu_ID)
        {
            string strSQL = string.Format("UPDATE tblStudent SET sta_Num = @sta_Num WHERE stu_ID = {0}", stu_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sta_Num", (status) ? "1" : "0"));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int createPK()
        {
            string sql = string.Format("SELECT TOP 1 * FROM tblStudent ORDER BY stu_ID DESC");
            List<StudentModel> dataRow = Connection.QueryObjectList<StudentModel>(sql);
            if(dataRow.Count == 0)
            {
                return 3001;
            }

            int newPK = dataRow[0].stu_ID;
            newPK++;

            return newPK;
        }
    }
}
