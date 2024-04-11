import * as BSL from 'body-scroll-lock';

export const unlock = () => {
    const html = document.querySelector('html');
    BSL.enableBodyScroll(html)
    html.style.overflow = 'unset'
}

export const lock = () => {
    const html = document.querySelector('html');
    html.style.overflow = 'hidden'
    BSL.disableBodyScroll(html)
}