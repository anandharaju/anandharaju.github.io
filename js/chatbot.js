var passage_data = "I am Kaumil Trivedi. My name is Kaumil Trivedi. I was born on 4th of July,1997 at Ahmedabad, India. I am 24yrs old.I am currently doing Masters in Computer Science (Big Data Specialization) at Simon Fraser University. I have 2.5yrs of professional work experience.I have experience in the fields of Data Science, Machine Learning and Deep Learing. My skills include Python, Tensorflow, PyTorch, Django, Flask, MySQL, MongoDB, Docker and AWS. I have done projects on face-emotion recognition, sentiment analysis, and blogging platform. I have gotten certifications from Amazon Web Services, deeplearning.ai, Stanford University and Indian Institute of Technology in the domains of Cloud Computing, Deep Learning, Machine Learning and Data Science. I have published a paper on Hybrid Binary Classifiers using SVMs and Decision Trees. I have had the opportunity to give an interview at R3plica on AI. My previous work experience was at Areli Commerce Private Limited, Turabit Solutions Pvt Ltd and Softvan Inc. I am currently studying Professional Masters in Computing Science, Big Data Specialization."


$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});


$(document).on('click', '#new_chat', function (e) {
    var size = $(".chat-window:last-child").css("margin-left");
    size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $("#chat_window_1").clone().appendTo(".container");
    clone.css("margin-left", size_total);
});

$(document).ready(function () {
    $("#sym-microphone").toggle();
    $("#chatbot_icon").toggle();
    qna.load()
        .then(model => {
            window.value = model;
            $("#panel").fadeIn(200);
            $("#panel-footer").fadeIn(200);
            $("#chatbot_icon").toggle();
        })
        .catch((e) => {
            console.log(e);
        });
});

$(document).on('click', '.chatbot_icon', function (e) {
    $("#panel").slideToggle("medium");
    $("#panel-footer").slideToggle("medium");
});

function make_response(query) {

    window.value.findAnswers(query, passage_data).then(answers => {
        if (answers.length == 0) {
            setTimeout(respond("I am sorry my bot is unable to answer that question. Please feel free to reach me!"), 2000);
        }
        else {
            var max = 0;
            var response = "";
            answers.forEach(function (element) {
                if (max < element.text.length) {
                    max = element.text.length;
                    response = element.text;
                }
            });
            if (query.toLowerCase().includes("project")) {
                $("#link-projects")[0].click();
            }
            else if (query.toLowerCase().includes("certification")) {
                $("#link-certifications")[0].click();
            }
            else if (query.toLowerCase().includes("publication")) {
                $("#link-publications")[0].click();
            }
            else if (query.toLowerCase().includes("article")) {
                $("#link-articles")[0].click();
            }
            else if (query.toLowerCase().includes("experience")) {
                $("#link-experience")[0].click();
            }
            else if (query.toLowerCase().includes("educat")) {
                $("#link-education")[0].click();
            }
            else if (query.toLowerCase().includes("study")) {
                $("#link-education")[0].click();
            }
            else if (query.toLowerCase().includes("skill")) {
                $("#link-skills")[0].click();
            }
            setTimeout(respond(response), 1000);
        }
    });

}



// send function start  
function send() {
    var chat = $("#btn-input").val();

    if (chat == "") {
        alert('Empty input message!');
    } else {
        var body =
            '<div class="row msg_container base_sent">' +
            '<div class="col-md-10 col-xs-10 ">' +
            '<div class="messages msg_sent">' +
            '<p>' + chat + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';

        make_response(chat);
        $("#btn-input").value = "";

    }
    $(body).appendTo("#messagebody");
    $('#btn-input').val('');
    $("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight }, 'medium');

}


// send function end
$("#btn-chat").click(function () {
    send()
});

$('#btn-input').keypress(function (e) {
    if (e.which == 13) {
        send()
    }
});


//respond function start
function respond(response) {

    var body =
        '<div class="row msg_container base_receive">' +
        '<div class="col-md-10 col-xs-10">' +
        '<div class="messages msg_receive">' +
        '<p>' + response + '</p>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(body).appendTo("#messagebody");
    $('#btn-input').val('');
    $("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight }, 'medium');
}
//respond function end