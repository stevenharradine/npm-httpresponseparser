exports.parse = function (request, callback) {
	if (request.method == "POST") {
		request.on ('data', function (data) {
			var httpRequestData = new Array(),
				httpRequestData_index = 0,
				lines = data.toString().trim().split ("\n");

			// skip first and last lines (form boundry data)
			for (var i = 1; i < lines.length - 1; i += 4) {
				var	name = lines[i].split ("name=\"")[1].split("\"")[0].trim(),
					value = lines[i+2].trim();

				httpRequestData[httpRequestData_index] = new Array();
				httpRequestData[httpRequestData_index]['name'] = name;
				httpRequestData[httpRequestData_index]['value'] = value;

				httpRequestData_index++;
			}

			callback(httpRequestData);
		});
	} else if (request.method == "GET") {
		var httpRequestData = new Array(),
			httpRequestData_index = 0,

			urlvars = request.url.split('?')[1].split('&');

		for (var i = 0; i < urlvars.length; i++) {
			var urlvars_split = urlvars[i].split('='),
				name = urlvars_split[0],
				value = urlvars_split[1];

			httpRequestData[httpRequestData_index] = new Array();
			httpRequestData[httpRequestData_index]['name'] = name;
			httpRequestData[httpRequestData_index]['value'] = value;

			httpRequestData_index++;
		}

		callback(httpRequestData);
	}
}