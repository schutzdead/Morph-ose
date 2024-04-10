import * as BSL from 'body-scroll-lock';

export const unlock = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto'
    BSL.disableBodyScroll(body)
}

export const lock = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden'
    BSL.disableBodyScroll(body)
}

