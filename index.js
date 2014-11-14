cheerio = require("cheerio");
var http = require("http");



//================================================================================



for (var b = 600; b >= 0; b--) {
  var url = 'http://www.cyscc.gov.tw/chinese/Discussing_Detail.aspx?s=' + b
  download(url , function(data, url) {
    if (data) {
          var $ = cheerio.load(data);
          $('#ctl00_ContentPlaceHolder1_fvDetail_Label2').each(function(i, e) {
          console.log(url);
        });
    }
  },
  url);
  //console.log('http://www.cyscc.gov.tw/chinese/Discussing_Detail.aspx?s=' + b);
}


//================================================================================



function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data, url);
    });
  }).on("error", function() {
    callback(null);
  });
}

