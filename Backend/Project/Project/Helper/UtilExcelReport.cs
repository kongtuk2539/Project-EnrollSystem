using Microsoft.AspNetCore.Mvc;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System.ComponentModel;
using System.Reflection;

namespace Project.Helper
{
    public static class UtilExcelReport
    {
        public static List<Dictionary<string, string>> ConvertDTOToListOfDictionaries<T>(IEnumerable<T> dtos)
        {
            List<Dictionary<string, string>> result = new List<Dictionary<string, string>>();

            foreach (var dto in dtos)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>();
                PropertyInfo[] properties = typeof(T).GetProperties();

                foreach (var property in properties)
                {
                    string displayName = property.GetCustomAttribute<DisplayNameAttribute>()?.DisplayName ?? property.Name;
                    dict.Add(displayName, property.GetValue(dto)?.ToString());
                }

                result.Add(dict);
            }

            return result;
        }

        public static FileStreamResult GenerateExcel(List<Dictionary<string, string>> rowData)
        {
            // Create a new workbook and sheet

            HSSFWorkbook workbook = new HSSFWorkbook();
            var sheet = workbook.CreateSheet("Sheet1");

            // Set the header row
            IRow headerRow = sheet.CreateRow(0);
            int columnIndex = 0;
            if (rowData.Count > 0)
            {
                foreach (var key in rowData[0].Keys)
                {
                    ICell cell = headerRow.CreateCell(columnIndex);
                    cell.SetCellValue(key);
                    columnIndex++;
                }

                // Populate data rows
                int rowIndex = 1;
                foreach (var row in rowData)
                {
                    IRow dataRow = sheet.CreateRow(rowIndex);
                    columnIndex = 0;
                    foreach (var key in row.Keys)
                    {
                        ICell cell = dataRow.CreateCell(columnIndex);
                        cell.SetCellValue(row[key]);
                        columnIndex++;
                    }
                    rowIndex++;
                }
            }


            MemoryStream memoryStream = new MemoryStream();

            workbook.Write(memoryStream);

            memoryStream.Position = 0;

            FileStreamResult fileStreamResult = new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            fileStreamResult.FileDownloadName = "Report.xls";

            return fileStreamResult;

            // Save the workbook to the specified file path
            //using (FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            //{
            //    workbook.Write(fileStream, true);
            //}
        }
        
    }
}
