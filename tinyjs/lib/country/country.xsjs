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
		return result;
	} else {
		return output;
	}
}

var country = {
	name: $.request.parameters.get("name"),
	partof: $.request.parameters.get("continent")
};
// validate the inputs here!

var output = saveCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output);
