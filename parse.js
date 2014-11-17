var cheerio = require("cheerio");
var http = require("http");
var fs = require('fs');
var id = ["1", "3", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "52", "55", "56", "57", "58", "59", "60", "61", "62", "63", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "79", "80", "81", "82", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "123", "125", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "175", "176", "177", "178", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "206", "207", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "225", "236", "238", "239", "240", "241", "242", "243", "244", "245", "246", "248", "250", "251", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "281", "282", "283", "285", "286", "290", "291", "292", "293", "294", "295", "296", "297", "299", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "392", "394", "395", "396", "397", "398", "400", "401", "402", "403"]
var link = []
var bill_no = []
var type = []
var category = []
var proposed_by = []
var petitioned_by = []
var abstract = []
var description = []
var method = []
var motion_a = []
var motion_b = []

// ================================================================================

for (var i = id.length - 1; i >= 0; i--) {

			var $ = cheerio.load(fs.readFileSync('./dump/' + id[i] + '.html').toString());
			link[i] = "http://www.cyscc.gov.tw/chinese/Discussing_Detail.aspx?s=" + id[i]
			bill_no[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_Label7').text().replace(/[\r\n]/g,"")
			type[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_Label2').text().replace(/[\r\n]/g,"")
			category[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbType').text().replace(/[\r\n]/g,"")
			proposed_by[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_Label8').text().replace(/[\r\n]/g,"")
			petitioned_by[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbParliamentary').text().replace(/[\r\n]/g,"")
			abstract[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbCaseName').text().replace(/[\r\n]/g,"")
			description[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbContent').text().replace(/[\r\n]/g,"")
			method[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbWay').text().replace(/[\r\n]/g,"")
			motion_a[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbOpinion').text().replace(/[\r\n]/g,"")
			motion_b[i] = $('#ctl00_ContentPlaceHolder1_fvDetail_lbResolution').text().replace(/[\r\n]/g,"")

}
process.stdout.write("[\n")
//for (var i = 0; i <= id.length - 1; i++) {
for (var i = 0; i <= id.length - 1; i++) {

	process.stdout.write("{\n") // Object

	// id field
		process.stdout.write("\"id\": ") // id-name
		process.stdout.write("\"" + id[i] + "\"") // id-data
		process.stdout.write(",") // id-comma
		nl()

	// links field
		process.stdout.write("\"links\": ") // links-name
		process.stdout.write("\"" + link[i] + "\"") // links-data
		process.stdout.write(",") // links-comma
		nl()

	// bill_no field
		process.stdout.write("\"bill_no\": ") // bill_no-name
		process.stdout.write("\"" + bill_no[i] + "\"") // bill_no-data
		process.stdout.write(",") // bill_no-comma
		nl()

	// type array
		process.stdout.write("\"type\": ") // type-name
		process.stdout.write("\"" + type[i] + "\"") // type-data
		process.stdout.write(",") // type-comma
		nl()

	// category field
		process.stdout.write("\"category\": ") // category-name
		process.stdout.write("[") // print [
			nl()
			process.stdout.write("\"" + category[i].replace(/[.、]/g,"\",\"").replace(/ /g,"") + "\"") // category-data
			nl()
		process.stdout.write("]") // print ]
		process.stdout.write(",")
		nl()

	// proposed_by array
		process.stdout.write("\"proposed_by\": ") // proposed_by-name
		process.stdout.write("[") // print [
			nl()
			process.stdout.write("\"" + proposed_by[i].replace(/縣長 {0,5}張花冠/g,"張花冠").replace(/[.、]/g,"\",\"") + "\"") // proposed_by-data
			nl()
		process.stdout.write("]") // print ]
		process.stdout.write(",") // proposed_by-comma
		nl()

	// petitioned_by array
		process.stdout.write("\"petitioned_by\": ") // petitioned_by-name
		process.stdout.write("[") // print [
			nl()
			process.stdout.write("\"" + petitioned_by[i].replace(/[.、]/g,"\",\"").replace(/ /g,"") + "\"") // petitioned_by-data
			nl()
		process.stdout.write("]") // print ]
		process.stdout.write(",") // petitioned_by-comma
		nl()

	// abstract field
		process.stdout.write("\"abstract\": ") // abstract-name
 		process.stdout.write("\"" + abstract[i] + "\"") // abstract-data
		process.stdout.write(",") // abstract-comma
		nl()

	// description field
		process.stdout.write("\"description\": ") // description-name
		process.stdout.write("\"" + description[i] + "\"") // description-data
		process.stdout.write(",") // description-comma
		nl()

	// method field
		process.stdout.write("\"method\": ") // method-name
		process.stdout.write("\"" + method[i] + "\"") // method-data
		process.stdout.write(",") // method-comma
		nl()

	// motions array
		process.stdout.write("\"motions\": ") // motions-name
		process.stdout.write("[") // print [
			nl()
			process.stdout.write("{") // print {
				process.stdout.write("\"date\":null,") // no date
				nl()
				process.stdout.write("\"motion\": \"審查意見\"") // motion-name
				process.stdout.write(",") // motion-comma
				nl()
				process.stdout.write("\"resolution\": ") // motion-detail-name
				process.stdout.write("\"" + motion_a[i] + "\"") // motion-detail-data
				nl()

			process.stdout.write("}") // print }
		process.stdout.write(",")
		nl()
			process.stdout.write("{") // print {
				process.stdout.write("\"date\":null,") // no date
				nl()
				process.stdout.write("\"motion\": \"大會決議\"") // motion-name
				process.stdout.write(",") // motion-comma
				nl()
				process.stdout.write("\"resolution\": ") // motion-detail-name
				process.stdout.write("\"" + motion_b[i] + "\"") // motion-detail-data
				nl()

			process.stdout.write("}") // print }
			nl()
		process.stdout.write("]") // print ]
		nl()
		process.stdout.write("}")
	if (i != id.length - 1){
		process.stdout.write(",\n")
	}else{
		process.stdout.write("\n")
	}
};
process.stdout.write("]\n")

function nl(){
	process.stdout.write("\n")
}