document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
    const root = document.documentElement;

    themeSwitchCheckbox.addEventListener('change', () => {
        if (themeSwitchCheckbox.checked) {
            root.style.setProperty('--theme-color', '#333');
            root.style.setProperty('--text-color', '#fff');
        } else {
            root.style.setProperty('--theme-color', '#e8e8e8');
            root.style.setProperty('--text-color', '#000');
        }
    });
});