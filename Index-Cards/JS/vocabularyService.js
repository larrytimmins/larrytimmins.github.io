/*A service that provides an array of vocabulary terms and definitions to the controller */
myApp.factory('Vocabulary',  function () {
    
    // location object that points to the current location in the test array
    var currentLocation = {"location":0};
    
    var randomizeTest = [];
    
    /* Fisher-Yates shuffle used below
        shuffles: function(array){
            var currentIndex = array.length, temporayValue, randomIndex;
            
            while(0 !== currentIndex){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                temporayValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporayValue;
            }
            return array;
        }
    */        
    
    
    return {
        
        //function call by the controller to load the current term and three answers using an array
        getCurrentTest: function(data){

            var test = data;
            var currentTestArray = [];//array return to the controller with term and three answers
            
            var currentAnswerArray = [];// array to hold three answers
            var currentTestAnswers = [];// array to to hold randomize test answers

            //get the current term and correct answer
            var currentTerm  = test[currentLocation.location].term;
            var currentCorrectAnswer = test[currentLocation.location].correctAnswer;

            /*
            for(var i=0;i<test.length;i++){
                currentAnswerArray.push(test[i].correctAnswer);
            }
            */
            
            //create an array of all answers
            currentAnswerArray = test.map(function(x){return x.correctAnswer});
            
            

            //randomly pick the first answer. Keep if it doesn’t match the currentCorrectAnswer, re-pick if it matches the currentCorrectAnswer
            var firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
            while(currentCorrectAnswer==firstAnswer){
                firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
            }

            //randomly pick the second answer and keep if it doesn’t match the correct answer and first answer
            var secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
            while(currentCorrectAnswer===secondAnswer || firstAnswer === secondAnswer){
                secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
            }

            //push all answers into the currentTestAnswers as an object with a second attribute as true or false
            currentTestAnswers.push({"answer": currentCorrectAnswer, "correct":true}, {"answer": firstAnswer, "correct":false}, {"answer": secondAnswer, "correct":false});
            
            //Shuffle the currentTestAnswers array
            var currentIndex = currentTestAnswers.length, temporayValue, randomIndex;
            
            while(0 !== currentIndex){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                temporayValue = currentTestAnswers[currentIndex];
                currentTestAnswers[currentIndex] = currentTestAnswers[randomIndex];
                currentTestAnswers[randomIndex] = temporayValue;
            } 

            //add the currentTerm and the randomize array of object answers to currentTestArray
            currentTestArray.push(currentTerm);
            currentTestArray.push(currentTestAnswers);
            
            //return the currentTestArray to use in the controller
            return currentTestArray;
           
        }, // end of getCurrentTest function
        
        //similar to getCurrentTest() but for the fill in the blank tests. The focus is 
        //on returning the next test question and the entire list of answers. 
        getCurrentFillInTheBlankTest: function(data){
            
            var test = data; //gets an array of test questions and answers to use in the method.
            var currentTestArray = [];//array return to the controller with term and three answers
            
            var currentTestAnswers = [];// array to to hold test answers            
            
            //get the current term and correct answer
            var currentTerm  = test[currentLocation.location].term;
            var currentCorrectAnswer = test[currentLocation.location].correctAnswer;
            
            //create an array of all the answers. Mark as true the one correct answer and false for the rest.
            test.forEach(function(question){
                if(question.correctAnswer===currentCorrectAnswer){
                    currentTestAnswers.push({"answer": question.correctAnswer, "correct":true});
                }else {
                    currentTestAnswers.push({"answer": question.correctAnswer, "correct":false});                    
                }
            });//end of forEach loop
            
            currentTestAnswers.sort();//sort answers alphabetically
            
            //add the currentTerm, currentCorrectAnswer, and the randomize array of object answers to currentTestArray
            currentTestArray.push(currentTerm);
            currentTestArray.push(currentTestAnswers);
            currentTestArray.push(currentCorrectAnswer);
            
            //return the currentTestArray to use in the controller
            return currentTestArray;            
        },
        
        updateCurrentLocation: function(){
            currentLocation.location +=  1;
        },
        
        getCurrentLocation: function(){
            return currentLocation.location + 1;
        }, 
        
        getLengthOfArray: function(test){
            return test.length
        },
        
        randomizeTest: function(test){
            
            //Shuffle the test array
            var currentIndex = test.length, temporayValue, randomIndex;
            
            while(0 !== currentIndex){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                temporayValue = test[currentIndex];
                test[currentIndex] = test[randomIndex];
                test[randomIndex] = temporayValue;
            } 
        }

    }/*End of main Return*/
    
    //By Smiley
});