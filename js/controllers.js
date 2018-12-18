/*--------------------general variables--------------------*/
var osc1Button = true;
var osc2Button = true;
var osc3Button = false;
var noiseButton = false;
var range1 = 1;
var range2 = 1;
var range3 = 1;
var frequency2SemitoneDetune = 2;
var frequency3SemitoneDetune = 2;
var sliderDetune = 2;
var generalTune = 0;

var isSustainPressed = false;
var activeVoiceSustain = {};

// tremolo params
var tremoloOn = false;
var rate = linearToLog(6); // 1-10
var depth = 0.5; // 0-1

// delay params
var time = 0.5 // 0-2 secondi
var feedback = linearToLog(0.5); // 0-1
var delayLevel = 0.5 // 0-1 
var delayOn = false;

/*--------------------function that modify oscilllators parameters--------------------*/
function modifyOscParameters(string, value) {

    var mapSize = noteMap.size;
    var iterator = noteMap.values();
    for (var i = 0; i < mapSize; i++) {
        var key = iterator.next().value;
        if (activeVoice[key] != undefined) {
            switch (string) {
                case "gain1":
                    if (osc1Button) {
                        activeVoice[key].gain1.gain.value = linearToLog(value);
                    }
                    break;

                case "gain2":
                    if (osc2Button) {
                        activeVoice[key].gain2.gain.value = linearToLog(value);
                    }
                    break;

                case "gain3":
                    if (osc3Button) {
                        activeVoice[key].gain3.gain.value = linearToLog(value);
                    }
                    break;

                case "gainNoise":
                    if (noiseButton) {
                        activeVoice[key].gainNoise.gain.value = linearToLog(value);
                    }
                    break;

                case "osc1VolumeButton":
                    activeVoice[key].gain1.gain.linearRampToValueAtTime(value, context.currentTime + 0.1);
                    break;

                case "osc2VolumeButton":
                    activeVoice[key].gain2.gain.linearRampToValueAtTime(value, context.currentTime + 0.1);
                    break;

                case "osc3VolumeButton":
                    activeVoice[key].gain3.gain.linearRampToValueAtTime(value, context.currentTime + 0.1);
                    break;

                case "noiseVolumeButton":
                    activeVoice[key].gainNoise.gain.linearRampToValueAtTime(value, context.currentTime + 0.1);
                    break;

                case "waveformOsc1Knob":
                    activeVoice[key].osc1.type = value;
                    break;

                case "waveformOsc2Knob":
                    activeVoice[key].osc2.type = value;
                    break;

                case "waveformOsc3Knob":
                    activeVoice[key].osc3.type = value;
                    break;

                case "pitchSliderOn":
                    activeVoice[key].osc1.detune.value = value + generalTune;
                    activeVoice[key].osc2.detune.value = value + frequency2SemitoneDetune + generalTune;
                    activeVoice[key].osc3.detune.value = value + frequency3SemitoneDetune + generalTune;
                    break;

                case "pitchSliderOff":
                    activeVoice[key].osc1.detune.linearRampToValueAtTime(0, 1);
                    activeVoice[key].osc2.detune.linearRampToValueAtTime(frequency2SemitoneDetune + generalTune, 1);
                    activeVoice[key].osc3.detune.linearRampToValueAtTime(frequency3SemitoneDetune + generalTune, 1);

                    break;

                case "freqOsc2Knob":
                    activeVoice[key].osc2.detune.value = value + generalTune;
                    break;

                case "freqOsc3Knob":
                    activeVoice[key].osc3.detune.value = value + generalTune;
                    break;

                case "rangeOsc1Knob":
                    activeVoice[key].osc1.frequency.value = activeVoice[key].frequency / range1;
                    break;

                case "rangeOsc2Knob":
                    activeVoice[key].osc2.frequency.value = activeVoice[key].frequency / range2;
                    break;

                case "rangeOsc3Knob":
                    activeVoice[key].osc3.frequency.value = activeVoice[key].frequency / range3;
                    break;

                case "tune":
                    activeVoice[key].osc1.detune.value = value + sliderDetune;
                    activeVoice[key].osc2.detune.value = value + sliderDetune + frequency2SemitoneDetune;
                    activeVoice[key].osc3.detune.value = value + sliderDetune + frequency3SemitoneDetune;
                    break;
            }
        }
    }
}

/*--------------------function used to rotate knobs--------------------*/
function rotateKnob(knob, type, position) {
    // the type indicate if knob is continuous(cont) or discrte(disc)
    var knobPos = knob.getBoundingClientRect();
    var isClicked = false;
    var pos = 0;
    var angle = 0;
    knob.onmousedown = function () {
        isClicked = true;
    };
    knob.onmouseup = function () {
        isClicked = false;
    };
    knob.onmousemove = function (e) {
        if (isClicked) {
            modifyKnob(knob, type, position, e, knobPos);
        }

    };
};

function modifyKnob(knob, type, position, e, knobPos) {

    //var knobPos = knob.getBoundingClientRect();
    if (position === undefined) {
        //knobPos = knob.getBoundingClientRect();
        var y = e.clientY;
        pos = (y - knobPos.bottom + 15) / (knobPos.top - knobPos.bottom + 30);
    } else {
        pos = position;
    }

    switch (type) {
        case "cont":
            var angle = pos * 270 - 135;
            (angle > 135) ? angle = 135: angle = angle;
            (angle < -135) ? angle = -135: angle = angle;
            moveKnobCont(knob, angle);
            break;
        case "range":
            var angle = pos * 180 - 90;
            var range;
            (angle > 72) ? (angle = 90, range = 2) : angle = angle;
            (angle < 73 && angle > 36) ? (angle = 54, range = 4) : angle = angle;
            (angle < 37 && angle > 0) ? (angle = 18, range = 8) : angle = angle;
            (angle < 1 && angle > -36) ? (angle = -18, range = 16) : angle = angle;
            (angle < -35 && angle > -72) ? (angle = -54, range = 32) : angle = angle;
            (angle < -71) ? (angle = -90, range = 1) : angle = angle;
            moveKnobRange(knob, angle, range);
            break;
        case "frequency":
            var angle = pos * 288 - 144;
            var frequencySemitoneDetune = pos * 16 - 8;
            (angle > 144) ? angle = 144: angle = angle;
            (angle < -144) ? angle = -144: angle = angle;
            moveKnobFrequency(knob, angle, frequencySemitoneDetune);
            break;
        case "waveform":
            var angle = pos * 180 - 90;
            var oscType;
            (angle > 60) ? (angle = 90, oscType = "square") : angle = angle;
            (angle < 61 && angle > 0) ? (angle = 30, oscType = "sawtooth") : angle = angle;
            (angle < 1 && angle > -61) ? (angle = -30, oscType = "triangle") : angle = angle;
            (angle < -60) ? (angle = -90, oscType = "sine") : angle = angle;
            moveKnobWaveform(knob, angle, oscType);
            break;
        case "tune":
            var angle = pos * 270 - 135;
            var tune;
            (angle > 121) ? (angle = 135, tune = 5) : angle = angle;
            (angle < 122 && angle > 95) ? (angle = 108, tune = 4) : angle = angle;
            (angle < 96 && angle > 69) ? (angle = 81, tune = 3) : angle = angle;
            (angle < 70 && angle > 43) ? (angle = 54, tune = 2) : angle = angle;
            (angle < 44 && angle > 15) ? (angle = 27, tune = 1) : angle = angle;
            (angle < 16 && angle > -14) ? (angle = 0, tune = 0) : angle = angle;
            (angle < -13 && angle > -44) ? (angle = -27, tune = -1) : angle = angle;
            (angle < -43 && angle > -70) ? (angle = -54, tune = -2) : angle = angle;
            (angle < -69 && angle > -96) ? (angle = -81, tune = -3) : angle = angle;
            (angle < -95 && angle > -122) ? (angle = -108, tune = -4) : angle = angle;
            (angle < -121) ? (angle = -135, tune = -5) : angle = angle;
            moveKnobTune(knob, angle, tune);
            break;
    }
}



function moveSlider(slider) {
    var sliderPos = slider.getBoundingClientRect();
    var isClicked = false;
    var pos = 0;
    slider.onmousedown = function () {
        isClicked = true;
    };
    slider.onmouseup = function () {
        isClicked = false;
        detuneOff(slider);
    };
    slider.onmouseout = function () {
        isClicked = false;
        detuneOff(slider);
    }
    slider.onmousemove = function (e) {
        if (isClicked) {
            var y = e.clientY;
            pos = (y - sliderPos.bottom + 5) / (sliderPos.top - sliderPos.bottom + 10);
            pos = pos * 2 - 1;
            (pos > 1) ? pos = 1: pos = pos;
            (pos < -1) ? pos = -1: pos = pos;
            detuneOn(slider, pos);
        }
    };
};


function moveKnobCont(knob, angle) {
    knob.style.transform = "translate(-50%) rotate(" + angle + "deg)";
    var value = linearToLog((angle + 135) / (270));

    switch (knob.id) {
        case "volumeOsc1Knob":
            volume1 = value;
            modifyOscParameters("gain1", volume1);
            break;

        case "volumeOsc2Knob":
            volume2 = value;
            modifyOscParameters("gain2", volume2);
            break;

        case "volumeOsc3Knob":
            volume3 = value;
            modifyOscParameters("gain3", volume3);
            break;

        case "volumeNoiseKnob":
            volumeNoise = value;
            modifyOscParameters("gainNoise", volumeNoise);
            break;

        case "attackKnob":
            attackTime = value * 10;
            break;

        case "decayKnob":
            decayTime = value * 10;
            break;

        case "sustainKnob":
            sustainLevel = value;
            break;

        case "releaseKnob":
            releaseTime = value * 10;
            break;

        case "volumeKnob":
            gainOut.gain.value = value;
            break;

        case "rateTremoloKnob":
            if (tremoloOn) {
                tremOsc.frequency.value = (value * 9) + 1;
            }
            rate = (value * 9) + 1;
            break;

        case "depthTremoloKnob":
            depth = value;
            real[0] = 1 - depth / 2;
            imag[0] = 0;
            real[1] = 1;
            imag[1] = 0;

            wave = context.createPeriodicWave(real, imag);
            tremOsc.setPeriodicWave(wave);
            if (tremoloOn) {
                tremGain.gain.value = depth;
            }
            break;

        case "timeDelayKnob":
            if (delayOn) {
                delayNode.delayTime.value = value * 2;
            }
            time = value * 2;
            break;

        case "feedbackDelayKnob":
            if (delayOn) {
                feedbackGain.gain.value = value - 0.1;
            }
            feedback = value;
            break;

        case "levelDelayKnob":
            if (delayOn) {
                outputGain.gain.value = value;
            }
            delayLevel = value;
            break;
    }
};


function moveKnobRange(knob, angle, range) {

    knob.style.transform = "translate(-50%) rotate(" + angle + "deg)";
    switch (knob.id) {
        case "rangeOsc1Knob":
            range1 = range;
            modifyOscParameters("rangeOsc1Knob", range1);
            break;

        case "rangeOsc2Knob":
            range2 = range;
            modifyOscParameters("rangeOsc2Knob", range2);
            break;

        case "rangeOsc3Knob":
            range3 = range;
            modifyOscParameters("rangeOsc3Knob", range3);
            break;
    }
};


function moveKnobFrequency(knob, angle, detune) {

    knob.style.transform = "translate(-50%) rotate(" + angle + "deg)";
    switch (knob.id) {
        case "freqOsc2Knob":
            frequency2SemitoneDetune = detune * 100;
            modifyOscParameters("freqOsc2Knob", detune * 100);
            break;

        case "freqOsc3Knob":
            frequency3SemitoneDetune = detune * 100;
            modifyOscParameters("freqOsc3Knob", detune * 100);
            break;
    }
};


function moveKnobWaveform(knob, angle, type) {
    knob.style.transform = "translate(-50%) rotate(" + angle + "deg)";
    switch (knob.id) {
        case "waveformOsc1Knob":
            osc1Type = type;
            modifyOscParameters("waveformOsc1Knob", osc1Type);
            break;

        case "waveformOsc2Knob":
            osc2Type = type;
            modifyOscParameters("waveformOsc2Knob", osc2Type);
            break;

        case "waveformOsc3Knob":
            osc3Type = type;
            modifyOscParameters("waveformOsc3Knob", osc3Type);
            break;
        case "waveformTremoloKnob":
            tremOsc.type = type;
            break;
    }
};

function moveKnobTune(knob, angle, tune) {
    knob.style.transform = "translate(-50%) rotate(" + angle + "deg)";
    generalTune = tune * 100;
    modifyOscParameters("tune", generalTune);
};


/*--------------------function to clikc buttons--------------------*/
function clickOscButton(button) {

    if (button.className === "buttonBlueOff") {
        button.classList.add("buttonBlueOn");
        button.classList.remove("buttonBlueOff");
        switch (button.id) {
            case "osc1VolumeButton":
                osc1Button = true;
                modifyOscParameters(button.id, volume1);
                break;
            case "osc2VolumeButton":
                osc2Button = true;
                modifyOscParameters(button.id, volume2);
                break;
            case "osc3VolumeButton":
                osc3Button = true;
                modifyOscParameters(button.id, volume3);
                break;
            case "noiseVolumeButton":
                noiseButton = true;
                modifyOscParameters(button.id, volumeNoise);
                break;
        }

    } else {
        button.classList.add("buttonBlueOff");
        button.classList.remove("buttonBlueOn");
        switch (button.id) {
            case "osc1VolumeButton":
                osc1Button = false;
                modifyOscParameters(button.id, 0);
                break;
            case "osc2VolumeButton":
                osc2Button = false;
                modifyOscParameters(button.id, 0);
                break;
            case "osc3VolumeButton":
                osc3Button = false;
                modifyOscParameters(button.id, 0);
                break;
            case "noiseVolumeButton":
                noiseButton = false;
                modifyOscParameters(button.id, 0);
                break;
        }

    }

}

function changeNoiseType(button) {
    if (button.className === "buttonBlueVerticalOff") {
        button.classList.add("buttonBlueVerticalOn");
        button.classList.remove("buttonBlueVerticalOff");
        typeNoise = "pink";
    } else {
        button.classList.add("buttonBlueVerticalOff");
        button.classList.remove("buttonBlueVerticalOn");
        typeNoise = "white";
    }
}

function clickA440() {
    if (A440) {
        buttonA440.classList.add("buttonRedOff");
        buttonA440.classList.remove("buttonRedOn");
        A440 = false;
        play400();
    } else {
        buttonA440.classList.add("buttonRedOn");
        buttonA440.classList.remove("buttonRedOff");
        A440 = true;
        play400();
    }
};

function clickTremolo() {
    if (tremoloOn) {
        tremoloButton.classList.add("buttonRedOff");
        tremoloButton.classList.remove("buttonRedOn");

        tremOsc.frequency.value = 0;
        tremGain.gain.value = 0;

        tremoloOn = false;
    } else {
        tremoloButton.classList.add("buttonRedOn");
        tremoloButton.classList.remove("buttonRedOff");

        tremOsc.frequency.value = rate;
        tremGain.gain.value = depth;

        tremoloOn = true;
    }
};

function clickDelay() {
    if (delayOn) {
        delayButton.classList.add("buttonRedOff");
        delayButton.classList.remove("buttonRedOn");

        outputGain.gain.value = 0;

        delayOn = false;
    } else {
        delayButton.classList.add("buttonRedOn");
        delayButton.classList.remove("buttonRedOff");

        outputGain.gain.value = delayLevel;

        delayOn = true;
    }
};

function turnOnOff() {
    if (isOn) {
        onOffButton.classList.add("buttonBlackOff");
        onOffButton.classList.remove("buttonBlackOn");
        light.style.backgroundColor = "darkred";
        light.style.borderColor = "gray";
        isOn = false;
        stopAll();
        if (A440) {
            clickA440();
        }
    } else {
        onOffButton.classList.add("buttonBlackOn");
        onOffButton.classList.remove("buttonBlackOff");
        light.style.backgroundColor = "red";
        light.style.borderColor = "darkred";
        isOn = true;
        if (A440) {
            play400();
        }
    }
};

/*--------------------function to control slider--------------------*/
function detuneOn(slider, pos) {
    pitchSliderInt.style.top = "" + ((55) * (-(pos - 1)) - 25) + "px";
    sliderDetune = pos * 100;
    modifyOscParameters("pitchSliderOn", pos * 100);
}

function detuneOff(slider) {
    sliderDetune = 0;
    modifyOscParameters("pitchSliderOff", null);
    pitchSliderInt.style.top = "" + 30 + "px";

}



/*--------------------function to convert linear values to logaritmic values--------------------*/
function linearToLog(position) {
    return (1 / 15) * Math.pow(16, position) - (1 / 15);
}
