// $(document).ready(function() {
//     $('.tab-button').click(function() {
//         var target = $(this).data('target');
//         $('.register-right').hide(); // 隐藏所有register-right
//         $('#' + target).show(); // 显示目标register-right
//     });
 
//     // 初始化显示第一个表单
//     $('#phone-register').show();
// });


// 获取所有tab按钮
const tabButtons = document.querySelectorAll('.tab-button');
    
// 获取注册表单
const phoneRegister = document.getElementById('phone-register');
const emailRegister = document.getElementById('email-register');

// 监听按钮点击事件
tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        // 移除所有按钮的active类
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 给点击的按钮添加active类
        this.classList.add('active');

        // 根据目标ID显示对应的表单内容
        const target = this.getAttribute('data-target');
        if (target === 'phone-register') {
            phoneRegister.classList.add('active');
            emailRegister.classList.remove('active');
        } else if (target === 'email-register') {
            phoneRegister.classList.remove('active');
            emailRegister.classList.add('active');
        }
    });
});

// 默认显示手机号注册页面
document.addEventListener("DOMContentLoaded", function() {
    phoneRegister.classList.add('active'); // 默认显示手机号注册
    tabButtons[0].classList.add('active');  // 默认选中手机号注册按钮
});

