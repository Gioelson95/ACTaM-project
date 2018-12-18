/*--------------------suggest the browser to use--------------------*/

if (navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i) ||
	navigator.userAgent.match(/BlackBerry/i) ||
	navigator.userAgent.match(/Windows Phone/i)
) {
	alert("Isn't it difficult on the smartphone? Try it on the PC!");
} else {
	if (!(!!window.chrome && !!window.chrome.webstore)) {
		alert("For the best experience of music we recommend to use Google Chrome!");
	}
}

/*--------------------declare general variables--------------------*/
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
activeVoice = {};

var osc1Type = "sine";
var osc2Type = "triangle";
var osc3Type = "sawtooth";
var typeNoise = "white";

var volume1 = 1;
var volume2 = 1;
var volume3 = 0;
var volumeNoise = 0;

var attackTime = 0.10;
var decayTime = 0.10;
var sustainLevel = 0.8;
var releaseTime = 0.20;

var volumeGeneral = 0.5;
var isOn = false;

//crete general volume
var gainGeneral = context.createGain();
gainGeneral.gain.value = 1;
var gainOut = context.createGain();
gainOut.gain.value = volumeGeneral;

// tremolo
var real = new Float32Array(2);
var imag = new Float32Array(2);
var tremOsc = context.createOscillator();
var tremGain = context.createGain();
tremGain.gain.value = depth;

real[0] = 1 - depth / 2;
imag[0] = 0;
real[1] = 1;
imag[1] = 0;

var wave = context.createPeriodicWave(real, imag);

tremOsc.setPeriodicWave(wave);
tremOsc.frequency.value = rate;
tremOsc.connect(tremGain);
tremGain.connect(gainGeneral.gain);
tremOsc.start(0);

// delay

var delayNode = context.createDelay();
var outputGain = context.createGain();
var feedbackGain = context.createGain();

delayNode.delayTime.value = time;
outputGain.gain.value = 0;
feedbackGain.gain.value = feedback;

delayNode.connect(outputGain);
delayNode.connect(feedbackGain);
feedbackGain.connect(delayNode);

gainGeneral.connect(delayNode);
gainGeneral.connect(gainOut);
outputGain.connect(gainOut);

/*--------------------main sound function --------------------*/
var Voice = (function (context) {
	function Voice(frequency) {
		this.frequency = frequency;
		this.vca = context.createGain();
		this.oscillators = [];
		this.noiseBuffer = context.createBufferSource();

		this.osc1 = context.createOscillator();
		this.osc2 = context.createOscillator();
		this.osc3 = context.createOscillator();
		this.noise = noiseGenerated(this.noiseBuffer, typeNoise);

		this.gain1 = context.createGain();
		(osc1Button) ? this.gain1.gain.value = volume1: this.gain1.gain.value = 0;
		this.gain2 = context.createGain();
		(osc2Button) ? this.gain2.gain.value = volume2: this.gain2.gain.value = 0;
		this.gain3 = context.createGain();
		(osc3Button) ? this.gain3.gain.value = volume3: this.gain3.gain.value = 0;
		this.gainNoise = context.createGain();
		(noiseButton) ? this.gainNoise.gain.value = volumeNoise: this.gainNoise.gain.value = 0;
	}

	Voice.prototype.start = function () {

		//create oscilloscopes
		this.osc1.type = osc1Type;
		this.osc1.frequency.value = this.frequency / range1;
		this.osc1.detune.value = sliderDetune + generalTune;


		this.osc2.type = osc2Type;
		this.osc2.frequency.value = this.frequency / range2;
		this.osc2.detune.value = frequency2SemitoneDetune + sliderDetune + generalTune;

		this.osc3.type = osc3Type;
		this.osc3.frequency.value = this.frequency / range3;
		this.osc3.detune.value = frequency3SemitoneDetune + sliderDetune + generalTune;

		//envelope
		//initialize
		this.vca.gain.cancelScheduledValues(0);
		this.vca.gain.setValueAtTime(0, context.currentTime);
		//control envelope on start (attack and decay)
		this.vca.gain.linearRampToValueAtTime(1, context.currentTime + attackTime);
		this.vca.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + attackTime + decayTime);

		//connect component each other
		this.osc1.connect(this.gain1);
		this.osc2.connect(this.gain2);
		this.osc3.connect(this.gain3);
		this.noise.connect(this.gainNoise);
		this.gain1.connect(this.vca);
		this.gain2.connect(this.vca);
		this.gain3.connect(this.vca);
		this.gainNoise.connect(this.vca);
		this.vca.connect(gainGeneral);
		gainOut.connect(context.destination);

		//start
		this.osc1.start(0);
		this.osc2.start(0);
		this.osc3.start(0);
		this.noise.start(0);

		//add to array of active sounds
		this.oscillators.push(this.osc1);
		this.oscillators.push(this.osc2);
		this.oscillators.push(this.osc3);
		this.oscillators.push(this.noise);
	};

	Voice.prototype.stop = function () {

		//control envelope on stop (release)
		this.vca.gain.cancelScheduledValues(0);
		this.vca.gain.setValueAtTime(this.vca.gain.value, context.currentTime);
		this.vca.gain.linearRampToValueAtTime(0, context.currentTime + releaseTime);

		this.oscillators.forEach(function (oscillator) {
			//stop all active sounds
			oscillator.stop(context.currentTime + releaseTime);
		});
	};

	return Voice;
})(context);


/*--------------------noise function--------------------*/
function noiseGenerated(bufferSource, type) {
	var bufferSize = context.sampleRate,
		noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate),
		output = noiseBuffer.getChannelData(0);

	if (type === "white") {
		for (var i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1;
			output[i] *= 0.3;
		}
	} else if (type === "pink") {
		var b0, b1, b2, b3, b4, b5, b6;
		b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

		for (var j = 0; j < bufferSize; j++) {
			var white = Math.random() * 2 - 1;
			b0 = 0.99886 * b0 + white * 0.0555179;
			b1 = 0.99332 * b1 + white * 0.0750759;
			b2 = 0.96900 * b2 + white * 0.1538520;
			b3 = 0.86650 * b3 + white * 0.3104856;
			b4 = 0.55000 * b4 + white * 0.5329522;
			b5 = -0.7616 * b5 - white * 0.0168980;
			output[j] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
			output[j] *= 0.11; // (roughly) compensate for gain
			output[i] *= 0.3;

			b6 = white * 0.115926;
		}
	}

	bufferSource.buffer = noiseBuffer;
	bufferSource.loop = true;

	return bufferSource;
}


/*--------------------play and stop oscillators--------------------*/
function playOscillator(key) {
	var freq = noteMap.get(key);
	var voice = new Voice(freq);
	if (activeVoice[freq] === undefined) {
		activeVoice[freq] = voice;
		if (isOn) {
			voice.start();
		}
	}

	var k = document.getElementById(key);
	if (k.className === "white") {
		k.style.width = "28px";
		k.style.height = "212px";
	} else if (k.className === "black") {
		k.style.width = "14px";
		k.style.height = "95px";
	}

};

function stopOscillator(key) {

	var freq = noteMap.get(key);

	if (isSustainPressed) {
		activeVoiceSustain[key] = key;
		//activeVoiceSustain.push(key);
		return;
	}

	if (!isSustainPressed) {

		var freq = noteMap.get(key);
		if (activeVoice[freq] === undefined) {
			return;
		}
		activeVoice[freq].stop();
		delete activeVoice[freq];

		var k = document.getElementById(key);
		if (k.className === "white") {
			k.style.width = "30px";
			k.style.height = "225px";
		} else if (k.className === "black") {
			k.style.width = "16px";
			k.style.height = "100px";
		}

	}

};

function stopAll() {
	var mapSize = noteMap.size;
	var iterator = noteMap.keys();
	for (var i = 0; i < mapSize; i++) {
		var key = iterator.next().value;
		stopOscillator(key);
	}
}


/*--------------------generate sinusoid at 440Hz--------------------*/
var A440Sin = null;
var A440Gain = context.createGain();
var A440 = false;

function play400() {
	if (A440 && isOn) {
		var osc = context.createOscillator();
		osc.type = "sine";
		osc.frequency.value = 440;
		A440Gain.gain.value = volumeGeneral * 1.3;
		osc.connect(A440Gain);
		A440Gain.connect(gainOut);
		gainOut.connect(context.destination);
		osc.start();
		A440Sin = osc;
	} else {
		A440Gain.gain.cancelScheduledValues(0);
		A440Gain.gain.setValueAtTime(A440Gain.gain.value, context.currentTime);
		A440Gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.1);
		A440Sin.stop(context.currentTime + 0.1);
	}

}
