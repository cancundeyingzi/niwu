function addParallaxEffect() {
    const parallaxSections = document.querySelectorAll('.parallax-section');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxSections.forEach((section) => {
            const background = section.querySelector('.parallax-bg');
            const speed = -1; // 调整这个值来改变视差效果的强度

            const yPos = -(scrolled - section.offsetTop) * speed;
            background.style.transform = `translateY(${yPos}px)`;
        });
    });
}


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

    // 下面是 tips 的内容
    const tipsContainer = document.getElementById('tips-container');
    const progressBar = document.getElementById('progress-bar');
    const tips = [//保持偶数,否则进度条方向会有问题
        "tips:4张图片与顶部导航栏可点击",
        "tips:我要成为文案高手!!!!!!.jpg"
    ];
    let currentTipIndex = 0;

    function showNextTip() {
        // 先将当前提示淡出
        tipsContainer.style.opacity = 0;
        
        setTimeout(() => {
            // 重置进度条并隐藏
            progressBar.style.transition = 'none';
            progressBar.style.width = '0';
            
            // 更新提示内容
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            tipsContainer.textContent = tips[currentTipIndex];
            
            // 创建临时span测量文本宽度
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.fontSize = window.getComputedStyle(tipsContainer).fontSize;
            tempSpan.style.fontFamily = window.getComputedStyle(tipsContainer).fontFamily;
            tempSpan.textContent = tips[currentTipIndex];
            document.body.appendChild(tempSpan);
            
            const textWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            
            // 显示新提示
            tipsContainer.style.opacity = 1;
            
            // 设置进度条方向（左右交替）
            const isReversed = currentTipIndex % 2 === 1;
            progressBar.style.transform = isReversed ? 'scaleX(-1)' : 'scaleX(1)';
            
            // 根据方向设置起始位置
            if (isReversed) {
                progressBar.style.right = `${(tipsContainer.offsetWidth - textWidth) / 2}px`;
                progressBar.style.left = 'auto';
            } else {
                progressBar.style.left = `${(tipsContainer.offsetWidth - textWidth) / 2}px`;
                progressBar.style.right = 'auto';
            }
            
            progressBar.style.width = '0';
            progressBar.style.maxWidth = `${textWidth}px`;
            
            // 强制浏览器重排
            progressBar.offsetHeight;
            
            // 恢复过渡效果并开始新的进度条动画
            progressBar.style.transition = 'width 4s linear';
            progressBar.style.width = `${textWidth}px`;
        }, 500);
    }

    setInterval(showNextTip, 4000); // 每4秒执行一次这个函数
    showNextTip(); // 初始化显示第一个提示
    // tips结束
addParallaxEffect();
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

    function copyText2() {
        const input = document.getElementById("input2");
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        window.alert('复制1765875868成功');
    }