function saveCountry(country) {
	var conn = $.db.getConnection();
	var output = JSON.stringify(country);
	var sql = 'CALL "tinyworld.tinydb::createCountry"(?, ?, ?)';
	var stmt = conn.prepareCall(sql);
	stmt.setNString(1, country.name);
	stmt.setNString(2, country.partof);
	stmt.execute();
	var result = stmt.getNString(3);
	stmt.close();
	conn.commit();
	conn.close();
	
	if (result) {
		return {body : result,
			status: $.net.http.BAD_REQUEST
		};
	} else {
		
		return {body : output,
			status: $.net.http.CREATED
		};
	}
}

var body = $.request.body.asString();
var country = JSON.parse(body);

var output = saveCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output.body);
$.response.status = output.status;

