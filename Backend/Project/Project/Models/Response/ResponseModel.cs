namespace Project.Models.Response
{
    public class ResponseModel
    {

        public ResponseModel()
        {

        }
        public ResponseModel(object? _Data = null, StateType.Type type = StateType.Type.SUCCESS)
        {
            Data = _Data;
            switch (type)
            {
                case StateType.Type.SUCCESS:
                    messageCode = "BSYSI001";
                    message = "สำเร็จ";
                    break;
                case StateType.Type.NOTFOUND_DATA:
                    messageCode = "BSYSI002";
                    message = "ไม่พบข้อมูล";
                    break;
                case StateType.Type.SAVE_SUCCESS:
                    messageCode = "BSYSI003";
                    message = "บันทึกข้อมูลสำเร็จ";
                    break;
                case StateType.Type.SAVE_FAILER:
                    messageCode = "BSYSE001";
                    message = "บันทึกข้อมูลไม่สำเร็จ";
                    break;
                case StateType.Type.DEL_SUCCESS:
                    messageCode = "BSYSI003";
                    message = "บันทึกข้อมูลสำเร็จ";
                    break;
                case StateType.Type.DEL_FAILER:
                    messageCode = "BSYSE001";
                    message = "บันทึกข้อมูลไม่สำเร็จ";
                    break;
                default:
                 
                    break;
            }
        }
        public string? messageCode { get; set; }
        public string? message { get; set; }
        public object? Data { get; set; }

    }
}
