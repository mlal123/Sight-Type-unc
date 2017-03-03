/*global $, jQuery*/
/*global alert */
//variables
var words, key, message, lessonIndex, lesson = ["Please Select a Lesson"]
    , lesson0, lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9, letterIndex, newWord, input, stringlength, letter, lessonsize, gameOverSound = document.createElement('audio')
    , is_it_finished, selectedList, listIndex, last_key_was_arrow, lastkey, firstload;
gameOverSound.src = "https://www.cs.unc.edu/~gb/uploaded-files/mlal123@CS.UNC.EDU/76376__spazzo-1493__game-over.wav";
lessonsize = 0;
lessonIndex = 0;
letterIndex = 0;
stringlength = 0;
listIndex = 0;
is_it_finished = false;
last_key_was_arrow = false;
firstload = true;
lesson1 = ["f", "ff", "fff"];
lesson2 = ["j", "j", "jj", "jj", "jjj", "jjj"];
lesson3 = ["fj", "fj", "fj", "fjfj", "fjfj"];
lesson4 = ["jf", "jf", "jf", "jfjf", "jfjf"];
lesson5 = ["fg", "fg", "fg", "fgf", "fgf", "fgfg", "fgfg"];
lesson6 = ["jh", "jh", "jh", "jhj", "jhj", "jhjh", "jhjh"];
lesson7 = ["fgj", "fgj", "fgj", "fgj"];
lesson8 = ["jhf", "jhf", "jhf", "jhf"];
lesson9 = ["fjgh", "fjgh", "fjgh"];
lesson10 = ["fgjh", "fgjh", "fgjh"];

function highlightLesson(index) {
    selectedList = "#lesson-" + index;
    $('.highlighted').removeClass('highlighted');
    $(selectedList).addClass('highlighted');
    responsiveVoice.speak("You are at Lesson " + index, "UK English Male", {
        rate: 1.0
    });
}

function thislesson(num) {
    if (num === 1) {
        lesson = lesson1;
    }
    if (num === 2) {
        lesson = lesson2;
    }
    if (num === 3) {
        lesson = lesson3;
    }
    if (num === 4) {
        lesson = lesson4;
    }
    if (num === 5) {
        lesson = lesson5;
    }
    if (num === 6) {
        lesson = lesson6;
    }
    if (num === 7) {
        lesson = lesson7;
    }
    if (num === 8) {
        lesson = lesson8;
    }
    if (num === 9) {
        lesson = lesson9;
    }
    if (num === 10) {
        lesson = lesson10;
    }
}

function reset() {
    is_it_finished = false;
    lesson = ["Please Select a Lesson"];
}

function displayWord(word) {
    'use strict';
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
    reset();
}

function highlightword(word, start, end) {
    'use strict';
    word = "<span class= 'highlight'>" + word.substr(start, end + 1) + "</span>" + word.substr(end + 1);
    $("#messagebox").html(word);
}

function playSound() {
    'use strict';
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

function is_it_arrow(s) {
    if (s === 37 || s === 38 || s === 39 || s === 40) {
        last_key_was_arrow = true;
    }
    else {
        last_key_was_arrow = false;
    }
}
$(document).on('keydown', function (ev) {
    'use strict';
    var letter = String.fromCharCode(ev.keyCode);
    var key = ev.keyCode;
    // displayWord(lesson);
    if (!is_it_finished) {
        displayWord(lesson);
        is_it_finished = true;
    }
    else {
        if (ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40) {
            if (firstload) {
                var a = document.getElementById("lesson-1");
                a.className += "highlighted";
                firstload = false;
            }
            if (ev.which === 40 || ev.which === 39) {
                // window.console.log("key pressed is down arow or right arrow and listIndex is " + listIndex);
                if (listIndex < 10) {
                    listIndex++;
                    highlightLesson(listIndex);
                    lastkey = key;
                    is_it_arrow(lastkey);
                    thislesson(listIndex);
                }
            }
            else if (ev.which === 38 || ev.which === 37) {
                //window.console.log("Key pressed is up arrow or left arrow and listIndex is " + listIndex);
                if (listIndex > 1) {
                    listIndex--;
                    highlightLesson(listIndex);
                    lastkey = key;
                    is_it_arrow(lastkey);
                    thislesson(listIndex);
                }
            }
        } // arrows
        else if (ev.keyCode === 13) { // press enter move to next word
            if (last_key_was_arrow) {
                getLesson(lesson);
            } // end of lesson
            else if (lessonIndex === (lessonsize - 1) && last_key_was_arrow === false) {
                // is_it_finished = true;
                lessonIndex = 0;
                lastkey = key;
                is_it_arrow(lastkey);
                displayfinish();
            }
            else if (letterIndex === stringlength && last_key_was_arrow === false) {
                lessonIndex += 1;
                letterIndex = 0;
                stringlength = lesson[lessonIndex].length;
                displayWord(lesson);
                lastkey = key;
                is_it_arrow(lastkey);
            }
            else {
                playSound();
                // window.console.log("Lesson Index was " + lessonIndex + " and you should have pressed " + lesson[lessonIndex][letterIndex]);
                lastkey = key;
                is_it_arrow(lastkey);
            }
        }
        else if (ev.keyCode >= 65 && ev.keyCode <= 90) {
            letter = letter.toLowerCase();
            if (letter === lesson[lessonIndex][letterIndex]) {
                //   window.console.log("Letter Index is " + letterIndex + " and lesson Index was " + lessonIndex);
                //   window.console.log("You pressed " + letter + " the key was supposed to be " + lesson[lessonIndex][letterIndex] + " letter index was " + letterIndex);
                responsiveVoice.speak(lesson[lessonIndex][letterIndex], "UK English Female", {
                    rate: 1.5
                });
                highlightword(lesson[lessonIndex], 0, letterIndex);
                letterIndex += 1;
                lastkey = key;
                is_it_arrow(lastkey);
            }
            else {
                playSound();
                lastkey = key;
                is_it_arrow(lastkey);
            }
        }
    }
});
