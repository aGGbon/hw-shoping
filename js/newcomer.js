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