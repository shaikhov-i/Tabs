window.addEventListener('DOMContentLoaded', function() {
    'use strict';


    // To usе

    createTab('.info-header', '.info-header-tab', '.info-tabcontent');


    // createTab(1, 2, 3);

    // 1) Parent of tab headers
    // 2) Heads of tabs
    // 3) Tab content





    // Example

    // 1) parent of tab headers

    // <div class="info-header"> 

    // 2) Heads of tabs

    //      <div class="info-header-tab"></div>
    //      <div class="info-header-tab"></div>
    //      <div class="info-header-tab"></div>
    //      <div class="info-header-tab"></div>
    // </div>

    // 3) Tab content   

    // <div class="info-tabcontent fade">
    // <div class="info-tabcontent fade">
    // <div class="info-tabcontent fade">
    // <div class="info-tabcontent fade">








    function createTab(infoHeader, headerTab, infoTab) {
        let tab = document.querySelectorAll(headerTab),
            tabContent = document.querySelectorAll(infoTab),
            info = document.querySelector(infoHeader);



        // Function for hiding tab contents

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        // Hiding all tab contents beside 1

        hideTabContent(1);


        // Function for showing tab content

        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        info.addEventListener('click', function(event) {
            let target = event.target;
            if (target && target.classList.contains(headerTab.substring(1, ))) {
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                    }
                }
            }
        })
    }

    // Timer

    let deadline = '2020-09-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.total > 0) {
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;
            }
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline);

    // Modal

    function modal(more) {
        let overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close');

        more.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = 'initial';
        });
    }
    modal(document.querySelector('.more'));
    document.querySelectorAll('.description-btn').forEach(function(element) {
        modal(element);
    });



    // Class Options
    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        setDiv = function(text, css) {
            let div = document.createElement('div');
            document.querySelector('.main').appendChild(div);
            div.textContent = text;
            div.style.cssText = css;
            div.style.height = this.height + "px";
            div.style.width = this.width + "px";
            div.style.backgroundColor = this.bg;
            div.style.fontSize = this.fontSize + "px";
            div.style.textAlign = this.textAlign;

            console.log(this.height);
        }
    };

    let elem = new Options(200, 200, "red", 15, "center");
    elem.setDiv("Hello", "font-weight: bold");


    // Popup form

    let mainForm = document.querySelector('.main-form'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function getData(form, selector) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            let formData = new FormData(form);
            request.send(formData);

            request.addEventListener('readystatechange', function() {
                if (this.status == 200) {
                    if (this.readyState < 4) {
                        statusMessage.textContent = "Загружается...";
                    } else if (this.readyState == 4) {
                        statusMessage.textContent = "Ваши данные успешно отправлены!";
                    } else {
                        statusMessage.textContent = "Что то пошло не так(";
                    }
                }
                document.querySelectorAll(selector).forEach(function(element){
                    element.value = '';
                })
            });
        });
    }
    let form = document.querySelector('#form');
    getData(mainForm, '.popup-form__input');
    getData(form, '#form input');

});