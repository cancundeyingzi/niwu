document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const glider = document.querySelector('.glider');
    const radios = document.querySelectorAll('.container input[type="radio"]');
    const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
    const body = document.body;

    const contentDivs = {
        'radio-1': document.querySelector('.hello'),
        'radio-2': document.querySelector('.立即上车'),
        'radio-3': document.querySelector('.睡觉'),
        'radio-4': document.querySelector('.吃饭')
    };

    let previousIndex = 0; // 记录之前选中的tab索引

    function updateGlider() {
        const checkedRadio = document.querySelector('.container input[type="radio"]:checked');
        const label = document.querySelector(`label[for="${checkedRadio.id}"]`);
        glider.style.width = `${label.offsetWidth}px`;
        glider.style.transform = `translateX(${label.offsetLeft - 12.5}px)`; // 调整偏移量
    }

    function showContent(selectedId, direction) {
        for (const [id, div] of Object.entries(contentDivs)) {
            if (id === selectedId) {
                // 添加进入动画类
                if (direction === 'left') {
                    div.classList.add('slide-left-in');
                } else {
                    div.classList.add('slide-right-in');
                }
                div.classList.add('active');
            } else {
                if (div.classList.contains('active')) {
                    // 添加退出动画类
                    if (direction === 'left') {
                        div.classList.add('slide-left-out');
                    } else {
                        div.classList.add('slide-right-out');
                    }
                    div.classList.remove('active');
                }
            }
        }
    }

// 移除动画类以便下次动画使用
    function handleAnimationEnd(event) {
        console.log(`Animation ended for: ${event.target.className}`);
        const div = event.target;
        div.classList.remove('slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
    }

// 为所有内容div添加动画结束的监听器
    Object.values(contentDivs).forEach(div => {
        div.addEventListener('animationend', handleAnimationEnd);
        div.addEventListener('webkitAnimationEnd', handleAnimationEnd); // 兼容Webkit浏览器
    });


    radios.forEach((radio, index) => {
        radio.addEventListener('change', function () {
            const selectedIndex = Array.from(radios).indexOf(this);
            const direction = selectedIndex > previousIndex ? 'left' : 'right';
            previousIndex = selectedIndex;
            updateGlider();
            showContent(this.id, direction);
        });
    });

    // 初始化滑块位置和显示内容
    updateGlider();
    const initiallyChecked = document.querySelector('.container input[type="radio"]:checked');
    if (initiallyChecked) {
        showContent(initiallyChecked.id, 'left'); // 默认方向为左
    }

    // 切换主题颜色
    themeSwitchCheckbox.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });
});