
//dadelion

$(document).ready(function(){
        //1st Jquery
		$('.resultContainer').hide();
        $('.extraData').hide();

		//The API I am using is https://dandelion.eu/docs/
        //2nd Jquery
		$("#f1").submit(function(){
			runAjax();
            $('.resultContainer').show();
            return false;
		});
        //3rd Jquery
		$('#delete_button').on("click",deleteRow);
        //4th Jquery
        $('.example_button').on('click',getLocalData);

        //10th Jquery
        $('.clearfix').on('click','li',function(){
            $('.clearfix li').removeAttr('class');
            $(this).attr('class','active');
        });

	});
		
		var data1;

        function getLocalData(){
            console.log('example clicked');
            try{

                $.ajax({ 
                url: 'data.json', 
                type: 'GET',
                success: loadExampleData,
                dataType: 'json',
                crossDomain: true
        });
                return false;
            } catch (e) {console.log(e.description);}


        }

        function loadExampleData(response){
            console.log(response);

            //interactions
            //5th Jquery
            $('.extraData').attr('class','extraData col-sm-6')
            $(".jumbotron").animate({
                'width':'50%'
            },'fast',function(){
                //6th Jquery
                $('.jumbotron').attr('class','jumbotron col-sm-6')
                //7th Jquery
                $('.extraData').show()
            });

            //storing data
            var title = response.Youtube_Title;
            var link = response.Youtube_Link;
            var comments = response.Youtube_Comments;

            console.log(title);
            console.log(link);
            console.log(comments[0].comment);

            for (i = 0; i <comments.length; i++){
                console.log('here?')
                var titleColumn = $('<td>' + title + '</td>');
                var row = $('<tr class=active></tr>');
                var commentsColumn = $('<td>' + comments[i].comment + '</td>');    
                row.append(titleColumn);
                row.append(commentsColumn);
                $('.sampleDataTable').append(row);
            }

            //displaying data

        }

		function runAjax(){
			data1 = $("#input1").val();

			console.log("here running ajax");
			try{

				$.ajax({ 
    			url: 'https://api.dandelion.eu/datatxt/sent/v1', 
                type: 'GET',
                data: {
                	lang: "en",
                	text: data1,
                	$app_id: "d0905068",
                	$app_key: "daea2ead2e646ce13ada114b9bbb9353",
                }, 
                
                // jsonp: false,
                // jsonpCallback : "showResult",

                success: addResult,
                error: function(response){
                    console.log(response);
                },
                dataType: "jsonp",
                crossDomain: true
        });

				return false;
			} catch (e) {console.log(e.description);}

		}

     function addResult(response) {
     	console.log("adding Result");
     	//data obtained through Ajax
     	var sentiment_score = response.sentiment.score;
     	var sentiment_rating = response.sentiment.type;
     	var inputed_text = data1;

     	//created row for table
     	var row = $('<tr class=active></tr>');
     	var textColumn = $('<td>' + inputed_text + '</td>');
     	var scoreColumn = $('<td>' + sentiment_score + '</td>');
     	var ratingColumn = $('<td>' + sentiment_rating + '</td>');

     	row.append(textColumn);
     	row.append(scoreColumn);
     	row.append(ratingColumn);
        //8th Jquery
     	$('.resultTable').append(row);
		} 



	function deleteRow(){
        //9th Jquery
		$('.resultTable tr').last().remove();
		}