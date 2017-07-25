'use strict';
var slideIndex=1, SLIDES_NUM = 5, arr = [];

function plusSlides(n){
    if(n<0 && slideIndex == 1) return;
    if(n>0 && slideIndex == SLIDES_NUM) return;
    showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
	if(slides.length > 0 && dots.length > 0) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

(function(){
    showSlides(slideIndex);
    for(var i = 0; i<10; i++)
    {
        $('.slidershow-container')[0].innerHTML =
            '<div class="mySlides fade">'+
            '<img src="img/no_photo.png">'+
            '<div class="subscribe title"></div>'+
            '<div class="subscribe year"></div>'+
            '<div class="subscribe country"></div>'+
            '<div class="subscribe director"></div>'+
            '<div class="subscribe genre"></div>'+
            '<div class="subscribe plot"></div>'+
    '</div>'+$('.slidershow-container')[0].innerHTML;
    }
    $('.movie-button')[0].addEventListener('click', do_something);
    random_request();
})();

function do_something() {
    try {
        var use_func = true;
        var URL = "http://www.omdbapi.com/?t=", pt = $('.film_name')[0].value.split(' ');
        URL += pt[0];
        for (var i = 1; i < pt.length; i++) {
            URL += ("+" + pt[i]);
        }
        var key = "&apikey=ec6483bd";
        URL += key;
        URL += "&y=";
        for (var ind = 2017; ind >= 1950; ind--) {
            var prom = new Promise(function (resolved, rejected) {
                $.ajax({
                    url: URL + ind,
                    cache: false,
                    index: ind,
                    contentType: false,
                    processData: false,
                    type: 'GET',
                    delay: i,
                    success: function (response) {
                        if (response.Response == "True" && use_func) arr.push(response);
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    xhr: function () {
                        var xhr = $.ajaxSettings.xhr();
                        return xhr;
                    }
                }).done(function (result) {
                    if (arr.length >= 10 && use_func) {
                        use_func = false;
                        commit();
                    }
                });
                if (arr.length < 10)
                    resolved("Wrks");
                else
                    rejected(Error("Broken"));
            });
            prom.then(function (result) {
                console.log("Working good!")
            }, function (err) {
                console.log(err); // Ошибка: "Сломалось"
            });
        }
    }catch(e){
        console.log(e);
    }
}

function fill_slide(i)
{
    var slide = $('.mySlides')[i];
    if (arr[i].Poster == "N/A") slide.getElementsByTagName('img')[0].src = "img/no_photo.png";
    else slide.getElementsByTagName('img')[0].src = arr[i].Poster;
    slide.getElementsByClassName('title')[0].innerHTML = '<h1>Title: </h1>' + '<h3>' + arr[i].Title + '</h3>';
    slide.getElementsByClassName('year')[0].innerHTML = '<h1>Year: </h1>' + '<h3>' + arr[i].Year + '</h3>';
    slide.getElementsByClassName('country')[0].innerHTML = '<h1>Country: </h1>' + '<h3>' + arr[i].Country + '</h3>';
    slide.getElementsByClassName('director')[0].innerHTML = '<h1>Director: </h1>' + '<h3>' + arr[i].Director + '</h3>';
    slide.getElementsByClassName('genre')[0].innerHTML = '<h1>Genre: </h1>' + '<h3>' + arr[i].Genre + '</h3>';
    slide.getElementsByClassName('plot')[0].innerHTML = '<h1>Plot: </h1>' + '<h3>' + arr[i].Plot + '</h3>';
}

function commit()
{
    var prom = new Promise(function (resolved, rejected) {
        SLIDES_NUM = (arr.length > 10) ? 10 : arr.length;
        console.log("Setting dots " + SLIDES_NUM);
        console.log(arr);
        while ($('.dot_container')[0].hasChildNodes()) {
            var node = $('.dot_container')[0].firstChild;
            $('.dot_container')[0].removeChild(node);
        }
        var elem;
        for (var i = 0; i < SLIDES_NUM; i++) {
            elem = document.createElement('span');
            elem.classList += 'dot';
            elem.onclick = currentSlide(i);
            var id = "dot_" + i;
            elem.id = id;
            elem.setAttribute('onclick', 'currentSlide(' + (i + 1) + ')');
            $('.dot_container')[0].appendChild(elem);
        }
        for (i = 0; i < SLIDES_NUM; i++) {
            fill_slide(i);
        }
        arr = [];
        resolved("GOOD");
    });
    prom.then(function (res) {
        console.log(res)
    }, function (err) {
        console.log(err);
    });
}

function random_request()
{
    var prom = new Promise(function (resolved, rejected) {
        var use_func = true;
        for (var i = 0; i < 15; i++) {
            var rand_id = 1000000 + Math.floor(Math.random() * 1200000) % 1200000;
            rand_id = 'tt' + rand_id;
            var URL = "http://www.omdbapi.com/?i=" + rand_id;
            var key = "&apikey=ec6483bd";
            URL += key;
            $.ajax({
                url: URL,
                cache: false,
                contentType: false,
                processData: false,
                type: 'GET',
                success: function (response) {
                    if (response.Response == "True" && use_func) {
                        arr.push(response);
                    }
                },
                error: function (e) {
                    console.log(e);
                },
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    return xhr;
                }
            }).done(function (res) {
                if (arr.length >= 5 && use_func) {
                    use_func = false;
                    commit();
                }
            });
            resolved("NICE");
        }
    });
    prom.then(function (res) {
        console.log(res)
    }, function (err) {
        console.log(err);
    });
}