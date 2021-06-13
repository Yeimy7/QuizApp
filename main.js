'use strict'
window.addEventListener('load', function () {
    const API_ANSWERS_URL = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"

    const modalWelcome = document.querySelector('#overlay');
    const buttonStart = document.querySelector('[data-close-button]')

    const contador = document.getElementById('contador');
    const question = document.getElementById('qestion');
    const submit = document.getElementById('submit');
    const x = document.getElementById("next-button");
    const options = document.querySelectorAll('[data-id] > p');
    const list = document.querySelectorAll('[data-id]');

    let dat;
    let correct = 0;
    let num_correct = 0;
    let cont = 0;
    let sw = true;


    fetch(API_ANSWERS_URL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            dat = data.results;
            startTest();
        })

    openModal(modalWelcome);

    buttonStart.addEventListener('click', () => {
        closeModal(modalWelcome);

    })

    list.forEach((element, i) => {
        element.addEventListener('click', () => {
            if (sw) {
                if (element.getAttribute('data-id') == correct) {
                    element.classList.add('right');
                    num_correct++;
                } else {
                    element.classList.add('wrong');
                }
                sw = false;
                submit.style.display = "block";
            }
        })
    });

    submit.addEventListener('click', () => {
        if (cont < 10) {
            sw = true;
            resetList();
            cont++;
            startTest();
            if (cont === 9) {
                x.innerText = "Finish quiz";
                cont++;
            }
            submit.style.display = "none";
        } else {
            muestraMensaje();
        }

    })

    function startTest() {
        contador.innerHTML = cont + 1;
        question.innerHTML = dat[cont].question;
        let resp = dat[cont].incorrect_answers;
        correct = parseInt(Math.random() * (4 - 0) + 0);
        resp.splice(correct, 0, dat[cont].correct_answer);
        options.forEach((element, i) => {
            element.innerHTML = resp[i];
        });
    }
    function resetList() {
        list.forEach((element, i) => {
            element.classList.remove('right');
            element.classList.remove('wrong');
        });
    }
    function muestraMensaje() {
        var foo = document.querySelectorAll('#overlay > #modalWelcome');
        var lis = foo[0].childNodes;
        lis[1].textContent = "Congratulation!";
        lis[3].textContent = "You have completed the quiz.";
        lis[5].textContent = `You got: ${num_correct} out of 10 questions right`;
        lis[7].textContent = "Restart";
        openModal(modalWelcome);
        buttonStart.addEventListener('click', function () {
            location.reload();
            closeModal(modalWelcome);
        })

    }

})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
}
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
}

