const upload_dataset_container = document.querySelector(".upload_file_container")
const input_dataset = document.querySelector("#choose_dataset_input")

let dataset_data

upload_dataset_container.onclick = () => {
    input_dataset.click()
}

input_dataset.onchange = (e) => {
    var file = e.target.files[0]

    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        dialog(true, "خطا", "فرمت فایل پشتیبانی نمی شود")
        input_dataset.value = ""
        return
    }

    if (file.size / 1000000 > 20) {
        dialog(true, "خطا", "حجم فایل بایستی کم تر از 20 مگابایت باشد")
        input_dataset.value = ""
        return
    }

    var reader = new FileReader()
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
  
        workbook.SheetNames.forEach(function(sheetName) {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object);
          dataset_data = JSON.parse(json_object)
        })
    }
    reader.readAsBinaryString(file)
}