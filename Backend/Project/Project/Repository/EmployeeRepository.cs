using Project.Helper;
using Project.Models;
using Project.Models.Request;
using System.Data.SqlClient;

namespace Project.Repository
{
    public class EmployeeRepository
    {
        public List<EmployeeModel> getEmployee(SearchEmployeeRequest request)
        {
            string query = "Select emp_ID, emp_Pass, emp_Name, emp_Sex, emp_Add, emp_Mail, emp_Tel, sta_Name FROM tblEmployee INNER JOIN tblStatus ON tblEmployee.sta_Num = tblStatus.sta_Num Where 1=1";
            if (!string.IsNullOrEmpty(request.emp_ID))
            {
                query = query + string.Format(" AND emp_ID = {0} ", request.emp_ID);
            }
            if (!string.IsNullOrEmpty(request.emp_Name))
            {
                query = query + string.Format(" AND emp_Name LIKE '%{0}%' ", request.emp_Name);
            }
            List <EmployeeModel> employee = Connection.QueryObjectList<EmployeeModel>(query);
            if (employee.Count == 1)
            {
                employee[0].emp_Pass = UtilEncodePassword.DecodeFrom64(employee[0].emp_Pass);
            }
            return employee;
        }
        public EmployeeModel AddEmployee(EmployeeRequrst requrst)
        {
            string strSQL = string.Format("INSERT INTO tblEmployee(emp_ID, emp_Pass, emp_Name, emp_Sex, emp_Add, emp_Mail, emp_Tel) VALUES(@emp_ID, @emp_Pass, @emp_Name, @emp_Sex, @emp_Add, @emp_Mail, @emp_Tel)");
            List<SqlParameter> parameters = new List<SqlParameter>();
            int empID = createPK();
            parameters.Add(new SqlParameter("@emp_ID", empID));
            parameters.Add(new SqlParameter("@emp_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.emp_Pass!)));
            parameters.Add(new SqlParameter("@emp_Name", requrst.emp_Name));
            parameters.Add(new SqlParameter("@emp_Sex", requrst.emp_Sex));
            parameters.Add(new SqlParameter("@emp_Add", requrst.emp_Add));
            parameters.Add(new SqlParameter("@emp_Mail", requrst.emp_Mail));
            parameters.Add(new SqlParameter("@emp_Tel", requrst.emp_Tel));
            Connection.ExecuteSQLCommand(strSQL, parameters);
            SearchEmployeeRequest employee = new SearchEmployeeRequest
            {
                emp_ID = empID.ToString(),
                emp_Name = ""
            };
            List<EmployeeModel> response = getEmployee(employee);
            return response[0];
        }
        public int UpdateEmployee(EmployeeRequrst requrst, int emp_ID)
        {
            string strSQL = string.Format("UPDATE tblEmployee SET emp_Pass = @emp_Pass, emp_Name = @emp_Name, emp_Sex = @emp_Sex, emp_Add = @emp_Add, emp_Mail = @emp_Mail, emp_Tel = @emp_Tel WHERE emp_ID = {0}", emp_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@emp_Pass", UtilEncodePassword.EncodePasswordToBase64(requrst.emp_Pass!)));
            parameters.Add(new SqlParameter("@emp_Name", requrst.emp_Name));
            parameters.Add(new SqlParameter("@emp_Sex", requrst.emp_Sex));
            parameters.Add(new SqlParameter("@emp_Add", requrst.emp_Add));
            parameters.Add(new SqlParameter("@emp_Mail", requrst.emp_Mail));
            parameters.Add(new SqlParameter("@emp_Tel", requrst.emp_Tel));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }
        public int DeleteEmployee(bool status, int emp_ID)
        {
            string strSQL = string.Format("UPDATE tblEmployee SET sta_Num = @sta_Num WHERE emp_ID = {0}", emp_ID);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@sta_Num", (status) ? "1" : "0"));
            return Connection.ExecuteSQLCommand(strSQL, parameters);
        }

        public int createPK()
        {
            string sql = string.Format("SELECT TOP 1 * FROM tblEmployee ORDER BY emp_ID DESC");
            List<EmployeeModel> dataRow = Connection.QueryObjectList<EmployeeModel>(sql);
            if (dataRow.Count == 0)
            {
                return 4001;
            }

            int newPK = dataRow[0].emp_ID;
            newPK++;

            return newPK;
        }
    }
}
