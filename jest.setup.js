const setCustomViewPort = () => {
    // 例えば、viewportのサイズを設定
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
    window.dispatchEvent(new Event('resize'));
};
setCustomViewPort();