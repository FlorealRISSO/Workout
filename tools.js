const WaveType = {
    SINE: 'sine',
    SQUARE: 'square',
    SAWTOOTH: 'sawtooth',
    TRIANGLE: 'triangle'
};

const DEFAULT_SOUND = 'sine';
const DEFAULT_SOUND_TIME = 2;

const SWITCHING_SOUND_KEY = 'switching_sound';
const WORKOUT_SOUND_KEY = 'workout_sound';

const SOUND_KEYS = [
    SWITCHING_SOUND_KEY,
    WORKOUT_SOUND_KEY,
]

const playSound = (second, type = WaveType.SINE, frequency = 440) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + second);
};

const playCustomSound = (type) => {
    const { sound, time } = getAudioData(type);
    playSound(time, sound);
}