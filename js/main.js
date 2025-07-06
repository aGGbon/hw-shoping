var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,/* 滑块之间距离30像素 */
    centeredSlides: true,/* 活动滑块（当前显示的滑块）将始终居中显示 */
    autoplay: {/* 自动播放 */
        delay: 2500,/* 延迟时间2.5s */
        disableOnInteraction: false,/* 这允许滑块在用户交互后继续自动播放 */
    },
    pagination: {/* 分页器 */
        el: ".swiper-pagination",/* 指定分页器容器的选择器 */
        clickable: true,/* 分页器圆点是可点击的 */
    },
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
});


document.addEventListener('DOMContentLoaded', function() { 
    // 当文档内容被完全加载和解析完成之后，执行这个函数
    const infoFlElements = document.querySelectorAll('.info-fl'); 
    // 选择页面上所有类名为'.info-fl'的元素，并将它们存储在一个常量中
    
    infoFlElements.forEach(infoFl => { 
        // 遍历所有'.info-fl'元素
        const links = infoFl.querySelectorAll('a'); 
        // 对于每个'.info-fl'元素，选择它内部所有的'<a>'标签，并将它们存储在一个常量中
        
        // 定义一个数组来存储你想要选择的索引（注意：数组索引从0开始）
        const targetIndices = [6,7,8,9,12,16,19,21]; // 这里7对应第8个元素，9对应第10个元素，16对应第17个元素（在DOM中的实际位置）
    
        links.forEach((link, index) => { // 遍历所有'<a>'标签
            if (targetIndices.includes(index)) { // 检查当前'<a>'标签的索引是否在目标索引数组中
                link.style.borderRight = 'none'; // 如果在，则将该'<a>'标签的右边框设置为'none'（即无边框）
            }
        });
    });
});

/* 返回顶部 */
// 获取页面中ID为toTop的元素
var toTop = document.querySelector("#toTop");    
        
// 一开始将“返回顶部”按钮隐藏
toTop.style.display = "none";  

// 给window对象添加滚动事件监听，当页面滚动时触发scrollHandler函数
window.addEventListener("scroll", scrollHandler);

// 定义scrollHandler函数，用于处理滚动事件
function scrollHandler(e) {        
    // 获取当前页面的垂直滚动距离，兼容不同浏览器
    var distanceY = document.documentElement.scrollTop || document.body.scrollTop;/*  获取滚动条位置  网页被卷去的高 */

    // 如果页面滚动距离大于50px，则显示返回顶部按钮，否则隐藏
    if (distanceY > 50) {
        toTop.style.display = "block";  // 显示返回顶部按钮
    } else {
        toTop.style.display = "none";   // 隐藏返回顶部按钮
    }
}

// 给返回顶部按钮（toTop）添加点击事件监听
toTop.addEventListener("click", clickHandler);

// 定义点击事件处理函数clickHandler，用于实现平滑滚动回顶部
function clickHandler(e) {
    // 创建一个定时器，每50毫秒执行一次
    let timer = setInterval(function () {
        // 获取当前页面的垂直滚动距离，兼容不同浏览器
        var distanceY = document.documentElement.scrollTop || document.body.scrollTop;

        // 如果页面滚动位置已经为0，停止定时器，结束滚动
        if (distanceY == 0) {
            clearInterval(timer);  // 清除定时器
            return;  // 退出函数
        } 
        
        // 计算每次滚动的步长，speed值会随着滚动距离的减小而逐渐减小，实现加速后减速的效果
        var speed = Math.ceil(distanceY / 16);  // 步长为当前滚动距离的1/16，确保逐渐减速
        
        // 更新滚动条的位置，逐步回到顶部
        document.documentElement.scrollTop = distanceY - speed;
    }, 16);  // 每16毫秒更新一次滚动位置，模拟平滑滚动
}



/* 搜索按钮伸缩功能 */
/* 通过document.querySelector将.searchBar传递进去 */
let oSearchBar = document.querySelector('.searchBar');
/* 获取icon的对象 */
let oIcon = document.querySelector('.icon');
/* 获取Clear对象*/
let oClear = document.querySelector('.clear');
/* 获取input的对象 */
let oText = document.querySelector('input[type="text"]');

/* 监听点击事件，当监听到这个时候，执行一个处理函数 */
oIcon.addEventListener('click',() => {
    /* 动态切换他的方法 */
    oSearchBar.classList.toggle('changeWidth');
});

/* 监听点击事件，当监听到这个时候，执行一个处理函数 */
oClear.addEventListener('click',() => {
    /* 让它的内容变空 */
    oText.value = '';
});

/* 搜索功能 */
document.getElementById('go').addEventListener('click', function() {
    const searchTerm = oText.value.trim();
    if (searchTerm) {
        // 跳转到产品列表页面并传递搜索关键词
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// 回车键搜索
oText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('go').click();
    }
});

/* 产品卡片点击事件 */
document.addEventListener('click', function(e) {
    if (e.target.closest('.pb-list') || e.target.closest('.pb-list-B')) {
        const productCard = e.target.closest('.pb-list, .pb-list-B');
        const productLink = productCard.querySelector('a');
        if (productLink && productLink.href) {
            window.location.href = productLink.href;
        }
    }
});

/* 快速导航点击事件 */
document.addEventListener('click', function(e) {
    if (e.target.closest('.home-nav a')) {
        const navLink = e.target.closest('.home-nav a');
        if (navLink.href && navLink.href !== '#') {
            // 导航链接已设置，无需额外处理
        }
    }
});

/* 新人专区点击事件 */
document.addEventListener('click', function(e) {
    if (e.target.closest('.index-new a')) {
        const newcomerLink = e.target.closest('.index-new a');
        if (newcomerLink.href && newcomerLink.href !== '#') {
            // 新人专区链接已设置，无需额外处理
        }
    }
});

/* 页面加载完成后的初始化 */
document.addEventListener('DOMContentLoaded', function() {
    // 检查URL参数，如果有搜索关键词，自动填充到搜索框
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        oText.value = decodeURIComponent(searchParam);
    }
    
    // 添加产品卡片的悬停效果
    const productCards = document.querySelectorAll('.pb-list, .pb-list-B');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
