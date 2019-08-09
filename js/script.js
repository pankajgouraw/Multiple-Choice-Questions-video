$(function() {
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

    // function to show the question
    function displayQueastions() {
        for (questionIndex; questionIndex < questionPerPage; questionIndex++) {
            if (questionIndex > totalQuestion - 1) {
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
            let html = `<div class='questionContainer'>
               <div class='questOptContainer'>
                  <div class='questContainer'>
                     <h3 class='question'>${data[questionIndex].question}
                         <img src='img/right.png'  class='right' />
                         <img src='img/wrong.png'  class='wrong' />
                     </h3>
                  </div>
                  <div class='optContainer'>
                     <div class='ans'>
                        <label class='labelContainer'>
                        <input type='radio' id='corrAns0${questionIndex}' class="corrAns" value='' name='data${questionIndex}'>
                        <span class='checkmark'></span>
                        </label>
                        <label for='corrAns0${questionIndex}' >
                           <p>${data[questionIndex].corrAns}</p>
                        </label>
                     </div>
                     <div class='ans'>
                        <label class='labelContainer'>
                        <input type='radio' id='opt1${questionIndex}' value='' name='data${questionIndex}'>
                        <span class='checkmark'></span>
                        </label>
                        <label for='opt1${questionIndex}' >
                           <p>${data[questionIndex].sugg1}</p>
                        </label>
                     </div>
                     <div class='ans'>
                        <label class='labelContainer'>
                        <input type='radio' id='opt2${questionIndex}' value='' name='data${questionIndex}'>
                        <span class='checkmark'></span>
                        </label>
                        <label for='opt2${questionIndex}' >
                           <p>${data[questionIndex].sugg2}</p>
                        </label>
                     </div>
                     <div class='ans'>
                        <label class='labelContainer'>
                        <input type='radio' id='opt3${questionIndex}' value='' name='data${questionIndex}'>
                        <span class='checkmark'></span>
                        </label>
                        <label for='opt3${questionIndex}' >
                           <p>${data[questionIndex].sugg3}</p>
                        </label>
                     </div>
                  </div>
               </div>
               <div class='videoContainer'>
                    <video src='${data[questionIndex].video}' controls />
               </div>
            </div>`;

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

    // setTimeout(function() {
    //     console.log(questionIndex);
    // }, 2000)

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
                                // console.log("wow you select the correct answer...");
                            } else {
                                let wrongSign = $(this).parent().parent().parent().prev().find('.wrong');
                                wrongSign.fadeIn();
                            }
                        }
                    } else {
                        console.log("Please Complete all the questions!");
                    }
                })
                // end iteration
        });

    }
    // check answer function end here....

    // check answer on click
    $('#checkAns').click(function() {

        $('.mcqWrapper #mcqWrapper .ans input').attr("disabled", "disabled");
        $(this).attr("disabled", "disabled");
        $('#showAns').fadeIn();
        $('#nextQuest').fadeIn();
        checkAnswer();
    })

    // show the all answer
    $('#showAns').click(function() {
        $('.mcqWrapper #mcqWrapper .wrong').fadeOut();
        $('.mcqWrapper #mcqWrapper .right').fadeIn();
        $('.mcqWrapper #mcqWrapper .ans input').prop('checked', false);
        $('.mcqWrapper #mcqWrapper .corrAns').prop('checked', true);
    });

    // next Questions the all answer
    $('#nextQuest').click(function() {

        questionPerPage = questionPerPage + questPerPage;
        let url2 = window.location.pathname;
        console.log("The Current url is: " + url2);
        var newurl = url2 + `?data=all&qno=${questionIndex}&qpp=${questionPerPage}&ca=${totalCorrectAns}`;
        window.location.href = newurl;

    });

});