const csvKeys = (csv_data) => {
    var first_line = csv_data.split("\n")[0]
    first_line = first_line.startsWith("ï»¿") ? first_line.substring("3") : first_line
    return first_line.split(",")
}

const jsonToCsv = (json_data) => {
    try {
        var first_line = json_data[0]
        var json_keys = Object.keys(first_line)
        var result = ""
    
        result += json_keys.toString() + "\n"
    
        json_data.forEach(line => {
            json_keys.forEach(key => {
                result += line[key] 
                if (json_keys.indexOf(key) != json_keys.length - 1) {
                    result += ","
                }

            })
            result += "\n"
        })
    
        return {"result": result, "keys": json_keys}
    } catch {
        return "Error"
    }
}