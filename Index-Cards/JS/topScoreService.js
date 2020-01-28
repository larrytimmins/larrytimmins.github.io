/*A service that saves or retrieves the last scored saved to local storage and displayed to user*/
myApp.factory('TopScore', ['$window', function ($window) {
    
    var highestScore;
    
    return {
    
        //get the test score from the local storage it doesn't equal undefined       
        getTestScores: function(testname){
            if($window.localStorage.getItem(testname) !== undefined)
                highestScore = $window.localStorage.getItem(testname);
                return highestScore;
        },
        
        //replace test score if highestScore equal null or the new score is better then highestScore
        setTestScores: function(testName, testScore){
            if(highestScore = null || highestScore <= testScore){
                $window.localStorage.setItem(testName,testScore);
            }
                
        }
    }//end of return 
}]);