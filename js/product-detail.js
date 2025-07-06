// 产品详情页JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 产品数据
    const products = {
        1: {
            name: 'HUAWEI Pura 70',
            subtitle: '超高速风驰闪拍 | 第二代昆仑玻璃',
            price: 4999,
            originalPrice: 5999,
            images: ['img/1-PURA.png', 'img/1-MATE.png', 'img/1-POCKET.png', 'img/MatePad Pro 系列.webp'],
            colors: ['雅川青', '雪域白', '曜金黑'],
            storage: ['256GB', '512GB', '1TB'],
            specs: {
                screen: '6.6英寸 OLED 曲面屏',
                processor: '麒麟9000S',
                storage: '256GB/512GB/1TB',
                camera: '5000万像素主摄 + 1300万像素超广角 + 1200万像素长焦',
                battery: '4750mAh',
                charging: '88W有线快充 + 50W无线快充'
            }
        },
        2: {
            name: 'HUAWEI Mate 60',
            subtitle: '卫星通信 | 昆仑玻璃 | 超长续航',
            price: 5999,
            originalPrice: 6999,
            images: ['img/1-MATE.png', 'img/1-PURA.png', 'img/1-POCKET.png', 'img/MatePad Pro 系列.webp'],
            colors: ['雅川青', '雪域白', '曜金黑'],
            storage: ['256GB', '512GB', '1TB'],
            specs: {
                screen: '6.69英寸 OLED 曲面屏',
                processor: '麒麟9000S',
                storage: '256GB/512GB/1TB',
                camera: '5000万像素主摄 + 1200万像素超广角 + 4800万像素长焦',
                battery: '4750mAh',
                charging: '88W有线快充 + 50W无线快充'
            }
        },
        3: {
            name: 'HUAWEI Pocket 2',
            subtitle: '折叠屏 | 轻薄设计 | 时尚外观',
            price: 7999,
            originalPrice: 8999,
            images: ['img/1-POCKET.png', 'img/1-PURA.png', 'img/1-MATE.png', 'img/MatePad Pro 系列.webp'],
            colors: ['雅川青', '雪域白', '曜金黑'],
            storage: ['256GB', '512GB', '1TB'],
            specs: {
                screen: '6.8英寸 OLED 折叠屏',
                processor: '麒麟9000S',
                storage: '256GB/512GB/1TB',
                camera: '5000万像素主摄 + 1300万像素超广角 + 1200万像素长焦',
                battery: '4520mAh',
                charging: '66W有线快充 + 50W无线快充'
            }
        },
        4: {
            name: 'HUAWEI MatePad Pro',
            subtitle: '鸿蒙系统 | 手写笔 | 办公利器',
            price: 3999,
            originalPrice: 4999,
            images: ['img/MatePad Pro 系列.webp', 'img/1-PURA.png', 'img/1-MATE.png', 'img/1-POCKET.png'],
            colors: ['雅川青', '雪域白', '曜金黑'],
            storage: ['128GB', '256GB', '512GB'],
            specs: {
                screen: '11英寸 OLED 全面屏',
                processor: '麒麟9000S',
                storage: '128GB/256GB/512GB',
                camera: '1300万像素主摄 + 800万像素前置',
                battery: '8300mAh',
                charging: '66W有线快充 + 50W无线快充'
            }
        }
    };

    // 获取URL参数
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // 初始化页面
    function initPage() {
        const productId = getUrlParameter('id') || 1;
        const product = products[productId];
        
        if (product) {
            updateProductInfo(product);
            updateProductImages(product.images);
            updateProductSpecs(product.specs);
        }
    }

    // 更新产品信息
    function updateProductInfo(product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-title').textContent = product.name;
        document.querySelector('.product-subtitle').textContent = product.subtitle;
        document.getElementById('product-price').textContent = product.price;
        document.querySelector('.original-price .price-value').textContent = product.originalPrice;
    }

    // 更新产品图片
    function updateProductImages(images) {
        const mainImage = document.getElementById('main-image');
        const thumbnailList = document.querySelector('.thumbnail-list');
        
        // 更新主图
        mainImage.src = images[0];
        
        // 更新缩略图
        thumbnailList.innerHTML = '';
        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.setAttribute('data-src', image);
            thumbnail.innerHTML = `<img src="${image}" alt="">`;
            thumbnailList.appendChild(thumbnail);
        });
    }

    // 更新产品规格
    function updateProductSpecs(specs) {
        const specsTable = document.querySelector('.specs-table');
        specsTable.innerHTML = '';
        
        Object.entries(specs).forEach(([key, value]) => {
            const specRow = document.createElement('div');
            specRow.className = 'spec-row';
            specRow.innerHTML = `
                <div class="spec-label">${getSpecLabel(key)}</div>
                <div class="spec-value">${value}</div>
            `;
            specsTable.appendChild(specRow);
        });
    }

    // 获取规格标签
    function getSpecLabel(key) {
        const labels = {
            screen: '屏幕',
            processor: '处理器',
            storage: '存储',
            camera: '摄像头',
            battery: '电池',
            charging: '充电'
        };
        return labels[key] || key;
    }

    // 缩略图点击事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.thumbnail')) {
            const thumbnail = e.target.closest('.thumbnail');
            const imageSrc = thumbnail.getAttribute('data-src');
            
            // 更新主图
            document.getElementById('main-image').src = imageSrc;
            
            // 更新缩略图状态
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
        }
    });

    // 规格选择事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.option-item')) {
            const optionItem = e.target.closest('.option-item');
            const optionGroup = optionItem.closest('.option-group');
            
            // 移除同组其他选项的active状态
            optionGroup.querySelectorAll('.option-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加当前选项的active状态
            optionItem.classList.add('active');
        }
    });

    // 数量调整
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const input = e.target.parentNode.querySelector('.quantity-input');
            const currentValue = parseInt(input.value);
            
            if (e.target.classList.contains('minus')) {
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            } else if (e.target.classList.contains('plus')) {
                if (currentValue < 99) {
                    input.value = currentValue + 1;
                }
            }
        }
    });

    // 数量输入框事件
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            let value = parseInt(e.target.value);
            if (isNaN(value) || value < 1) {
                e.target.value = 1;
            } else if (value > 99) {
                e.target.value = 99;
            }
        }
    });

    // 加入购物车
    document.getElementById('add-to-cart').addEventListener('click', function() {
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        const selectedColor = document.querySelector('.option-group:first-child .option-item.active').getAttribute('data-value');
        const selectedStorage = document.querySelector('.option-group:last-child .option-item.active').getAttribute('data-value');
        
        // 这里可以添加购物车逻辑
        alert(`已添加到购物车：${quantity}件 ${selectedColor} ${selectedStorage}版本`);
    });

    // 立即购买
    document.getElementById('buy-now').addEventListener('click', function() {
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        const selectedColor = document.querySelector('.option-group:first-child .option-item.active').getAttribute('data-value');
        const selectedStorage = document.querySelector('.option-group:last-child .option-item.active').getAttribute('data-value');
        
        // 跳转到结算页面
        window.location.href = `checkout.html?quantity=${quantity}&color=${selectedColor}&storage=${selectedStorage}`;
    });

    // 标签页切换
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-item')) {
            const tabItem = e.target;
            const tabName = tabItem.getAttribute('data-tab');
            
            // 更新标签页状态
            document.querySelectorAll('.tab-item').forEach(item => {
                item.classList.remove('active');
            });
            tabItem.classList.add('active');
            
            // 更新内容面板
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
        }
    });

    // 初始化页面
    initPage();
}); 