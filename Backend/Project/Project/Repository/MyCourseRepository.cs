using Project.Helper;
using Project.Models;
using Project.Models.Request;

namespace Project.Repository
{
    public class MyCourseRepository
    {
        public List<getIdCourse> getEnroll(SearchEnrollRequest request)
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
            return Connection.QueryObjectList<getIdCourse>(query);
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

        public List<CourseModel> getMyCourse(SearchEnrollRequest request)
        {
            List<getIdCourse> courseID = getEnroll(request);
            List<CourseModel> result = new List<CourseModel>();

            foreach (var item in courseID)
            {
                if (!string.IsNullOrEmpty(item.cou_ID.ToString()))
                {
                    SearchCourse r = new SearchCourse();
                    r.cou_ID = item.cou_ID.ToString();
                    List<CourseModel> myCourse = getCourse(r);
                    
                    if (myCourse.Count > 0)
                    {
                        result.Add(myCourse[0]);
                    }
                }
            }
            return result;
        }
    }
}
