const parseClsToJson = (cls_data) => {
    try {
        var lines = cls_data.split("\n")
        var first_line = lines.shift().split(",")
        var result = []
    
        if (first_line[0].startsWith("ï»¿")) {
            first_line[0] = first_line[0].substring(3)
        }
    
        lines.forEach(line => {
            var line_obj = {}
            var line_parts = line.split(",")
            for (var i = 0; i < line_parts.length; i++) {
                line_obj[first_line[i]] = line_parts[i]
            }
            result.push(line_obj)
        })
    
        return result
    } catch {
        return "Error"
    }
}