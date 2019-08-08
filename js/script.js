$(function(){
     let totalQuestion = data.length;
     let totalCorrectAns = 0;
     console.log("Total no of question : "+totalQuestion);
     console.log("No of question per page : "+questionPerPage);
     $('.logo h3').append(header);
     $('body').css({'background':bgColor});
     let mcqWrapper = $('.mcqWrapper');
     let mcqContainer = $('#mcqWrapper');
     mcqWrapper.css({'border':borderColor});
     let questionIndex=0; 




     // function to show the question
     function displayQueastions(){
        for(questionIndex; questionIndex < questionPerPage; questionIndex++ ){
            if(questionIndex > totalQuestion-1){
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

        }   //for loop end here

        // change the position of ans options
        let optContainer = $('.mcqWrapper #mcqWrapper .optContainer');
        $.each(optContainer,function(index, value){
            let ansContainer = $(this).find('.ans');
            $.each(ansContainer,function(index,value){
                $(this).css({'order':Math.floor((Math.random() * 4) + 1)});
            })
        })   // end change the position of ans options

     }
     // End function to show the question

     displayQueastions(); 

     setTimeout(function(){
        console.log(questionIndex);
     },2000)

     let optContainer = $('.mcqWrapper #mcqWrapper .optContainer');

     // function check the answer
     function checkAnswer(){
      $('.wrong').hide();
      $('.right').hide();
     $.each(optContainer, function( index, value ) {
        let mainDiv = $(this);
        let ansDiv = mainDiv.find('input');
        
        // loop on the array
        $.each(ansDiv, function(index, value){
            let inputName = $(this).attr('name');
            console.log(value);
            console.log("input tag name: "+inputName);
            let selectChecked  = $("input[name="+inputName+"]:checked");
            console.log("selected checkbox: "+selectChecked);
            let radioLength = selectChecked.length;
            // console.log("radio checked lenght :"+radioLength);
            // console.log("input radio value : "+radioLength);

            // check if student dont select any field
            if(radioLength > 0){
               if($(this).hasClass('corrAns')){
                     if($(this).is(':checked')){
                        let rightSign = $(this).parent().parent().parent().prev().find('.right');
                        // console.log(rightSign)
                        rightSign.fadeIn();
                        totalCorrectAns++;
                        console.log("wow you select the correct answer...");
                      }else{
                        let wrongSign = $(this).parent().parent().parent().prev().find('.wrong');
                        wrongSign.fadeIn();
                        // console.log(wrongSign);
                      }
                }
            }else{
                    console.log("Please Complete all the questions!");
            }
        })
        // end iteration
        console.log("Total correct Ans is : "+ totalCorrectAns);
    });

    }
    // check answer function end here....

   // check answer on click
    $('#checkAns').click(function(){
        $('.mcqWrapper #mcqWrapper .ans input').attr("disabled","disabled");
        // $(this).attr( "disabled", "disabled" );
        $('#showAns').fadeIn();
        $('#nextQuest').fadeIn();
       checkAnswer(); 
    })
    

    // show the all answer
    $('#showAns').click(function(){
          $('.mcqWrapper #mcqWrapper .wrong').fadeOut();
          $('.mcqWrapper #mcqWrapper .right').fadeIn();
          $('.mcqWrapper #mcqWrapper .ans input').prop('checked', false);
          $('.mcqWrapper #mcqWrapper .corrAns').prop('checked', true);
    });

        // next Questions the all answer
    $('#nextQuest').click(function(){
        $('#showAns').fadeOut();
        $('#nextQuest').fadeOut();
        $('#checkAns').removeAttr('disabled');
        mcqContainer.empty();
        questionPerPage+= 5;
        displayQueastions();
    });


   // $('input').click(function(){
   //  console.log("workign..");
   // })

   // $('body #mcqWrapper').on('click', 'input', function() {
   //     console.log("its done...")
   // });

});