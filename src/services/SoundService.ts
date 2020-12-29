import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';


const SOUND_URL = 'https://hellodriven.github.io/mobile-static/v1/sounds/done-sound-mixdown.wav';
const options = {
    autoDestroy: false
}

const player = new Player(SOUND_URL, options).prepare();


export const PlaySound = () => {
    player.play();
}

