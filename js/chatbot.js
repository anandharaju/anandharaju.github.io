var passage_data = "I am Anand. My full name is Anandharaju Durai Raju. I was born and brought up in Tamilnadu, India. "
+ "I am currently pursuing Ph.D. in Computer Science at Simon Fraser University with specialization on Data Mining, Cybersecurity and Deep Learning. "
+ "I have 7+yrs of professional work experience.I have worked in dynamic enviroments including handling new module development, change requests, handling incident response, and production support."
+ "My recent skills include Python, Tensorflow, Keras, PyTorch, Docker, and disassembler tools like Radare2. "
+ "I had undergone a year-long research based internship at Huawei aimed at identifying novel methods for malware detection from assembly information. "
+ "I have gotten certifications from Amazon Web Services, deeplearning.ai, Stanford University and Indian Institute of Technology in the domains of Cloud Computing, Deep Learning, Machine Learning and Data Science. "
+ "I have published research papers and survey papers that can be found in the Publication section. "


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