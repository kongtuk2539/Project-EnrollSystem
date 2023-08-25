using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Project.Repository
{
    public class SubjectRepository
    {
        public List<SubjectModel> getSubject(SearchSubjectRequest request)
        {
            #region code
            //string connstring = "Data Source = DESKTOP-3MMF7DL; Initial Catalog=projectDB;Integrated Security=true";
            //SqlConnection con = new SqlConnection(connstring);
            //con.Open();
            //string query = "Select * from tblSubject";
            //if (!string.IsNullOrEmpty(id) & id != "all")
            //{
            //    query = query + string.Format(" Where sub_ID = {0} ", id);
            //}
            //SqlCommand cmd = new SqlCommand(query, con);
            //SqlDataReader dr = cmd.ExecuteReader();
            //List<SubjectModel> list = new List<SubjectModel>();
            //while (dr.Read())
            //{
            //    //list.Add(new SubjectModel() { sub_ID = Convert.ToInt32(dr.GetValue(0)), sub_Name = (string)dr.GetValue(1), sub_Price = (int)dr.GetValue(2) });
            //    list.Add(new SubjectModel() { sub_ID = Convert.ToInt32(dr["sub_ID"]), sub_Name = (string)dr["sub_Name"], sub_Price = (int)dr["sub_Price"] });
            //    //list.Add(Util.ConvertToObject<SubjectModel>(dr));
            //}

            //return list;
            #endregion

            string query = "Select sub_ID, sub_Name, sub_Price, sta_Name FROM tblSubject INNER JOIN tblStatus ON tblSubject.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.sub_ID))
            {
                query = query + string.Format(" AND sub_ID = {0} ", request.sub_ID);
            }if (!string.IsNullOrEmpty(request.sub_Name))
            {
                query = query + string.Format(" AND sub_Name LIKE '%{0}%' ", request.sub_Name);
            }
            return Connection.QueryObjectList<SubjectModel>(query);
        }

        public int AddSubject(SubjectRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblSubject(sub_Name, sub_Price) VALUES(@sub_Name, @sub_Price)");
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sub_Name", requrst.sub_Name));
            parameters.Add(new SqlParameter("@sub_Price", requrst.sub_Price));
            return Connection.ExecuteSQLCommand(strSQL, parameters);

        }

        public int UpdateSubject(SubjectRequrst requrst, int sub_ID)
        {
            string strSQL = string.Format("UPDATE tblSubject SET sub_Name = @sub_Name, sub_Price = @sub_Price WHERE sub_ID = {0}", sub_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sub_Name", requrst.sub_Name));
            parameters.Add(new SqlParameter("@sub_Price", requrst.sub_Price));
            return Connection.ExecuteSQLCommand(strSQL, parameters);

        }

        public int DeleteSubject(bool status, int sub_ID)
        {
            string strSQL = string.Format("UPDATE tblSubject SET sta_Num = @sta_Num WHERE sub_ID = {0}", sub_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sta_Num", (status)? "1" : "0"));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

    }
}
