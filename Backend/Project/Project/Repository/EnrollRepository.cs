using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Data.SqlClient;
using System.Globalization;

namespace Project.Repository
{
    public class EnrollRepository
    {
        public List<EnrollModel> getEnroll(SearchEnrollRequest request)
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
            return Connection.QueryObjectList<EnrollModel>(query);
        }

        public int Enroll(EnrollRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblEnroll(stu_ID, cou_ID, sub_ID, pay_billpay, pay_billdue, amount_pay, sta_pay)" +
                " VALUES(@stu_ID, @cou_ID, @sub_ID, @pay_billpay, @pay_billdue, @amount_pay, @sta_pay)");
            DateTime dateTime = DateTime.Today;
            dateTime = dateTime.AddYears(-543);
            DateTime dateAdd = dateTime.AddDays(10);
            
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@stu_ID", requrst.stu_ID));
            parameters.Add(new SqlParameter("@cou_ID", requrst.cou_ID));
            parameters.Add(new SqlParameter("@sub_ID", requrst.sub_ID));
            parameters.Add(new SqlParameter("@pay_billpay", Util.ConvertDateTimeUtil(dateTime.ToString("d/M/yyyy"))));
            parameters.Add(new SqlParameter("@pay_billdue", Util.ConvertDateTimeUtil(dateAdd.ToString("d/M/yyyy"))));
            parameters.Add(new SqlParameter("@amount_pay", requrst.amount_pay));
            parameters.Add(new SqlParameter("@sta_pay", requrst.sta_pay));
            
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int UpdateCourse(int cou_ID)
        {
            string strSQL = string.Format("UPDATE tblCourse SET seat_remaining -= 1 WHERE cou_ID = {0}", cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

        //public int checkNameStudent(checkNameStudentRequrst requrst)
        //{
        //    string strSQL = string.Format("INSERT INTO tblInfo_learn(stu_ID, cou_ID, date_class)" +
        //        " VALUES(@stu_ID, @cou_ID, @date_class)");
        //    DateTime dateClass = DateTime.Today;

        //    List<SqlParameter> parameters = new List<SqlParameter>();
        //    parameters.Add(new SqlParameter("@stu_ID", requrst.stu_ID));
        //    parameters.Add(new SqlParameter("@cou_ID", requrst.cou_ID));
        //    parameters.Add(new SqlParameter("@date_class", Util.ConvertDateTimeUtil(dateClass.ToString("d/M/yyyy"))));

        //    return Connection.ExecuteSQLCommand(strSQL, parameters);
        //}

        public int UpdateStatustblEnroll(int stu_ID, int cou_ID, string status)
        {
            string strSQL = string.Format("UPDATE tblEnroll SET sta_pay = '{0}' WHERE stu_ID = {1} AND cou_ID = {2} ", status, stu_ID, cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

        public int UpdatePayBill(PayBillRequrst requrst)
        {
            string strSQL = string.Format("UPDATE tblEnroll SET pay_time = '{0}', pay_date = '{1}', pay_slip = '{2}' WHERE stu_ID = {3} AND cou_ID = {4}"
                , requrst.pay_time, requrst.pay_date, requrst.pay_slip, requrst.stu_ID, requrst.cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

        public List<ReceiptCheckModel> getReceiptEnroll(SearchEnrollRequest request)
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
            return Connection.QueryObjectList<ReceiptCheckModel>(query);
        }

        public int UpdateReceiptEnroll(ReceiptRequest request)
        {
            string strSQL = string.Format("UPDATE tblEnroll SET receipt_number = '{0}', receipt_date = '{1}' WHERE stu_ID = {2} AND cou_ID = {3} ", request.receipt_number, request.receipt_date, request.stu_ID, request.cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

        public List<AutoGenReceiptClass> AutoGenReceipt()
        {
            string query = "SELECT TOP 1 receipt_number FROM tblEnroll ORDER BY receipt_number DESC";
            return Connection.QueryObjectList<AutoGenReceiptClass>(query);
        }

        public List<ReportReceiptClass> getReceipt(SearchEnrollRequest request)
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
            return Connection.QueryObjectList<ReportReceiptClass>(query);
        }

        public bool Grade(DataScoreModel request)
        {
            int score = 0;
            int score_learn = 4;
            score += request.score_1;
            score += request.score_2;
            score += request.score_3;
            score += request.score_final;
            string result = "ไม่ผ่าน";
            string[] arrDate = new string[] {request.date_class1!, request.date_class2!, request.date_class3!, request.date_class4!};

            try
            {
                for (int i = 0; i < arrDate.Length; i++)
                {

                    if (arrDate[i] == null)
                    {
                        //AddData_Learn(request.stu_ID!, request.cou_ID!, arrDate[i]);
                        score_learn -= 1;
                    }
                }

                if (score_learn == 4)
                {
                    score_learn += 1;
                }

                score += score_learn;

                if (score >= 51)
                {
                    result = "ผ่าน";
                    string Cer_Date = DateTime.Now.ToString("yyyy/M/d", new CultureInfo("en-US"));
                    request.cer_date = Cer_Date;
                }

                request.score_learn = score_learn;
                request.score_total = score;
                request.result = result;
                int status = UpdateScoreEnroll(request);

                if(status > 0)
                {
                    for (int i = 0; i < arrDate.Length; i++)
                    {
                        if (arrDate[i] != null)
                        {
                            AddData_Learn(request.stu_ID!, request.cou_ID!, arrDate[i]);
                            //score_learn -= 1;
                        }
                    }
                }
                return true;

            }
            catch (Exception)
            {
                return false;
            }
                   
        }

        public int AddData_Learn(string stuID , string couID ,string dataclass)
        {
            string strSQL = string.Format("INSERT INTO tblInfo_learn(stu_ID, cou_ID, data_class)" +
                " VALUES(@stu_ID, @cou_ID, @data_class)");

            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@stu_ID", stuID));
            parameters.Add(new SqlParameter("@cou_ID", couID));
            parameters.Add(new SqlParameter("@data_class", dataclass));

            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int UpdateScoreEnroll(DataScoreModel request)
        {
            string strSQL = string.Format("UPDATE tblEnroll SET score_learn = '{0}', score_1 = '{1}', score_2 = '{2}', score_3 = '{3}', score_final = '{4}', score_total = '{5}', result = '{6}', cer_date = '{7}' WHERE stu_ID = {8} AND cou_ID = {9} "
                , request.score_learn, request.score_1, request.score_2, request.score_3, request.score_final, request.score_total, request.result, request.cer_date, request.stu_ID, request.cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

        public List<CertificateModel> getCertificate(SearchEnrollRequest request)
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
            return Connection.QueryObjectList<CertificateModel>(query);
        }

        public int changeStatusEnroll(changeStatusRequest request)
        {
            string strSQL = string.Format("UPDATE tblEnroll SET sta_pay = '{0}' WHERE stu_ID = {1} AND cou_ID = {2} ", request.statusConfirm, request.stu_ID, request.cou_ID);
            return Connection.ExecuteSQLCommand(strSQL);
        }

    }
}
