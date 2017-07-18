'use strict';
var slideIndex=1, SLIDES_NUM = 5, arr = [];
showSlides(slideIndex);

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
    //setDots();
    var index = 0;
    random_request();
})();


function do_something() {
    try {
        var use_func = true;
        var URL = "http://www.omdbapi.com/?t=", pt = document.getElementById('film_name').value.split(' ');
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

function commit()
{
    try {
        SLIDES_NUM = (arr.length > 10) ? 10 : arr.length;
        console.log("Setting dots " + SLIDES_NUM);
        console.log(arr);
        while (document.getElementById('dot_count').hasChildNodes()) {
            var node = document.getElementById('dot_count').firstChild;
            document.getElementById('dot_count').removeChild(node);
        }
        var elem;
        for (var i = 0; i < SLIDES_NUM; i++) {
            elem = document.createElement('span');
            elem.classList += 'dot';
            elem.onclick = currentSlide(i);
            var id = "dot_" + i;
            elem.id = id;
            document.getElementById('dot_count').appendChild(elem);
            document.getElementById(id).setAttribute('onclick', 'currentSlide(' + (i + 1) + ')');
        }
        for (i = 0; i < SLIDES_NUM; i++) {
            var slide = document.getElementsByClassName('mySlides')[i];
            if (arr[i].Poster == "N/A") slide.getElementsByTagName('img')[0].src = "img/no_photo.png";
            else slide.getElementsByTagName('img')[0].src = arr[i].Poster;
            slide.getElementsByTagName('p')[0].innerHTML = '<h1>Title: </h1>' + '<h3>' + arr[i].Title + '</h3>';
            slide.getElementsByTagName('p')[1].innerHTML = '<h1>Year: </h1>' + '<h3>' + arr[i].Year + '</h3>';
            slide.getElementsByTagName('p')[2].innerHTML = '<h1>Country: </h1>' + '<h3>' + arr[i].Country + '</h3>';
            slide.getElementsByTagName('p')[3].innerHTML = '<h1>Director: </h1>' + '<h3>' + arr[i].Director + '</h3>';
            slide.getElementsByTagName('p')[4].innerHTML = '<h1>Genre: </h1>' + '<h3>' + arr[i].Genre + '</h3>';
            slide.getElementsByTagName('p')[5].innerHTML = '<h1>Plot: </h1>' + '<h3>' + arr[i].Plot + '</h3>';
        }
        arr = [];
    }catch(e)
    {
        console.log(e);
    }
}

function random_request()
{
    try {
        var use_func = true;
        for (var i = 0; i < 15; i++) {
            var rand_id = 1000000 + Math.floor(Math.random() * 1200000) % 1200000;
            rand_id = 'tt' + rand_id;
            var URL = "http://www.omdbapi.com/?i=" + rand_id;
            var key = "&apikey=ec6483bd";
            URL += key;
            //console.log("url = " + URL);
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
        }
    }catch(e)
    {
        console.log(e);
    }
}