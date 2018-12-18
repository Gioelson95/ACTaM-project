/*--------------------menage midi sutup--------------------*/

// request MIDI access
controlMIDIAccess();

function controlMIDIAccess() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false
        }).then(onMIDISuccess, onMIDIFailure);
    } else {
        alert("No MIDI support in your browser.");
    }
}

// midi functions
function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    var inputs = midi.inputs.values();
    // loop through all inputs
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = onMIDIMessage;
        // this just lists our inputs in the console
        //listInputs(input);
    }
    // listen for connect/disconnect message
    //midi.onstatechange = onStateChange;
}

function onMIDIFailure(e) {
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

/*--------------------main function to get midi values--------------------*/

// do action with midi message
function onMIDIMessage(event) {
    data = event.data,
        cmd = data[0] >> 4,
        channel = data[0] & 0xf,
        type = data[0] & 0xf0,
        note = data[1],
        velocity = data[2];

    var MIDICode = MIDIMap.get(note.toString());

    //console.log(data);
    //console.log(cmd, type, note, velocity);
    //type is not useful because is a repetition of cmd

    switch (cmd) {
        case 8:
            //noteOff message
            stopOscillator(MIDICode);
            break;

        case 9:
            // noteOn message
            switch (velocity) {
                case 0: // noteOn with velocity O message --> noteOff message
                    stopOscillator(MIDICode);
                    break;
                default: // noteOn message 
                    playOscillator(MIDICode);
                    break;
            }
            break;

        case 14:
            //pitch bend message
            switch (velocity) {
                case 64: //neutral position
                    detuneOff(slider);
                    break;
                default:
                    var value = velocity * 2 / 127 - 1;
                    detuneOn(pitchSliderExt, value);
                    break;
            }
            break;

        case 11:
            //control change message
            switch (note) {
                case 7:
                    //generalVolume message
                    var pos = velocity / 127;
                    modifyKnob(volumeKnob, 'cont', pos);
                    break;

                case 20:
                    //tune message
                    var pos = velocity / 127;
                    modifyKnob(tuneKnob, 'tune', pos);
                    break;

                case 21:
                    //rateTremolo message
                    var pos = velocity / 127;
                    modifyKnob(rateTremoloKnob, 'cont', pos);
                    break;

                case 22:
                    //depthTremolo message
                    var pos = velocity / 127;
                    modifyKnob(depthTremoloKnob, 'cont', pos);
                    break;

                case 23:
                    //waveformTremolo message
                    var pos = velocity / 127;
                    modifyKnob(waveformTremoloKnob, 'waveform', pos);
                    break;

                case 24:
                    //timeDelay message
                    var pos = velocity / 127;
                    modifyKnob(timeDelayKnob, 'cont', pos);
                    break;

                case 25:
                    //feedbackDelay message
                    var pos = velocity / 127;
                    modifyKnob(feedbackDelayKnob, 'cont', pos);
                    break;

                case 26:
                    //levelDelay message
                    var pos = velocity / 127;
                    modifyKnob(levelDelayKnob, 'cont', pos);
                    break;

                case 27:
                    //attack message
                    var pos = velocity / 127;
                    modifyKnob(attackKnob, 'waveform', pos);
                    break;

                case 28:
                    //decay message
                    var pos = velocity / 127;
                    modifyKnob(decayKnob, 'cont', pos);
                    break;

                case 29:
                    //sustain message
                    var pos = velocity / 127;
                    modifyKnob(sustainKnob, 'cont', pos);
                    break;

                case 30:
                    //release message
                    var pos = velocity / 127;
                    modifyKnob(releaseKnob, 'cont', pos);
                    break;

                case 64:
                    //sustain message
                    switch (velocity) {
                        case 127:
                            isSustainPressed = true;
                            break;
                        case 0:
                            isSustainPressed = false;

                            var mapSize = noteMap.size;
                            var iterator = noteMap.keys();
                            for (var i = 0; i < mapSize; i++) {
                                var key = iterator.next().value;
                                if (activeVoiceSustain[key] != undefined) {
                                    stopOscillator(key);
                                    delete activeVoiceSustain[key];
                                }
                            }
                            break;
                    }
                    break;

                case 102:
                    //rangeOsc1Knob message
                    var pos = velocity / 127;
                    modifyKnob(rangeOsc1Knob, 'range', pos);
                    break;

                case 103:
                    //rangeOsc2Knob message
                    var pos = velocity / 127;
                    modifyKnob(rangeOsc2Knob, 'range', pos);
                    break;

                case 104:
                    //rangeOsc3Knob message
                    var pos = velocity / 127;
                    modifyKnob(rangeOsc3Knob, 'range', pos);
                    break;

                case 105:
                    //freqOsc2Knob message
                    var pos = velocity / 127;
                    modifyKnob(freqOsc2Knob, 'frequency', pos);
                    break;

                case 106:
                    //freqOsc3Knob message
                    var pos = velocity / 127;
                    modifyKnob(freqOsc3Knob, 'frequency', pos);
                    break;

                case 107:
                    //waveformOsc1Knob message
                    var pos = velocity / 127;
                    modifyKnob(waveformOsc1Knob, 'waveform', pos);
                    break;

                case 108:
                    //waveformOsc2Knob message
                    var pos = velocity / 127;
                    modifyKnob(waveformOsc2Knob, 'waveform', pos);
                    break;

                case 109:
                    //waveformOsc3Knob message
                    var pos = velocity / 127;
                    modifyKnob(waveformOsc3Knob, 'waveform', pos);
                    break;

                case 110:
                    //volumeOsc1Knob message
                    var pos = velocity / 127;
                    modifyKnob(volumeOsc1Knob, 'cont', pos);
                    break;

                case 111:
                    //volumeOsc2Knob message
                    var pos = velocity / 127;
                    modifyKnob(volumeOsc2Knob, 'cont', pos);
                    break;

                case 112:
                    //volumeOsc3Knob message
                    var pos = velocity / 127;
                    modifyKnob(volumeOsc3Knob, 'cont', pos);
                    break;

                case 113:
                    //volumeNoiseKnob message
                    var pos = velocity / 127;
                    modifyKnob(volumeNoiseKnob, 'cont', pos);
                    break;

            }
    }
}
