using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Data.SqlClient;

namespace Project.Repository
{
    public class TeacherRepository
    {
        public List<TeacherModel> getTeacher(SearchTeacherRequest request)
        {
            string query = "Select tec_ID, tec_Pass, tec_Name, tec_Sex, tec_Add, tec_Mail, tec_Tel, sta_Name FROM tblTeacher INNER JOIN tblStatus ON tblTeacher.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.tec_ID))
            {
                query = query + string.Format(" AND tec_ID = {0} ", request.tec_ID);
            }
            if (!string.IsNullOrEmpty(request.tec_Name))
            {
                query = query + string.Format(" AND tec_Name LIKE '%{0}%' ", request.tec_Name);
            }
            List<TeacherModel> teacher = Connection.QueryObjectList<TeacherModel>(query);
            if (teacher.Count == 1)
            {
                teacher[0].tec_Pass = UtilEncodePassword.DecodeFrom64(teacher[0].tec_Pass);
            }
            return teacher;
        }
        public TeacherModel AddTeacher(TeacherRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblTeacher(tec_ID, tec_Pass, tec_Name, tec_Sex, tec_Add, tec_Mail, tec_Tel) VALUES(@tec_ID, @tec_Pass, @tec_Name, @tec_Sex, @tec_Add, @tec_Mail, @tec_Tel)");
            List<SqlParameter> parameters = new List<SqlParameter>();
            int tecID = createPK();
            parameters.Add(new SqlParameter("@tec_ID", tecID));
            parameters.Add(new SqlParameter("@tec_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.tec_Pass!)));
            parameters.Add(new SqlParameter("@tec_Name", requrst.tec_Name));
            parameters.Add(new SqlParameter("@tec_Sex", requrst.tec_Sex));
            parameters.Add(new SqlParameter("@tec_Add", requrst.tec_Add));
            parameters.Add(new SqlParameter("@tec_Mail", requrst.tec_Mail));
            parameters.Add(new SqlParameter("@tec_Tel", requrst.tec_Tel));
            Connection.ExecuteSQLCommand(strSQL, parameters);
            SearchTeacherRequest teacher = new SearchTeacherRequest
            {
                tec_ID = tecID.ToString(),
                tec_Name = ""
            };
            List<TeacherModel> response = getTeacher(teacher);
            return response[0];
        }
        public int UpdateTeacher(TeacherRequrst requrst, int tec_ID)
        {
            string strSQL = string.Format("UPDATE tblTeacher SET tec_Pass = @tec_Pass, tec_Name = @tec_Name, tec_Sex = @tec_Sex, tec_Add = @tec_Add, tec_Mail = @tec_Mail, tec_Tel = @tec_Tel WHERE tec_ID = {0}", tec_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@tec_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.tec_Pass!)));
            parameters.Add(new SqlParameter("@tec_Name", requrst.tec_Name));
            parameters.Add(new SqlParameter("@tec_Sex", requrst.tec_Sex));
            parameters.Add(new SqlParameter("@tec_Add", requrst.tec_Add));
            parameters.Add(new SqlParameter("@tec_Mail", requrst.tec_Mail));
            parameters.Add(new SqlParameter("@tec_Tel", requrst.tec_Tel));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }
        public int DeleteTeacher(bool status, int tec_ID)
        {
            string strSQL = string.Format("UPDATE tblTeacher SET sta_Num = @sta_Num WHERE tec_ID = {0}", tec_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sta_Num", (status) ? "1" : "0"));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int createPK()
        {
            string sql = string.Format("SELECT TOP 1 * FROM tblTeacher ORDER BY tec_ID DESC");
            List<TeacherModel> dataRow = Connection.QueryObjectList<TeacherModel>(sql);
            if (dataRow.Count == 0)
            {
                return 2001;
            }

            int newPK = dataRow[0].tec_ID;
            newPK++;

            return newPK;
        }
    }
}
