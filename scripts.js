document.addEventListener('DOMContentLoaded', function () {
    // 获取所有标签元素
    const tabs = document.querySelectorAll('.tab');
    // 获取滑块元素
    const glider = document.querySelector('.glider');
    // 获取所有单选按钮
    const radios = document.querySelectorAll('.container input[type="radio"]');
    // 获取主题切换复选框
    const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
    // 获取 body 元素
    const body = document.body;

    // 定义内容区域的映射
    const contentDivs = {
        'radio-1': document.querySelector('.welcome'),
        'radio-2': document.querySelector('.立即上车'),
        'radio-3': document.querySelector('.睡觉'),
        'radio-4': document.querySelector('.吃饭')
    };

    // 记录之前选中的 tab 索引
    let previousIndex = 0;

    // 更新滑块位置和宽度
    function updateGlider() {
        // 获取当前选中的单选按钮
        const checkedRadio = document.querySelector('.container input[type="radio"]:checked');
        // 获取对应的标签元素
        const label = document.querySelector(`label[for="${checkedRadio.id}"]`);
        // 设置滑块的宽度为标签的宽度
        glider.style.width = `${label.offsetWidth}px`;
        // 设置滑块的位置
        glider.style.transform = `translateX(${label.offsetLeft - 12.5}px)`; // 调整偏移量
    }

    // 显示选中的内容区域
    function showContent(selectedId, direction) {
        for (const [id, div] of Object.entries(contentDivs)) {
            // 移除所有可能存在的动画类
            div.classList.remove('slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');

            if (id === selectedId) {
                // 添加进入动画类
                if (direction === 'left') {
                    div.classList.add('slide-left-in');
                    console.log("触发left-in");
                } else {
                    div.classList.add('slide-right-in');
                    console.log("触发right-in");
                }
                // 添加 active 类以显示内容
                div.classList.add('active');
            } else {
                if (div.classList.contains('active')) {
                    // 添加退出动画类
                    if (direction === 'left') {
                        div.classList.add('slide-left-out');
                        console.log("触发left-out");
                    } else {
                        div.classList.add('slide-right-out');
                        console.log("触发right-out");
                    }
                    // 延迟0.4秒后移除(性能问题,0.5秒在慢的机器上会闪) active 类以隐藏内容
                    setTimeout(() => {
                        div.classList.remove('active');
                    }, 400);
                }
            }
        }
    }

    // 移除动画类以便下次动画使用
    function handleAnimationEnd(event) {
        const div = event.target;
        div.classList.remove('slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
    }

    // 为所有内容 div 添加动画结束的监听器
    Object.values(contentDivs).forEach(div => {
        div.addEventListener('animationend', handleAnimationEnd);
        div.addEventListener('webkitAnimationEnd', handleAnimationEnd); // 兼容 Webkit 浏览器
    });

    // 为每个单选按钮添加 change 事件监听器
    radios.forEach((radio, index) => {
        radio.addEventListener('change', function () {
            // 获取当前选中的单选按钮索引8788
            const selectedIndex = Array.from(radios).indexOf(this);
            // 判断切换方向
            const direction = selectedIndex > previousIndex ? 'left' : 'right';
            // 更新之前选中的索引
            previousIndex = selectedIndex;
            // 更新滑块位置
            updateGlider();
            // 显示对应的内容区域
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

// 加载动画保持不变

// 移除视差相关的JavaScript代码
/*
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.img');
    console.log('Scrolled:', scrolled); // 调试信息
    parallaxElements.forEach(element => {
        console.log('Element:', element); // 调试信息
        element.style.backgroundPositionY = -(scrolled * 0.5) + 'px'; // 调整滚动速度
    });
});
*/