
var axios = require('axios')
var cheerio = require('cheerio');
var fs = require('fs');


function suggestImgs(term) {
    // var arrUrl= [];

   return axios.get(`http://www.istockphoto.com/il/photos/${term}`)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                // console.log(html);

                const $ = cheerio.load(html);
                var urlImg = $('img.srp-asset-image').attr("src");
                // console.log(urlImg, 'string');
                return urlImg;
            }
        }, (error) => console.log(error,'error'));



    // render(res.data)
    // console.log(res.data);

    // console.log('Sent the Request');
}




module.exports = {
    suggestImgs,
}