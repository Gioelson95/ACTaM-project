/*--------------------get lights of VU meter--------------------*/

var lightLeft = [];
var lightRight = [];

lightLeft[0] = document.getElementById("light1L");
lightRight[0] = document.getElementById("light1R");

lightLeft[1] = document.getElementById("light2L");
lightRight[1] = document.getElementById("light2R");

lightLeft[2] = document.getElementById("light3L");
lightRight[2] = document.getElementById("light3R");

lightLeft[3] = document.getElementById("light4L");
lightRight[3] = document.getElementById("light4R");

lightLeft[4] = document.getElementById("light5L");
lightRight[4] = document.getElementById("light5R");

lightLeft[5] = document.getElementById("light6L");
lightRight[5] = document.getElementById("light6R");

lightLeft[6] = document.getElementById("light7L");
lightRight[6] = document.getElementById("light7R");

lightLeft[7] = document.getElementById("light8L");
lightRight[7] = document.getElementById("light8R");

lightLeft[8] = document.getElementById("light9L");
lightRight[8] = document.getElementById("light9R");

lightLeft[9] = document.getElementById("light10L");
lightRight[9] = document.getElementById("light10R");

lightLeft[10] = document.getElementById("light11L");
lightRight[10] = document.getElementById("light11R");

lightLeft[11] = document.getElementById("light12L");
lightRight[11] = document.getElementById("light12R");


/*--------------------turn on/off lights function--------------------*/

function changeVUMeter(value) {
    if (value === 0) {
        for (i = 0; i < lightLeft.length - 4; i++) {
            lightLeft[i].classList.add("ledOffGreen");
            lightRight[i].classList.add("ledOffGreen");
            lightLeft[i].classList.remove("ledOnGreen");
            lightRight[i].classList.remove("ledOnGreen");
        }

        for (i = 8; i < lightLeft.length - 1; i++) {
            lightLeft[i].classList.add("ledOffYellow");
            lightRight[i].classList.add("ledOffYellow");
            lightLeft[i].classList.remove("ledOnYellow");
            lightRight[i].classList.remove("ledOnYellow");
        }

        lightLeft[11].classList.add("ledOffRed");
        lightRight[11].classList.add("ledOffRed");
        lightLeft[11].classList.remove("ledOnRed");
        lightRight[11].classList.remove("ledOnRed");
    }

    if (value > 0.1) {
        for (i = 0; i < lightLeft.length - 4; i++) {
            lightLeft[i].classList.add("ledOffGreen");
            lightRight[i].classList.add("ledOffGreen");
            lightLeft[i].classList.remove("ledOnGreen");
            lightRight[i].classList.remove("ledOnGreen");
        }

        for (i = 8; i < lightLeft.length - 1; i++) {
            lightLeft[i].classList.add("ledOffYellow");
            lightRight[i].classList.add("ledOffYellow");
            lightLeft[i].classList.remove("ledOnYellow");
            lightRight[i].classList.remove("ledOnYellow");
        }
        lightLeft[11].classList.add("ledOffRed");
        lightRight[11].classList.add("ledOffRed");
        lightLeft[11].classList.remove("ledOnRed");
        lightRight[11].classList.remove("ledOnRed");

        lightLeft[0].classList.remove("ledOffGreen");
        lightRight[0].classList.remove("ledOffGreen");
        lightLeft[0].classList.add("ledOnGreen");
        lightRight[0].classList.add("ledOnGreen");
    }

    if (value > 0.2) {
        lightLeft[1].classList.remove("ledOffGreen");
        lightRight[1].classList.remove("ledOffGreen");
        lightLeft[1].classList.add("ledOnGreen");
        lightRight[1].classList.add("ledOnGreen");
    }

    if (value > 0.3) {
        lightLeft[2].classList.remove("ledOffGreen");
        lightRight[2].classList.remove("ledOffGreen");
        lightLeft[2].classList.add("ledOnGreen");
        lightRight[2].classList.add("ledOnGreen");
    }

    if (value > 0.4) {
        lightLeft[3].classList.remove("ledOffGreen");
        lightRight[3].classList.remove("ledOffGreen");
        lightLeft[3].classList.add("ledOnGreen");
        lightRight[3].classList.add("ledOnGreen");
    }

    if (value > 0.5) {
        lightLeft[4].classList.remove("ledOffGreen");
        lightRight[4].classList.remove("ledOffGreen");
        lightLeft[4].classList.add("ledOnGreen");
        lightRight[4].classList.add("ledOnGreen");
    }

    if (value > 0.6) {
        lightLeft[5].classList.remove("ledOffGreen");
        lightRight[5].classList.remove("ledOffGreen");
        lightLeft[5].classList.add("ledOnGreen");
        lightRight[5].classList.add("ledOnGreen");
    }

    if (value > 0.7) {
        lightLeft[6].classList.remove("ledOffGreen");
        lightRight[6].classList.remove("ledOffGreen");
        lightLeft[6].classList.add("ledOnGreen");
        lightRight[6].classList.add("ledOnGreen");
    }

    if (value > 0.8) {
        lightLeft[7].classList.remove("ledOffGreen");
        lightRight[7].classList.remove("ledOffGreen");
        lightLeft[7].classList.add("ledOnGreen");
        lightRight[7].classList.add("ledOnGreen");
    }

    if (value > 0.9) {
        lightLeft[8].classList.remove("ledOffYellow");
        lightRight[8].classList.remove("ledOffYellow");
        lightLeft[8].classList.add("ledOnYellow");
        lightRight[8].classList.add("ledOnYellow");
    }

    if (value > 1.0) {
        lightLeft[9].classList.remove("ledOffYellow");
        lightRight[9].classList.remove("ledOffYellow");
        lightLeft[9].classList.add("ledOnYellow");
        lightRight[9].classList.add("ledOnYellow");
    }

    if (value > 1.1) {
        lightLeft[10].classList.remove("ledOffYellow");
        lightRight[10].classList.remove("ledOffYellow");
        lightLeft[10].classList.add("ledOnYellow");
        lightRight[10].classList.add("ledOnYellow");
    }

    if (value > 1.2) {
        lightLeft[11].classList.remove("ledOffRed");
        lightRight[11].classList.remove("ledOffRed");
        lightLeft[11].classList.add("ledOnRed");
        lightRight[11].classList.add("ledOnRed");
    }

}

/*--------------------average function--------------------*/

function getAverageVolume(array) {
    var values = 0;
    var average;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        values += array[i];
    }
    average = values / length;
    return average;
}

var javascriptNode;

/*--------------------principals function to get the volume and change VU meter lights--------------------*/

function setupAudioNodes() {
    // setup a javascript node
    javascriptNode = context.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    javascriptNode.connect(context.destination);
    // setup a analyzer
    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;
    // connect one of the outputs from the splitter to the analyser
    gainOut.connect(analyser, 0, 0);
    // we use the javascript node to draw at a specific interval.
    analyser.connect(javascriptNode);
}

setupAudioNodes();

javascriptNode.onaudioprocess = function () {

    // get the average for the first channel
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    var average = getAverageVolume(array);
    (noiseButton) ? changeVUMeter(average / (100 + volumeNoise * 50)): changeVUMeter(average / 100);
}
