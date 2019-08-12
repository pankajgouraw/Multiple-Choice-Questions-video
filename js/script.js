$(function() {
    let noOfQuest =0;
    let totalQuestion = data.length;
    let totalCorrectAns = 0;
    let questionPerPage = questPerPage;
    console.log("Total no of question : " + totalQuestion);
    console.log("No of question per page : " + questionPerPage);
    $('.logo h3').append(header);
    $('body').css({
        'background': bgColor
    });
    let mcqWrapper = $('.mcqWrapper');
    let mcqContainer = $('#mcqWrapper');
    mcqWrapper.css({
        'border': borderColor
    });
    let questionIndex = 0;




    // get the variable from url
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        console.log("param available");
        let geturl = document.location.search;
        var params = new URLSearchParams(url.substring(1));
        questionPerPage = parseInt(params.get('qpp'));
        questionIndex = parseInt(params.get('qno'));
        totalCorrectAns = parseInt(params.get('ca'));
    } else {
        console.log("param not available");
    }
    // End get the variable from url


    // check the score 
    if(questionPerPage >= totalQuestion){
        console.log("I am at last page...");
        $('#nextQuest').text("Check Your Score");
    }

    // function to show the question
    function displayQueastions() {
        for (questionIndex; questionIndex < questionPerPage; questionIndex++) {
            if (questionIndex > totalQuestion - 1) {
                noOfQuest = questionIndex;
                // change the position of ans options
                let optContainer = $('.mcqWrapper #mcqWrapper .optContainer');
                $.each(optContainer, function(index, value) {
                        let ansContainer = $(this).find('.ans');
                        $.each(ansContainer, function(index, value) {
                            $(this).css({
                                'order': Math.floor((Math.random() * 4) + 1)
                            });
                        })
                    }) // end change the position of ans options
                return false;
            }
            let html = `<div class='questionContainer animated fadeInUp'><div class='questOptContainer'><div class='questContainer'><h3 class='question'>${data[questionIndex].question}
                         <img src='img/right.png'  class='right' /><img src='img/wrong.png'  class='wrong' /></h3></div><div class='optContainer'><div class='ans'><label class='labelContainer'><input type='radio' id='corrAns0${questionIndex}' class="corrAns" value='' name='data${questionIndex}'><span class='checkmark'></span></label><label for='corrAns0${questionIndex}' ><p>${data[questionIndex].corrAns}</p></label></div><div class='ans'><label class='labelContainer'><input type='radio' id='opt1${questionIndex}' value='' name='data${questionIndex}'><span class='checkmark'></span></label><label for='opt1${questionIndex}' ><p>${data[questionIndex].sugg1}</p></label></div><div class='ans'><label class='labelContainer'><input type='radio' id='opt2${questionIndex}' value='' name='data${questionIndex}'><span class='checkmark'></span></label><label for='opt2${questionIndex}' ><p>${data[questionIndex].sugg2}</p></label></div><div class='ans'><label class='labelContainer'><input type='radio' id='opt3${questionIndex}' value='' name='data${questionIndex}'><span class='checkmark'></span></label><label for='opt3${questionIndex}' ><p>${data[questionIndex].sugg3}</p></label></div></div></div><div class='videoContainer'><video src='${data[questionIndex].video}' controls /></div></div>`;

            mcqContainer.append(html);

        } //for loop end here

        // change the position of ans options
        let optContainer = $('.mcqWrapper #mcqWrapper .optContainer');
        $.each(optContainer, function(index, value) {
                let ansContainer = $(this).find('.ans');
                $.each(ansContainer, function(index, value) {
                    $(this).css({
                        'order': Math.floor((Math.random() * 4) + 1)
                    });
                })
            }) // end change the position of ans options

    }
    // End function to show the question

    displayQueastions();  // function call to show the questions
    let optContainer = $('.mcqWrapper #mcqWrapper .optContainer');

    // function check the answer
    function checkAnswer() {
        $('.wrong').hide();
        $('.right').hide();
        $.each(optContainer, function(index, value) {
            let mainDiv = $(this);
            let ansDiv = mainDiv.find('input');

            // loop on the array
            $.each(ansDiv, function(index, value) {
                    let inputName = $(this).attr('name');
                    let selectChecked = $("input[name=" + inputName + "]:checked");
                    let radioLength = selectChecked.length;

                    // check if the radio is not checked

                    if (radioLength > 0) {
                        if ($(this).hasClass('corrAns')) {
                            if ($(this).is(':checked')) {
                                let rightSign = $(this).parent().parent().parent().prev().find('.right');
                                rightSign.fadeIn();
                                totalCorrectAns++;
                            } else {
                                let wrongSign = $(this).parent().parent().parent().prev().find('.wrong');
                                wrongSign.fadeIn();
                            }
                        }
                    }
                })
                // end iteration
        });

    }
    // check answer function end here....

    // check answer on click
    $('#checkAns').click(function() {
            var checkIndex = 0;
            $.each(optContainer, function(index, value) {
            let mainDiv = $(this);
            let ansDiv = mainDiv.find('input');

            // loop on the array
            var check = true;
            $.each(ansDiv, function(index, value) {
                    let inputName = $(this).attr('name');
                    let selectChecked = $("input[name=" + inputName + "]:checked");
                    let radioLength = selectChecked.length;
                    checkIndex = radioLength+checkIndex;
                })
                // end iteration
        });
        console.log("no of checked element : " +checkIndex)
        let checkQuest = checkIndex / questPerPage;
        if(questionPerPage > totalQuestion){
            console.log("yese it greter than..");
            checkQuest = questionPerPage-questPerPage;
            checkQuest = totalQuestion-checkQuest;
            console.log("for last "+checkQuest);
            let checkElem = checkIndex / checkQuest;
            if(checkElem == 4){
                      $('.mcqWrapper #mcqWrapper .ans input').attr("disabled", "disabled");
        $(this).attr("disabled", "disabled").addClass('disable');
        $('#showAns').fadeIn();
        $('#nextQuest').fadeIn();
        checkAnswer();
            }else{
                $(".tooltip").fadeIn();
                setTimeout(function(){
                    $(".tooltip").fadeOut();
                },1500);
                return false;
            }   
        }
        else if (checkQuest==4){
                    $('.mcqWrapper #mcqWrapper .ans input').attr("disabled", "disabled");
        $(this).attr("disabled", "disabled").addClass('disable');
        $('#showAns').fadeIn();
        $('#nextQuest').fadeIn();
        checkAnswer();
        }else{
               $(".tooltip").fadeIn();
                setTimeout(function(){
                    $(".tooltip").fadeOut();
                },1500)
                return false;
        }
        

    })  //end check answer




    // show the all answer
    $('#showAns').click(function() {
         $(this).attr("disabled", "disabled").addClass('disable');
        
        $('.mcqWrapper #mcqWrapper .wrong').fadeOut();
        $('.mcqWrapper #mcqWrapper .right').fadeIn();
        $('.mcqWrapper #mcqWrapper .ans input').prop('checked', false);
        $('.mcqWrapper #mcqWrapper .corrAns').prop('checked', true);
    });

    // next Questions the all answer
    $('#nextQuest').click(function() {
          // check the score 
        if(questionPerPage >= totalQuestion){
           console.log(totalQuestion);
           console.log(totalCorrectAns);
           $('#tryAgain').fadeIn();
           $('.resutl').fadeIn();
           $('#showAns').fadeOut();
           $('#totalQuest').text(totalQuestion);
           $('#correctAns').text(totalCorrectAns);
           $('#checkAns').fadeOut();
           $("#mcqWrapper").fadeOut();
           $("#nextQuest").fadeOut();
           $("#incorrectAns").text(totalQuestion-totalCorrectAns);
           $("html, body").animate({ scrollTop: 0 }, 600);
           return false;
        }else{
         questionPerPage = questionPerPage + questPerPage;
        let url2 = window.location.pathname;
        console.log("The Current url is: " + url2);
        var newurl = url2 + `?data=all&qno=${questionIndex}&qpp=${questionPerPage}&ca=${totalCorrectAns}`;
        window.location.href = newurl;
        }
    });

});