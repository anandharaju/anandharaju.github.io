var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();


recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var textbox = $("#btn-input");
var content = '';
recognition.onstart = function(){
    $("#sym-microphone").toggle("fast");
    content = $("#btn-input").val();
}

recognition.onend = function(){
    $("#sym-microphone").toggle("fast");
}

recognition.onresult = function(event){
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;

    content += transcript;

    textbox.val(content);
}

// voice function start  
function voice(){

    if (content.length){
        content += ''
    }

    recognition.start()
}


// voice function end




$( "#btn-microphone" ).click(function() {
    voice();
}); 