using FastMember;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;

namespace Project.Helper
{
    public static class Util
    {
        public static T ConvertToObject<T>(this SqlDataReader rd) where T : class, new()
        {
            Type type = typeof(T);
            var accessor = TypeAccessor.Create(type);
            var members = accessor.GetMembers();
            var t = new T();

            for (int i = 0; i < rd.FieldCount; i++)
            {
                if (!rd.IsDBNull(i))
                {
                    string fieldName = rd.GetName(i);

                    if (members.Any(m => string.Equals(m.Name, fieldName, StringComparison.OrdinalIgnoreCase)))
                    {
                        accessor[t, fieldName] = rd.GetValue(i);
                    }
                }
            }

            return t;
        }

       
        public static DateTime ConvertDateTimeUtil(string strDate)
        {
            return DateTime.Parse(DateTime.ParseExact(strDate, "d/M/yyyy", new CultureInfo("en-EN")).ToString("d/M/yyyy", new CultureInfo("th-TH")));
        }


    }
}
