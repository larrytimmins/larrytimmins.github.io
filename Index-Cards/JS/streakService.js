/*A service that use counters to keep track of student streaks. */
myApp.factory('Streak', [ function () {

    var streak = {"streak":2, "startStreak":0};
    
    return {
    
        //add one to startStreak when a user gets a correct answer
         addStartStreak: function(){
            streak.startStreak += 1;
            if(streak.startStreak >= 3){
                streak.streak += 1;
            }//end of if statement
         },

         //checks if startStreak is 3 or more, if so add to streak counter to be displayed.
         addStreak: function(){
            if(streak.startStreak >= 3){
                streak.streak += 1;
            }//end of if statement
         },//end of addStreak function
        
        //return streak.streak
        getStreak: function(){
            return streak.streak;
        },//end of getStreak function
        
        //when a student get a wrong answer, everything is reset
        resetStreak: function(){
            streak.startStreak = 0;
            streak.streak = 2;
        }//end of resetStreak function
    }//end of return 
}]);