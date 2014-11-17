var cheerio = require("cheerio");
var http = require("http");
var fs = require('fs');


//================================================================================



for (var b = 600; b >= 0; b--) {
  var url = 'http://www.cyscc.gov.tw/chinese/Discussing_Detail.aspx?s=' + b
  download(url , function(data, url, num) {
    if (data) {
          var $ = cheerio.load(data);
          $('#ctl00_ContentPlaceHolder1_fvDetail_Label2').each(function(i, e) {
          console.log(url);
          fs.writeFile('./dump/' + num + '.html', data)
        });
    }
  },
  b);
  //console.log('http://www.cyscc.gov.tw/chinese/Discussing_Detail.aspx?s=' + b);
}


//================================================================================



function download(url, callback, num) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data, url, num);
    });
  }).on("error", function() {
    callback(null);
  });
}

