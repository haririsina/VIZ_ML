const upload_dataset_container = document.querySelector(".upload_file_container")
const input_dataset = document.querySelector("#choose_dataset_input")
const back_to_diagrams = document.querySelector("#back_to_diagrams")
const tip_four = document.querySelector("#tip_four")


let dataset_data
let dataset_columns_titles = ['Date', 'AveragePrice', 'Total Volume', 'Small Hass', 'Large Hass', 'XL Hass', 'Total Bags', 'Small Bags', 'Large Bags', 'XLarge Bags', 'Type', 'Year', 'Region']

function check_tip_four_status() {
    if (selected_diagram == DIAGRAM_NETWORK) {
        tip_four.style.display = "block"
        tip_four.querySelector(".tip_item_content").innerText = 'دیتاست شما بایستی شامل ستون های "ابتدای یال"، "انتهای یال"، "نام گره"، "موقعیت گره در محور x" و "موقعیت گره در محور y" باشد.'
    } else {
        tip_four.style.display = "none"
        tip_four.querySelector(".tip_item_content").innerText = ""
    }
}

back_to_diagrams.onclick = () => {
    navigateTo(SECTION_SELECT_DIAGRAM)
}

upload_dataset_container.onclick = () => {
    input_dataset.click()
}

input_dataset.onchange = (e) => {
    let file = e.target.files[0]
    let file_type = file.type

    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        dialog(true, "خطا", "فرمت فایل پشتیبانی نمی شود")
        input_dataset.value = ""
        return
    }

    if (file.size / 1000000 > 10) {
        dialog(true, "خطا", "حجم فایل بایستی کم تر از 10 مگابایت باشد")
        input_dataset.value = ""
        return
    }


    let reader = new FileReader()
    reader.onload = function (e) {
        let data = e.target.result;

        if (file_type == 'text/csv') {
            dataset_data = data
            dataset_columns_titles = csvKeys(data)
        } else {
            try {
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });
    
                workbook.SheetNames.forEach(function (sheetName) {
                    let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    let json_object = JSON.stringify(XL_row_object);
                    let result_csv = jsonToCsv(JSON.parse(json_object))
                    dataset_data = result_csv["result"]
                    dataset_columns_titles = result_csv["keys"]
                })
            } catch {
                dataset_data = "Error"
            }
        }

        input_dataset.value = ""
        
        if (dataset_data == "Error") {
            dialog(true, "خطا", "ساختار فایل صحیح نمی باشد")
        } else {
            navigateTo(SECTION_SELECT_DIAGRAM)
        }
    }

    reader.readAsBinaryString(file)
}

