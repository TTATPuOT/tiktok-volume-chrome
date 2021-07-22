/**
 * Внимание! Дальше код говна, писал за 5 минут. Спасибо :*
 * Рекомендую переход на классы, ТупойСкрипт и ВебПак
 */

let volume = 0;
const mainClass = 'volume-control';

chrome.storage.sync.get("volume", (data) => {
    if (data.volume) {
        volume = data.volume;
        emoji.innerHTML = getEmoji(volume);
        setVolume(true);
        document.querySelector(`.${mainClass} input`).value = volume * 100;
    }
});


const getEmoji = volume => {
    if (volume > 0.5) return '🔊';
    else if (volume >= 0.25) return '🔉';
    else return '🔈';
}

const handleChange = ({ target }) => {
    volume = target.value / 100;
    emoji.innerHTML = getEmoji(volume);
    chrome.storage.sync.set({ volume });

    setVolume(true);
}

const input = document.createElement('input');
input.type = 'range';
input.min = 0;
input.max = 100;
input.value = volume ?? 100;
input.onchange = handleChange;

const emoji = document.createElement('div');
emoji.innerHTML = getEmoji(volume);

const volumeControl = document.createElement('div');
volumeControl.classList.add(mainClass);
volumeControl.append(input);
volumeControl.append(emoji);

document.body.append(volumeControl);

/*const getIcons = () => {
    const icons = document.querySelectorAll('.mute-icon');

    for (const icon of icons) {
        console.log(icon.parentNode.innerHTML);
        const parent = icon.parentNode.parentNode;
        const control = parent.querySelector(`.${mainClass}`);
        if (control === null) parent.append(volumeControl);
    }
}*/

const setVolume = (changeAllVideos = false) => {
    const selector = changeAllVideos ? 'video' : 'video:not(.volume-changed)';
    const videos = document.querySelectorAll(selector);

    for (const video of videos) {
        video.volume = volume;

        if (!video.classList.contains('volume-changed'))
            video.classList.add('volume-changed');
    }
}

//setInterval(getIcons, 500);
setInterval(setVolume, 100);
