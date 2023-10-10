$(document).ready(function () {
    $('.icon-1').addClass('muncul');
    $('.title-invitation').addClass('muncul');
    $('.icon-2').addClass('muncul');
    $('.desktop-view').hide();
    $('.playmusic').hide();

    showGreating();
});

function initMap() {
    var mapProp = {
        center: new google.maps.LatLng(-8.441672, 115.259476),
        zoom: 18,
    };
    var map = new google.maps.Map(
        document.getElementById("googleMap"),
        mapProp
    );
    new google.maps.Marker({
        position: {
            lat: -8.441672,
            lng: 115.259476,
        },
        map: map,
        title: `Br. Peliatan, Desa Kelusa, Kec. Payangan, Kab. Gianyar`,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });
}

$(".carousel").carousel({
    interval: 3000,
});

$(".caraousel").carousel({
    interval: 3000,
});

// Set the date we're counting down to
var countDownDate = new Date("Oct 19, 2023 15:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    var text = `
    <div class="row align-items-center timer-content">
        <div class="col-1">
        </div>
        <div class="col-10 row text-center">
            <div class="col-3 text-center count-days p-2">
                <div class="text-center">
                    ${("0" + days).slice(-2)}
                </div>
                <div class="title-gold">Hari</div>
            </div>
            <div class="col-3 text-center title-white-big p-2">
                <div class="text-center">
                    ${("0" + hours).slice(-2)}
                </div>
                <div class="title-white">Jam</div>
            </div>
            <div class="col-3 text-center count-minutes p-2">
                <div class="text-center">
                    ${("0" + minutes).slice(-2)}
                </div>
                <div class="title-gold">Menit</div>
            </div>
            <div class="col-3 text-center count-second title-white-big p-2">
                <div class="text-center">
                    ${("0" + seconds).slice(-2)}
                </div>
                <div class="title-white">Detik</div>
            </div>
        </div>
        <div class="col-1">
        </div>
    </div>`;
    document.getElementById("timer").innerHTML = text;

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

$('.open-button').on('click', function() {
    $('.initial-container').hide(500);

    setInterval(function() {
        $('.desktop-view').show(1000);
        $('.playmusic').show();
    }, 200);
});

$('.write-great').on('click', function () {
    $('.greting-list').removeClass('active');
    $('.greting-list').addClass('unactive');
    $(this).addClass('active');
    $(this).removeClass('unactive');

    $('.form-greating').show();
    $('.list-greating').hide(500);
});

$('.greting-list').on('click', function () {
    $('.write-great').removeClass('active');
    $('.write-great').addClass('unactive');
    $(this).addClass('active');
    $(this).removeClass('unactive');

    $('.form-greating').hide(500);
    $('.list-greating').show(500);
    // showGreating();
});

const audio = document.getElementById("myAudio");

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

$(window).scroll(function () {
    const wScroll = $(this).scrollTop();

    if (wScroll > $('.title-invitation').offset().top - 600) {
        $('.couple-name').addClass('muncul');
        $('.separator-icon').addClass('muncul');
        $('.date-ceremony').addClass('muncul');
    }

    if (wScroll > $('#profile-wedding').offset().top - 600) {
        $('.icon-3').addClass('muncul');
        $('.greating').addClass('muncul');
        $('.text-greating').addClass('muncul');
    }

    if (wScroll > $('#profile-wedding').offset().top - 500) {
        $('.profile-man').addClass('muncul');
    }

    if (wScroll > $('.time-ceremony-side').offset().top - 600) {
        $('.icon-3-time').addClass('muncul');
        $('.time-ceremony').addClass('muncul');
        $('.invitation-text').addClass('muncul');
    }

    if (wScroll > $('.thanks-givings').offset().top - 600) {
        $('.thanks-givings').addClass('muncul');
    }

    if (wScroll > $('.time-count-backward').offset().top - 600) {
        $('.time-count-backwards').addClass('muncul');
    }
});

$('#musicplayer').on('click', function () {
    const classNamed = this.className;
    const realClass = classNamed.split("act-btn ");
    if (realClass[1] === "stopmusic") {
        $('#musicplayer').removeClass('stopmusic');
        $('#musicplayer').addClass('playmusic');
        pauseAudio();
    } else if (realClass[1] === "playmusic") {
        console.warn('sini');
        $('#musicplayer').removeClass('playmusic');
        $('#musicplayer').addClass('stopmusic');
        playAudio();
    }
});

function showGreating() {
    const dbRef = firebase.database();
    const attendances = dbRef.ref("attendance");
    let textGreating = "";
    let counter = 1
    attendances.on("child_added", function (data, prevChildKey) {
        let attendance = data.val();
        let active = "";
        if(counter == 1) {active = "active"} else { active = ''};
        textGreating += `
        <div class="carousel-item ${active}">
            <div class="card card-item-greating">
                <div class="card-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2">
                                <i class="fas fa-quote-left fa-1x" style="color: #EBB567;"></i>
                            </div>
                            <div class="col-10 list-greating-text">
                                ${attendance.greating}
                                <div class="text-right">
                                    -- <strong>${attendance.nameSender}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        counter += 1;
        // console.log(textGreating);
        document.getElementById('itemGreating').innerHTML = textGreating;
    });

    
}