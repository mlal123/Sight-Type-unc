/*jslint browser: true*/
/*global $, jQuery*/
/*global alert */
//variables
var words, key, message, currentIndex, lesson = ["Please Select a Lesson"]
    , lesson0, lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9, letterIndex, newWord, input, stringlength, letter, lessonsize, gameOverSound = document.getElementById("gameoverAudio")
    , is_it_finished;
lessonsize = 0;
currentIndex = 0;
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
    $("#messagebox").html(word[currentIndex]);
    responsiveVoice.speak(word[currentIndex], "UK English Male", {
        rate: 1.0
    });
    window.console.log(word[currentIndex]);
} // method
function displayfinish() {
    'use strict';
    $("#messagebox").html("Lesson Finished");
    currentIndex = 0;
}

function highlightword(word, start, end) {
    'use strict';
    word = "<span class= 'highlight'>" + word.substr(start, end + 1) + "</span>" + word.substr(end + 1);
    $("#messagebox").html(word);
}

function getLesson(selected_lesson) {
    'use strict';
    // displayWord(selected_lesson);
    lesson = selected_lesson;
    lessonsize = selected_lesson.length;
    stringlength = selected_lesson[currentIndex].length;
}
$(document).on('keydown', function (ev) {
    'use strict';
    // displayWord(lesson);
    if (ev.keyCode === 32) {
        $('#start').fadeOut();
        displayWord(lesson);
    }
    else if (ev.keyCode === 13) { // press enter move to next word
        if (currentIndex === lessonsize) {
            // is_it_finished = true;
            responsiveVoice.speak("This lesson is finished", "UK English Male", {
                rate: 1.0
            });
            displayfinish();
        }
        if (letterIndex === stringlength) {
            currentIndex += 1;
            letterIndex = 0;
            displayWord(lesson);
        }
        else {
            // gameOverSound.play();
            window.console.log("error");
        }
    }
    else if (ev.keyCode >= 65 && ev.keyCode <= 90) {
        var letter = String.fromCharCode(ev.keyCode);
        letter = letter.toLowerCase();
        if (letter === lesson[currentIndex][letterIndex]) {
            window.console.log("Index is " + letterIndex);
            responsiveVoice.speak(lesson[currentIndex][letterIndex], "UK English Female", {
                rate: 1.5
            });
            highlightword(lesson[currentIndex], 0, letterIndex);
            letterIndex += 1;
        }
        else {
            gameOverSound.play();
            window.console.log("error ");
        }
    }
}); //document,keydown
