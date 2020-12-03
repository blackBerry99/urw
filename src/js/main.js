let showAlert = document.querySelector('#js-alert');
let yourTime = document.querySelector('#js-yourTime');

const dragstart = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };
const dragover = function(event) {
        if(event.target.nodeName.toLowerCase() === "img") {
            return true;
        }
        event.preventDefault();
    };

const drop = function(event) {
    event.preventDefault();
    let imageId = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(imageId));
    let puzzle = []
    let puzzleCount = document.querySelectorAll('#js-puzzle .js-puzzle__item').length
    for (let i = 0; i < puzzleCount; i++) {
        puzzle.push({
            cell: document.querySelector(`#cell${i + 1}`),
            image: document.querySelector(`#image_part_00${i + 1}`)
        })
    }

    if (puzzle.every(p => p.cell.contains(p.image))) {
        showAlert.style.display = "flex";
        yourTime.textContent = time.textContent;
    }
};

const cells = document.getElementsByClassName("puzzle__grid-col");
    Array.from(cells).forEach((element) => {
        element.addEventListener('dragover',dragover);
        element.addEventListener('drop',drop);
    });

    const images = document.getElementsByTagName("img");
    Array.from(images).forEach((element) => {
        element.addEventListener('dragstart',dragstart);
    });

    let time = [0];
    let stop;
    let seconds = 0, minutes = 0, hours = 0;
    let t;

    function randomize() {
        var images = document.getElementById("js-images");
        images.classList.add("puzzle__grid--randomized");
        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
            timer();
        }
        function timer() {
            t = setTimeout(add, 1000);
        }
        timer();
        stop = function() {
            clearTimeout(t);
            return time.textContent;
        }
    }
    function closeAlert() {
        showAlert.style.display = "none";
    }
