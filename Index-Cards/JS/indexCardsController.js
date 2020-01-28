myApp.controller('indexCardsController',  function($scope, Vocabulary, Score, Data, Streak, TopScore){

    //initial score value
    $scope.score = 0;    
    
    //setup variable to hide Finish screen
    $scope.landingPage = true;
    
    //setup variable to hide the fill in the blank test
    $scope.fillInBlank = false;
        
    //setup variable to hide Finish screen
    $scope.finish = false;

    //get length of the test array to determine when test is finish in the continue function
    $scope.endOfTest= 0;
    
    //initialize the variable to hold the vocabulary terms and answers
    $scope.testData = [];
    
    //initial setup of what type of test ui to show
    $scope.typeOfTest = "MC";    
    
    //initial variable to show student streak
    $scope.streak = 0;
    
    //initial variable that hold test title to use with the topScore service
    $scope.topScoreTestName = "";
    
    //initial variable that is display to the student the highest recorded score for that test
    $scope.topScore = 0;
	
	//initial variable that returns false if there is no current test stored in local storage based off of topscore
	$scope.noTopScore = false;
    
    //set up flashing score as false
    $scope.flashingScore = false;
    
    //sets up the index cards for Multiple Choice test with the backend data
    $scope.setupIndexCards = function(){    
        
        //get current index card
        $scope.currentTest = Vocabulary.getCurrentTest($scope.testData);

        //get the current location in the test array
        $scope.currentQuestionNumber = Vocabulary.getCurrentLocation();

        //get the current question from the test array
        $scope.currentQuestion = $scope.currentTest[0];

        //get the current array of answers from the test array
        $scope.currentAnswers = $scope.currentTest[1];
        
        //get a random positive Feedback to show when a correct answer is chosen
        $scope.positiveFeedBack = Score.getPositiveFeedBack();
        
        //get a random negative Feedback to show when a incorrect answer is chosen
        $scope.negativeFeedBack = Score.getNegataiveFeedBack();
        
        //Change the app UI screen from the landing page to the Q & A.
        $scope.landingPage = false;
    }
    
    //sets up the index cards for Fill in the Blank test with the backend data
    $scope.setupIndexCardsBlank = function(){    
        
        //get current index card
        $scope.currentTest = Vocabulary.getCurrentFillInTheBlankTest($scope.testData);

        //get the current location in the test array
        $scope.currentQuestionNumber = Vocabulary.getCurrentLocation();

        //get the current question from the test array
        $scope.currentQuestion = $scope.currentTest[0];

        //get the current array of answers from the test array
        $scope.currentAnswers = $scope.currentTest[1];
        
        //get the current correct answer from the test array
        $scope.correctAnswers = $scope.currentTest[2];        
        
        //get a random positive Feedback to show when a correct answer is chosen
        $scope.positiveFeedBack = Score.getPositiveFeedBack();
        
        //get a random negative Feedback to show when a incorrect answer is chosen
        $scope.negativeFeedBack = Score.getNegataiveFeedBack();
        
        //Change the app UI screen from the landing page to the Q & A.
        $scope.landingPage = false;
    }    
    
    //set the showCorrectAnswer varible to false at startup
    $scope.showCorrectAnswer = false;
    
    //set the showIncorrectAnswer varible to false at startup
    $scope.showIncorrectAnswer = false;
    
    $scope.showButtons = false;
    
    //function used in the radio button to save the answer to the selected radio value (eighter true or false based on the current answer correct property)
    $scope.select= function(x){
        $scope.correct = x;
    }//end of select function 
    
    //retrieve the old streak number. If more then 3, then show the animated streak feature
    $scope.animateStreak = function(){
        $scope.oldStreak = Streak.getStreak();
        if($scope.oldStreak >= 3){
            $scope.animateFlipStreak = true;
        }
    }
    
    //method to end the streak feature if user choose incorrectly
    $scope.endAnimateStreak = function(){
        $scope.animateFlipStreak = false;
    }
    
    //function for the "finish" button. The user press this button after each question.
    $scope.done = function(){
        //update Score service that a question has been answered
        Score.addQuestionsAnswered();
        
        //hides the done button and show the continue button
        $scope.showButtons = true;

        //test if the chosen answer is true for mulitple choice and fill in the blank type tests        
        if($scope.correct==true || $scope.correct.correct){
            //show the correct answer celebrations
            $scope.showCorrectAnswer = true;
            //update the Score service that a question has been answered correctly
            Score.addScore();
            
            //add to the addStreak counter, if more then 3 add to streak counter
            Streak.addStartStreak();
            
            //update streak variable 
            $scope.streak = Streak.getStreak();
            
            //show the animated streak feature if 3 or more correct answers
            $scope.animateStreak();
        }else {
            // show the incorrect answer celebrations
            $scope.showIncorrectAnswer= true;
            
            //reset streak
            Streak.resetStreak();
            
            //update streak variable 
            $scope.streak = Streak.getStreak();            
        }
        //update the score
        $scope.score = Score.getScore();
        
        //student score start flashing
        $scope.flashingScore = true;
    }//end of done function
    
    $scope.continue = function(){
        if($scope.currentQuestionNumber >= $scope.endOfTest){
            //switch the student view from the test to the final score screen
            $scope.finish = true;
            
            //saved the current test score to the local storage
            TopScore.setTestScores($scope.topScoreTestName,$scope.score);
        }else {    
            $scope.showButtons = false;
            $scope.showCorrectAnswer = false;
            $scope.showIncorrectAnswer = false;
            $scope.animateFlipStreak = false; //reset the streak flipping animation
            $scope.flashingScore = false; //reset the flashing score animation

            //Change the location controller the next number
            Vocabulary.updateCurrentLocation();

            if($scope.typeOfTest=="MC"){
                //get the next vocabulary question and answer for mulitple choice    
                $scope.setupIndexCards();            
            }else{
                // get the next vocabulary questions and answers for fill in the blank
                $scope.setupIndexCardsBlank();
            }
            
        }//end of else statement
    }//end of continue function
    
    //restart the app by reloading the browser page
    $scope.restart = function(){
        location.reload();
    }
    
    $scope.loadTest = function(requestedTest, testType){
        //gets the vocabulary terms from the Data service to be loaded into the app.
        $scope.testData = Data.getData(requestedTest)
        
        //assign test name to variable to use with topScore service feature
        $scope.topScoreTestName = requestedTest;
        
        //if a score is already set, assign and display to student
        $scope.topScore = TopScore.getTestScores($scope.topScoreTestName);
		
		//test if there is a score, and if so show the top score element
		if($scope.topScore !== null)
			$scope.noTopScore = true;
		
        //Test if type of test is multiple choice or fill in the blank
        if(testType=='MS')            
            //set up practice test as a multiple choice
            $scope.multipeChoice();
        
        if(testType=='FB')
            //set up practice test as a fill in the blank
            $scope.fillInBlankTest();
    }
    
    //function to setup a multiple choice test
    $scope.multipeChoice = function(){
        //randomize test questions
        Vocabulary.randomizeTest($scope.testData);
        
        //get length of the test array to determine when test is finish in the continue function
        $scope.endOfTest = Vocabulary.getLengthOfArray($scope.testData);  
        //Method that gets the vocab. data from the Data service, chosen by the user, and starts the app
        $scope.setupIndexCards();
        
        //Change the app UI screen from the landing page to the Q & A.
        $scope.landingPage = false;
        
        // assign the type of test to mulitple choice
        $scope.typeOfTest = "MC";        
    }
    
    //setup the practice test as a fill in the blank
    $scope.fillInBlankTest = function(){
        //randomize test questions
        Vocabulary.randomizeTest($scope.testData);
        
        //get length of the test array to determine when test is finish in the continue function
        $scope.endOfTest = Vocabulary.getLengthOfArray($scope.testData); 
        
        //Method that gets the vocab. data from the Data service, chosen by the user, and starts the app
        $scope.setupIndexCardsBlank();
        
        //Change the app UI screen from the landing page to the Q & A.
        $scope.landingPage = false; 
        
        //Change the app UI screen from the landing page to the Q & A.
        $scope.fillInBlank = true;
        
        //change the type of test ui to show
        $scope.typeOfTest = "FB";        
    }
    
});//end of indexCardsController