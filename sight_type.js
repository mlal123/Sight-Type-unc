/*global $, jQuery*/
/*global alert */
//variables
//Copyright© 2016 Mangza Lal protected by law
var words, key, message, lessonIndex, lesson = ["Please Select a Lesson"]
    , lesson0, lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9, letterIndex, newWord, input, stringlength, letter, lessonsize, gameOverSound = document.createElement('audio')
    , is_it_finished, selectedList, listIndex, last_key_was_arrow, lastkey, firstload;
gameOverSound.src = "https://www.cs.unc.edu/~gb/uploaded-files/mlal123@CS.UNC.EDU/76376__spazzo-1493__game-over.wav";
var yo = {
    //row 1 = ~, 1, 2 , 3, 4, 5, 6, 7, 8, 9, 0, -, =, backspace
    //number + 1 <= 14
    192: 0
    , 49: 1
    , 50: 2
    , 51: 3
    , 52: 4
    , 53: 5
    , 54: 6
    , 55: 7
    , 56: 8
    , 57: 9
    , 48: 10
    , 189: 11
    , 187: 12
    , 8: 13, // row 2 = tab, q, w, e, r, t, y, u, i, o, p, [, ], \
    // number + 1 <= 28
    9: 33
    , 81: 34
    , 87: 35
    , 69: 36
    , 82: 37
    , 84: 38
    , 89: 39
    , 85: 40
    , 73: 41
    , 79: 42
    , 80: 43
    , 219: 44
    , 221: 45
    , 220: 46, //row 3 = caps, a, s, d, f, g, h, j, k, l, ;, ', enter
    //number + 1 <= 41
    20: 66
    , 65: 67
    , 83: 68
    , 68: 69
    , 70: 70
    , 71: 71
    , 72: 72
    , 74: 73
    , 75: 74
    , 76: 75
    , 186: 76
    , 222: 77
    , 13: 78, //row 4 = shift, z, x, c, v, b,     n, m, comma, period, forward 
    // number + 1 <= 52
    16: 98
    , 90: 99
    , 88: 100
    , 67: 101
    , 86: 102
    , 66: 103
    , 78: 104
    , 77: 105
    , 188: 106
    , 190: 107
    , 191: 108, // row 5 = control, alt, space, alt, control
    17: 128
    , 18: 129
    , 32: 130
};
window.console.log("i " + yo[73]);

function location1(desired, actual) {
    'use strict';
    //var row1, row2;
    window.console.log(thiskey);
    var desiredkey = yo[desired];
    var actualkey = yo[actual];
    var thiskey = Math.abs(actualkey - desiredkey);
    window.console.log("desired key is " + desiredkey + " and actual key is " + actualkey);
    if ((actualkey - desiredkey) >= 20) {
        responsiveVoice.speak("Go up a row", "UK English Male", {
            rate: 1.0
        });
    }
    else if ((actualkey - desiredkey) <= (-20)) {
        responsiveVoice.speak("Go down a row", "UK English Male", {
            rate: 1.0
        });
    }
    else {
        if (actualkey < desiredkey) {
            // go right
            responsiveVoice.speak("The key is" + thiskey + "to the right", "UK English Male", {
                rate: 1.0
            });
        }
        else if (actualkey > desiredkey) {
            //go left
            responsiveVoice.speak("The key is" + thiskey + "to the left", "UK English Male", {
                rate: 1.0
            });
        }
    }
    // row 1
}
lessonsize = 0;
lessonIndex = 0;
letterIndex = 0;
stringlength = 0;
listIndex = 0;
is_it_finished = false;
last_key_was_arrow = false;
firstload = true;
lesson1 = ["F", "FF", "FFF"];
lesson2 = ["J", "JJ", "JJJ"];
lesson3 = ["ABC", "DEF", "GHI", "JKL", "MNO"];
lesson4 = ["PQR", "STU", "VWX", "YZ"];
lesson5 = ["CAT", "DOG", "COW", "HAT", "MAT", "CHI", "LOW"];
lesson6 = ["MIKE", "JOHN", "JAKE", "CHRIS", "JESS", "CARL", "JOSH"];
lesson7 = ["FIRE", "EARTH", "WATER", "WIND"];
lesson8 = ["MOTORCYCLE", "FIRETRUCK", "AIRPLANE"];
lesson9 = ["UNC ROCKS", "DUKE SUCKS", "LEAGUE OF LEGENDS", "WHAT A TIME TO BE ALIVE", "I LIKE CATS", "I LIKE DOGS"];
lesson10 = ["I WANNA KNOW HAVE YOU EVER SEEN THE RAIN", "MICHAEL JORDAN IS THE BEST BASKETBALL PLAYER EVER", "THIS LOVE HAS TAKEN ITS TOLL ON ME", "UNC IS THE BEST SCHOOL EVER", "PETER PIPER PICKED A PECK OF PICKLED PEPPERS"];

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
    'use strict';
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
    // displayWord(lesson);
    if (!is_it_finished) {
        displayWord(lesson);
        is_it_finished = true;
    }
    else {
        var letter = String.fromCharCode(ev.keyCode);
        var key = ev.keyCode;
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
            else if (lessonIndex === (lessonsize - 1) && (letterIndex === stringlength) && last_key_was_arrow === false) {
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
                location1(lesson[lessonIndex][letterIndex].charCodeAt(), key);
                // window.console.log("Lesson Index was " + lessonIndex + " and you should have pressed " + lesson[lessonIndex][letterIndex]);
                lastkey = key;
                is_it_arrow(lastkey);
            }
        }
        else if (ev.keyCode >= 0 && ev.keyCode <= 250) {
            // letter = letter.toLowerCase();
            window.console.log(letter);
            if (letter === lesson[lessonIndex][letterIndex]) {
                responsiveVoice.speak(lesson[lessonIndex][letterIndex], "UK English Female", {
                    rate: 1.5
                });
                highlightword(lesson[lessonIndex], 0, letterIndex);
                letterIndex += 1;
                lastkey = key;
                is_it_arrow(lastkey);
                window.console.log("letterIndex " + letterIndex);
            }
            else {
                location1(lesson[lessonIndex][letterIndex].charCodeAt(), key);
                lastkey = key;
                is_it_arrow(lastkey);
            }
        }
    }
});
