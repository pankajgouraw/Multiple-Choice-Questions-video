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
        }
     }
     // End function to show the question

     displayQueastions(); 

     setTimeout(function(){
        console.log(questionIndex);
     },2000)

     let optContainer = $('.optContainer');

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
            // console.log(inputName);
            let selectChecked  = $("input[name="+inputName+"]:checked");
            let radioLength = selectChecked.length;
            // console.log("input radio value : "+radioLength);

            // check if student dont select any field
            if(radioLength > 0){
               if($(this).hasClass('corrAns')){
                     if($(this).is(':checked')){
                        let rightSign = $(this).parent().parent().parent().prev().find('.right');
                        rightSign.fadeIn();
                        console.log(rightSign);
                        totalCorrectAns++;
                        console.log("wow you select the correct answer...");
                      }else{
                        let wrongSign = $(this).parent().parent().parent().prev().find('.wrong');
                        wrongSign.fadeIn();
                      }
                }
            }else{
                     console.log('Please complete all the question...');
            }
        })
        // end iteration
        console.log("Total correct Ans is : "+ totalCorrectAns);
    });

    }
    // check answer function end here....

    $('#checkAns').click(function(){
       checkAnswer(); 
    })


 

});