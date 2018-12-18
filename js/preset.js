/*--------------------presets--------------------*/

var organPreset = function () {
    moveKnobRange(rangeOsc1Knob, 90, 2);
    moveKnobWaveform(waveformOsc1Knob, -30, "triangle");

    moveKnobRange(rangeOsc2Knob, 18, 8);
    moveKnobFrequency(freqOsc2Knob, 0, 0);
    moveKnobWaveform(waveformOsc2Knob, -30, "triangle");

    moveKnobRange(rangeOsc3Knob, 54, 4);
    moveKnobFrequency(freqOsc3Knob, 0, 0);
    moveKnobWaveform(waveformOsc3Knob, -30, "triangle");

    moveKnobCont(volumeOsc1Knob, 135);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 135);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, -45);
    (noiseButton) ? clickOscButton(noiseVolumeButton): null;
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? changeNoiseType(noiseTypeButton): null;

    (tremoloOn) ? clickTremolo(): null;
    moveKnobCont(rateTremoloKnob, -82);
    moveKnobCont(depthTremoloKnob, -25);
    moveKnobWaveform(waveformTremoloKnob, -90, "sine");

    (delayOn) ? null: clickDelay();
    moveKnobCont(timeDelayKnob, -82);
    moveKnobCont(feedbackDelayKnob, 82);
    moveKnobCont(levelDelayKnob, 26);

    moveKnobCont(attackKnob, -125);
    moveKnobCont(decayKnob, -26);
    moveKnobCont(sustainKnob, 82);
    moveKnobCont(releaseKnob, -54);

    moveKnobCont(volumeKnob, 135);

    (isOn) ? null: turnOnOff();
};

var hammondPreset = function () {
    moveKnobRange(rangeOsc1Knob, -90, 2);
    moveKnobWaveform(waveformOsc1Knob, -90, "sine");

    moveKnobRange(rangeOsc2Knob, 90, 2);
    moveKnobFrequency(freqOsc2Knob, 0, 0);
    moveKnobWaveform(waveformOsc2Knob, -90, "sine");

    moveKnobRange(rangeOsc3Knob, 54, 4);
    moveKnobFrequency(freqOsc3Knob, 0, 0);
    moveKnobWaveform(waveformOsc3Knob, -90, "sine");

    moveKnobCont(volumeOsc1Knob, 135);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 95);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 135);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, 120);
    (noiseButton) ? clickOscButton(noiseVolumeButton): null;
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? null: changeNoiseType(noiseTypeButton);

    (tremoloOn) ? null: clickTremolo();
    moveKnobCont(rateTremoloKnob, 135);
    moveKnobCont(depthTremoloKnob, -70);
    moveKnobWaveform(waveformTremoloKnob, -90, "sine");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -75);
    moveKnobCont(feedbackDelayKnob, 45);
    moveKnobCont(levelDelayKnob, -95);

    moveKnobCont(attackKnob, -134);
    moveKnobCont(decayKnob, -135);
    moveKnobCont(sustainKnob, 135);
    moveKnobCont(releaseKnob, -125);

    moveKnobCont(volumeKnob, 135);

    (isOn) ? null: turnOnOff();
};

var subBassPreset = function () {
    moveKnobRange(rangeOsc1Knob, 18, 8);
    moveKnobWaveform(waveformOsc1Knob, 30, "sawtooth");

    moveKnobRange(rangeOsc2Knob, -18, 16);
    moveKnobFrequency(freqOsc2Knob, 0, 0);
    moveKnobWaveform(waveformOsc2Knob, -30, "triangle");

    moveKnobRange(rangeOsc3Knob, -18, 16);
    moveKnobFrequency(freqOsc3Knob, 8, 0.8);
    moveKnobWaveform(waveformOsc3Knob, -90, "sine");

    moveKnobCont(volumeOsc1Knob, 52);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 135);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, -55);
    (noiseButton) ? clickOscButton(noiseVolumeButton): null;
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? null: changeNoiseType(noiseTypeButton);

    (tremoloOn) ? clickTremolo(): null;
    moveKnobCont(rateTremoloKnob, -135);
    moveKnobCont(depthTremoloKnob, 20);
    moveKnobWaveform(waveformTremoloKnob, -30, "triangle");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -55);
    moveKnobCont(feedbackDelayKnob, 76);
    moveKnobCont(levelDelayKnob, 100);

    moveKnobCont(attackKnob, -125);
    moveKnobCont(decayKnob, -135);
    moveKnobCont(sustainKnob, 135);
    moveKnobCont(releaseKnob, -120);

    moveKnobCont(volumeKnob, 48);

    (isOn) ? null: turnOnOff();
};

var jumpPreset = function () {
    moveKnobRange(rangeOsc1Knob, 54, 4);
    moveKnobWaveform(waveformOsc1Knob, 30, "sawtooth");

    moveKnobRange(rangeOsc2Knob, 54, 4);
    moveKnobFrequency(freqOsc2Knob, 3, 0.3);
    moveKnobWaveform(waveformOsc2Knob, -30, "sawtooth");

    moveKnobRange(rangeOsc3Knob, -18, 16);
    moveKnobFrequency(freqOsc3Knob, 0, 0);
    moveKnobWaveform(waveformOsc3Knob, -90, "sine");

    moveKnobCont(volumeOsc1Knob, 135);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 55);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, -20);
    (noiseButton) ? null: clickOscButton(noiseVolumeButton);
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? changeNoiseType(noiseTypeButton): null;

    (tremoloOn) ? clickTremolo(): null;
    moveKnobCont(rateTremoloKnob, -135);
    moveKnobCont(depthTremoloKnob, -135);
    moveKnobWaveform(waveformTremoloKnob, -90, "sine");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -135);
    moveKnobCont(feedbackDelayKnob, -135);
    moveKnobCont(levelDelayKnob, -135);

    moveKnobCont(attackKnob, -128);
    moveKnobCont(decayKnob, -135);
    moveKnobCont(sustainKnob, 135);
    moveKnobCont(releaseKnob, -115);

    moveKnobCont(volumeKnob, -45);

    (isOn) ? null: turnOnOff();
};

var videogamePreset = function () {
    moveKnobRange(rangeOsc1Knob, 90, 2);
    moveKnobWaveform(waveformOsc1Knob, 90, "square");

    moveKnobRange(rangeOsc2Knob, 90, 2);
    moveKnobFrequency(freqOsc2Knob, -90, -5);
    moveKnobWaveform(waveformOsc2Knob, 30, "sawtooth");

    moveKnobRange(rangeOsc3Knob, -18, 16);
    moveKnobFrequency(freqOsc3Knob, 2, 0.4);
    moveKnobWaveform(waveformOsc3Knob, -30, "triangle");

    moveKnobCont(volumeOsc1Knob, 135);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 82);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, -45);
    (noiseButton) ? clickOscButton(noiseVolumeButton): null;
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? null: changeNoiseType(noiseTypeButton);

    (tremoloOn) ? clickTremolo(): null;
    moveKnobCont(rateTremoloKnob, 132);
    moveKnobCont(depthTremoloKnob, 90);
    moveKnobWaveform(waveformTremoloKnob, 90, "square");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -82);
    moveKnobCont(feedbackDelayKnob, 115);
    moveKnobCont(levelDelayKnob, -50);

    moveKnobCont(attackKnob, -135);
    moveKnobCont(decayKnob, -82);
    moveKnobCont(sustainKnob, -135);
    moveKnobCont(releaseKnob, -125);

    moveKnobCont(volumeKnob, 48);

    (isOn) ? null: turnOnOff();
};

var starWarsPreset = function () {
    moveKnobRange(rangeOsc1Knob, 54, 4);
    moveKnobWaveform(waveformOsc1Knob, -30, "sawtooth");

    moveKnobRange(rangeOsc2Knob, 18, 8);
    moveKnobFrequency(freqOsc2Knob, 0, 0);
    moveKnobWaveform(waveformOsc2Knob, 90, "square");

    moveKnobRange(rangeOsc3Knob, 54, 4);
    moveKnobFrequency(freqOsc3Knob, 0, 0);
    moveKnobWaveform(waveformOsc3Knob, 90, "square");

    moveKnobCont(volumeOsc1Knob, 135);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 135);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, 35);
    (noiseButton) ? null: clickOscButton(noiseVolumeButton);
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? changeNoiseType(noiseTypeButton): null;

    (tremoloOn) ? null: clickTremolo();
    moveKnobCont(rateTremoloKnob, -135);
    moveKnobCont(depthTremoloKnob, -135);
    moveKnobWaveform(waveformTremoloKnob, -90, "sine");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -135);
    moveKnobCont(feedbackDelayKnob, -135);
    moveKnobCont(levelDelayKnob, -135);

    moveKnobCont(attackKnob, -120);
    moveKnobCont(decayKnob, -60);
    moveKnobCont(sustainKnob, -135);
    moveKnobCont(releaseKnob, -110);

    moveKnobCont(volumeKnob, -20);

    (isOn) ? null: turnOnOff();
};

var ufoPreset = function () {
    moveKnobRange(rangeOsc1Knob, 18, 8);
    moveKnobWaveform(waveformOsc1Knob, 30, "square");

    moveKnobRange(rangeOsc2Knob, 90, 2);
    moveKnobFrequency(freqOsc2Knob, -16, -1);
    moveKnobWaveform(waveformOsc2Knob, -30, "triangle");

    moveKnobRange(rangeOsc3Knob, -18, 16);
    moveKnobFrequency(freqOsc3Knob, 34, 2);
    moveKnobWaveform(waveformOsc3Knob, -90, "sine");

    moveKnobCont(volumeOsc1Knob, 35);
    (osc1Button) ? null: clickOscButton(osc1VolumeButton);

    moveKnobCont(volumeOsc2Knob, 135);
    (osc2Button) ? null: clickOscButton(osc2VolumeButton);

    moveKnobCont(volumeOsc3Knob, 135);
    (osc3Button) ? null: clickOscButton(osc3VolumeButton);

    moveKnobCont(volumeNoiseKnob, -15);
    (noiseButton) ? clickOscButton(noiseVolumeButton): null;
    (noiseTypeButton.className === "buttonBlueVerticalOff") ? changeNoiseType(noiseTypeButton): null;

    (tremoloOn) ? null: clickTremolo();
    moveKnobCont(rateTremoloKnob, -135);
    moveKnobCont(depthTremoloKnob, -10);
    moveKnobWaveform(waveformTremoloKnob, 30, "sawtooth");

    (delayOn) ? clickDelay(): null;
    moveKnobCont(timeDelayKnob, -84);
    moveKnobCont(feedbackDelayKnob, 110);
    moveKnobCont(levelDelayKnob, -55);

    moveKnobCont(attackKnob, -84);
    moveKnobCont(decayKnob, -135);
    moveKnobCont(sustainKnob, 64);
    moveKnobCont(releaseKnob, -84);

    moveKnobCont(volumeKnob, 135);

    (isOn) ? null: turnOnOff();
};


/*--------------------main function to change preset--------------------*/

var changePreset = function (type) {

    showSettings();
    settingIsClicked = false;

    switch (type) {
        case "organ":
            organPreset();
            break;
        case "hammond":
            hammondPreset();
            break;
        case "subBass":
            subBassPreset();
            break;
        case "jump":
            jumpPreset();
            break;
        case "videogame":
            videogamePreset();
            break;
        case "starWars":
            starWarsPreset();
            break;
        case "ufo":
            ufoPreset();
            break;
    }
}

/*--------------------show/hide preset function--------------------*/
var settingIsClicked = false;

function showSettings() {
    if (!settingIsClicked) {
        settings.style.visibility = "visible";
        settingIsClicked = true;
    } else {
        settings.style.visibility = "hidden";
        settingIsClicked = false;
    }
}

/*--------------------set initial preset--------------------*/
organPreset();
turnOnOff();
