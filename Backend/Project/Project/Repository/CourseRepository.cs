using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Data.SqlClient;
using System.Globalization;

namespace Project.Repository
{
    public class CourseRepository
    {
        public List<SubjectSelect> getSubjectSelect()
        {   
            string query = "Select sub_ID, sub_Name, sub_Price FROM tblSubject WHERE sta_Num = 1";
            return Connection.QueryObjectList<SubjectSelect>(query);
        }

        public List<TeacherSelect> getTeacherSelect()
        {
            string query = "Select tec_ID, tec_Name FROM tblTeacher WHERE sta_Num = 1";
            return Connection.QueryObjectList<TeacherSelect>(query);
        }


        public List<CourseModel> getCourse(SearchCourse request)
        {
            string query = "Select * FROM tblCourse INNER JOIN tblSubject ON tblCourse.sub_ID = tblSubject.sub_ID INNER JOIN tblTeacher ON tblCourse.tec_ID = tblTeacher.tec_ID Where 1=1";
            if (!string.IsNullOrEmpty(request.cou_ID))
            {
                query = query + string.Format(" AND cou_ID = {0} ", request.cou_ID);
            }
            if (!string.IsNullOrEmpty(request.tec_ID))
            {
                query = query + string.Format(" AND tblCourse.tec_ID = '{0}' ", request.tec_ID);
            }
            if (!string.IsNullOrEmpty(request.status))
            {
                query = query + string.Format(" AND status = '{0}' ", request.status);
            }
            return Connection.QueryObjectList<CourseModel>(query);
        }

        public List<CourseModel> getCourse(string couID)
        {
            SearchCourse r = new SearchCourse();
            r.cou_ID = couID;
            return getCourse(r);
        }

        public int AddCourse(CourseRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblCourse(sub_ID, tec_ID, num_seats, seat_remaining, time_open, time_close, time_start, time_end, status, total_price)" +
                " VALUES(@sub_ID, @tec_ID, @num_seats, @seat_remaining, @time_open, @time_close, @time_start, @time_end, @status, @total_price)");
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sub_ID", requrst.sub_ID));
            parameters.Add(new SqlParameter("@tec_ID", requrst.tec_ID));
            parameters.Add(new SqlParameter("@num_seats", requrst.num_seats));
            parameters.Add(new SqlParameter("@seat_remaining", requrst.seat_remaining));
            parameters.Add(new SqlParameter("@time_open", Util.ConvertDateTimeUtil(requrst.time_open)));
            parameters.Add(new SqlParameter("@time_close", Util.ConvertDateTimeUtil(requrst.time_close)));
            parameters.Add(new SqlParameter("@time_start", Util.ConvertDateTimeUtil(requrst.time_start)));
            parameters.Add(new SqlParameter("@time_end", Util.ConvertDateTimeUtil(requrst.time_end)));
            parameters.Add(new SqlParameter("@status", requrst.status));
            parameters.Add(new SqlParameter("@total_price", requrst.total_price));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int UpdateCourse(CourseRequrst requrst, int cou_ID)
        {
            string strSQL = string.Format("UPDATE tblCourse SET sub_ID = @sub_ID, tec_ID = @tec_ID, num_seats = @num_seats, seat_remaining = @seat_remaining," +
                " time_open = @time_open, time_close = @time_close, time_start = @time_start, time_end = @time_end, status = @status, total_price = @total_price  WHERE cou_ID = {0}", cou_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sub_ID", requrst.sub_ID));
            parameters.Add(new SqlParameter("@tec_ID", requrst.tec_ID));
            parameters.Add(new SqlParameter("@num_seats", requrst.num_seats));
            parameters.Add(new SqlParameter("@seat_remaining", requrst.seat_remaining));
            parameters.Add(new SqlParameter("@time_open", Util.ConvertDateTimeUtil(requrst.time_open)));
            parameters.Add(new SqlParameter("@time_close", Util.ConvertDateTimeUtil(requrst.time_close)));
            parameters.Add(new SqlParameter("@time_start", Util.ConvertDateTimeUtil(requrst.time_start)));
            parameters.Add(new SqlParameter("@time_end", Util.ConvertDateTimeUtil(requrst.time_end)));
            parameters.Add(new SqlParameter("@status", requrst.status));
            parameters.Add(new SqlParameter("@total_price", requrst.total_price));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int DeleteCourse(bool status, int cou_ID)
        {
            string strSQL = string.Format("UPDATE tblCourse SET status = @status WHERE cou_ID = {0}", cou_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@status", (status) ? "open" : "close"));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

    }
}
