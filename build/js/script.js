

    const dragstart = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };
    const dragover = function(event) {
        if(event.target.nodeName.toLowerCase() === "img") {
            return true;
        }
        event.preventDefault();
    }
    const drop = function(event) {
        event.preventDefault();
        let imageId = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(imageId));
        let cell1 = document.querySelector('#cell1');
        let img1 = document.querySelector('#image_part_001');

        let cell2 = document.querySelector('#cell2');
        let img2 = document.querySelector('#image_part_002');

        let cell3 = document.querySelector('#cell3');
        let img3 = document.querySelector('#image_part_003');

        let cell4 = document.querySelector('#cell4');
        let img4 = document.querySelector('#image_part_004');

        let cell5 = document.querySelector('#cell5');
        let img5 = document.querySelector('#image_part_005');

        let cell6 = document.querySelector('#cell6');
        let img6 = document.querySelector('#image_part_006');

        let cell7 = document.querySelector('#cell7');
        let img7 = document.querySelector('#image_part_007');

        let cell8 = document.querySelector('#cell8');
        let img8 = document.querySelector('#image_part_008');

        let cell9 = document.querySelector('#cell9');
        let img9 = document.querySelector('#image_part_009');

        let contains = cell1.contains(img1) && cell2.contains(img2) && cell3.contains(img3) && cell4.contains(img4) && cell5.contains(img5) && cell6.contains(img6) && cell7.contains(img7) && cell8.contains(img8)  && cell9.contains(img9);

        let alert = document.querySelector('#alert');
        let yourTime = document.querySelector('#yourTime');
        if (contains) {
            alert.style.display = "flex";
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
        var images = document.getElementById("images");
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
