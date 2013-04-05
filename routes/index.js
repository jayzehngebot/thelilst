
/*
 * GET home page.
 */

 var request = require('request');

 var siteTitle = "Who's the Lil'st";

exports.index = function(req, res){

	var remote_api_url = 'http://lils.herokuapp.com/data/lils';

	request.get(remote_api_url, function(error,response,data){

		if(error){
			res.send("error fetching remote API info");
		}

		// if API is ok, successful request

		var apiData = JSON.parse(data);

	
		// if ok, then succesful api rquest
		if (apiData.status == 'OK') {

			//console.log(apiData);

		var lilHeight = "";
		var lilNames = "";
		for(i in apiData.lils){  
			lilHeight = (apiData.lils[i].height);

			var rex = /^(\d+)'(\d+)(?:''|")$/;
			var match = rex.exec(lilHeight);
			var feet, inch;
			if (match) {
			    feet = parseInt(match[1], 10);
			    inch = parseInt(match[2], 10);
			}

			apiData.lils[i].inches = ((feet * 12) + inch);

			//console.log("height : " + lilHeight);
			console.log("total inches: "+ apiData.lils[i].inches); 
			//console.log("feet: "+ feet + " inch: " + inch);
		};

		apiData.lils.sort(function(a,b){
			return a.inches - b.inches;
		});

		// for (i in apiData.lils){
		// 	console.log(apiData.lils[i]);
		// }

		//console.log(lilNames);

			//prep JSON for template
			var templateData = {
				title : siteTitle,
				lils : apiData.lils,
				rawJSON : data, 
                remote_url : remote_api_url
			}

			  res.render('index', templateData);
		}

	})


	};



