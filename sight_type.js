/*jslint browser: true*/
/*global $, jQuery*/
/*global alert */
//variables
var words, key, message, lessonIndex, lesson = ["Please Select a Lesson"]
    , lesson0, lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9, letterIndex, newWord, input, stringlength, letter, lessonsize, gameOverSound = document.createElement('audio')
    , is_it_finished;
gameOverSound.src = "https://www.cs.unc.edu/~gb/uploaded-files/mlal123@CS.UNC.EDU/76376__spazzo-1493__game-over.wav";
lessonsize = 0;
lessonIndex = 0;
letterIndex = 0;
stringlength = 0;
is_it_finished = false;
lesson0 = ["f", "ff", "fff"];
lesson1 = ["j", "j", "jj", "jj", "jjj", "jjj"];
lesson2 = ["fj", "fj", "fj", "fjfj", "fjfj"];
lesson3 = ["jf", "jf", "jf", "jfjf", "jfjf"];
lesson4 = ["fg", "fg", "fg", "fgf", "fgf", "fgfg", "fgfg"];
lesson5 = ["jh", "jh", "jh", "jhj", "jhj", "jhjh", "jhjh"];
lesson6 = ["fgj", "fgj", "fgj", "fgj"];
lesson7 = ["jhf", "jhf", "jhf", "jhf"];
lesson8 = ["fjgh", "fjgh", "fjgh"];
lesson9 = ["fgjh", "fgjh", "fgjh"];

function displayWord(word) {
    'use strict';
    window.console.log("string length is " + stringlength + " and lesson size is " + lessonsize);
    window.console.log("displayWord is " + word[lessonIndex] + " and lesson Index is " + lessonIndex + ", letter index is " + letterIndex);
    window.console.log(word);
    responsiveVoice.speak(word[lessonIndex], "UK English Male", {
        rate: 1.0
    });
    $("#messagebox").html(word[lessonIndex]);
} // method
function displayfinish() {
    'use strict';
    responsiveVoice.speak("This lesson is finished", "UK English Male", {
        rate: 1.0
    });
    $("#messagebox").html("THIS LESSON IS FINISHED ");
}

function highlightword(word, start, end) {
    'use strict';
    word = "<span class= 'highlight'>" + word.substr(start, end + 1) + "</span>" + word.substr(end + 1);
    $("#messagebox").html(word);
}

function playSound() {
    'use strict';
    window.console.log("sound is playing");
    gameOverSound.play();
}

function getLesson(selected_lesson) {
    'use strict';
    lessonIndex = 0;
    letterIndex = 0;
    displayWord(selected_lesson);
    stringlength = selected_lesson[lessonIndex].length;
    lesson = selected_lesson;
    lessonsize = selected_lesson.length;
    // window.console.log("string length is " + stringlength + " and lesson size is " + lessonsize);
}
$(document).on('keydown', function (ev) {
    'use strict';
    // displayWord(lesson);
    if (!is_it_finished) {
        displayWord(lesson);
        is_it_finished = true;
    }
    else if (ev.keyCode === 13) { // press enter move to next word
        if (lessonIndex === (lessonsize - 1)) {
            // is_it_finished = true;
            lessonIndex = 0;
            displayfinish();
        }
        else if (letterIndex === stringlength) {
            lessonIndex += 1;
            letterIndex = 0;
            stringlength = lesson[lessonIndex].length;
            displayWord(lesson);
        }
        else {
            playSound();
            window.console.log("Lesson Index was " + lessonIndex + " and you should have pressed " + lesson[lessonIndex][letterIndex]);
            //window.console.log(")
        }
    }
    else if (ev.keyCode >= 65 && ev.keyCode <= 90) {
        var letter = String.fromCharCode(ev.keyCode);
        letter = letter.toLowerCase();
        if (letter === lesson[lessonIndex][letterIndex]) {
            window.console.log("Letter Index is " + letterIndex + " and lesson Index was " + lessonIndex);
            window.console.log("You pressed " + letter + " the key was supposed to be " + lesson[lessonIndex][letterIndex] + " letter index was " + letterIndex);
            responsiveVoice.speak(lesson[lessonIndex][letterIndex], "UK English Female", {
                rate: 1.5
            });
            highlightword(lesson[lessonIndex], 0, letterIndex);
            letterIndex += 1;
        }
        else {
            playSound();
            window.console.log("You pressed " + letter + " the key was supposed to be " + lesson[lessonIndex][letterIndex] + " letter index was " + letterIndex);
            window.console.log("error ");
        }
    }
});
