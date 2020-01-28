/*A service that use a counter to keep score and return that score. */
myApp.factory('Score', [ function () {
    
    var score = {"count":0};
    var answered = {"questionsAnswered":0};
    
    var positiveFeedBack = ["Good Job", "Well Done", "Awesome"];
    var negativeFeedBack = ["You Got It Wrong", "Keep Trying", "Try Again"];
     
     return {
         
         //add one to score.count when user gets correct answer
         addScore: function(){
             score.count+= 1;
         },
         
         //add one to score.count when user gets correct answer
         addQuestionsAnswered: function(){
             answered.questionsAnswered+= 1;            
         },
         
         //return the current score
         getScore: function(){                
               return (score.count/answered.questionsAnswered)*100;
         }, 
         
         //return a random positive feedback
         getPositiveFeedBack: function(){
              return positiveFeedBack[Math.floor(Math.random() * positiveFeedBack.length)];
         },
         
         //return a random negative feedback
         getNegataiveFeedBack: function(){
              return negativeFeedBack[Math.floor(Math.random() * negativeFeedBack.length)];
         }
     }/*End of main Return*/
    
    
}]);
