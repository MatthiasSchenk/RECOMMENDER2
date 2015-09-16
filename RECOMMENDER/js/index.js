var wordArray = ["Pizza", "Italienisch", "Spaghetti", "Scheinebraten", "Grillen", "Backen"];

$(document).ready(function(){
    showMostSearchedWords();
})

function showMostSearchedWords(){
    $("#tagCloud").tx3TagCloud({
        multiplier: 2
    });

}

