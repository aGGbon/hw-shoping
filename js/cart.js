// 购物车页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 购物车数据
    let cartItems = [
        {
            id: 1,
            name: 'HUAWEI Pura 70',
            spec: '雅川青 256GB',
            desc: '超高速风驰闪拍 | 第二代昆仑玻璃',
            price: 4999,
            quantity: 1,
            image: 'img/1-PURA.png',
            selected: true
        },
        {
            id: 2,
            name: 'HUAWEI WATCH GT 5',
            spec: '曜金黑 46mm',
            desc: '玄玑感知系统 | 全新跑骑体验',
            price: 1588,
            quantity: 1,
            image: 'img/WATCH 系列.webp',
            selected: true
        }
    ];

    // 初始化页面
    function initCart() {
        updateCartDisplay();
        updateCartSummary();
        bindEvents();
    }

    // 更新购物车显示
    function updateCartDisplay() {
        const cartContent = document.getElementById('cart-content');
        const emptyCart = document.getElementById('empty-cart');
        
        if (cartItems.length === 0) {
            cartContent.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartContent.style.display = 'block';
            emptyCart.style.display = 'none';
            renderCartItems();
        }
    }

    // 渲染购物车商品
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const cartItem = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // 创建购物车商品元素
    function createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        
        cartItem.innerHTML = `
            <div class="item-checkbox">
                <input type="checkbox" class="item-select" ${item.selected ? 'checked' : ''}>
            </div>
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="item-spec">${item.spec}</p>
                <p class="item-desc">${item.desc}</p>
            </div>
            <div class="item-price">
                <span class="price">￥${item.price}</span>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="item-total">
                <span class="total-price">￥${item.price * item.quantity}</span>
            </div>
            <div class="item-actions">
                <button class="btn-remove">删除</button>
            </div>
        `;
        
        return cartItem;
    }

    // 更新购物车汇总
    function updateCartSummary() {
        const selectedItems = cartItems.filter(item => item.selected);
        const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingFee = totalPrice >= 48 ? 0 : 10;
        const finalPrice = totalPrice + shippingFee;
        
        // 更新显示
        document.getElementById('cart-count').textContent = cartItems.length;
        document.getElementById('total-price').textContent = `￥${totalPrice}`;
        document.getElementById('shipping-fee').textContent = `￥${shippingFee}`;
        document.getElementById('final-price').textContent = `￥${finalPrice}`;
        document.getElementById('checkout-count').textContent = selectedItems.length;
        
        // 更新全选状态
        const selectAllCheckbox = document.getElementById('select-all');
        const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
        selectAllCheckbox.checked = allSelected;
    }

    // 绑定事件
    function bindEvents() {
        // 商品选择事件
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('item-select')) {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                const selected = e.target.checked;
                
                updateItemSelection(itemId, selected);
            }
        });

        // 全选事件
        document.getElementById('select-all').addEventListener('change', function(e) {
            const selected = e.target.checked;
            cartItems.forEach(item => {
                item.selected = selected;
            });
            renderCartItems();
            updateCartSummary();
        });

        // 数量调整事件
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                const input = cartItem.querySelector('.quantity-input');
                const currentValue = parseInt(input.value);
                
                if (e.target.classList.contains('minus')) {
                    if (currentValue > 1) {
                        updateItemQuantity(itemId, currentValue - 1);
                    }
                } else if (e.target.classList.contains('plus')) {
                    if (currentValue < 99) {
                        updateItemQuantity(itemId, currentValue + 1);
                    }
                }
            }
        });

        // 数量输入事件
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('quantity-input')) {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                let value = parseInt(e.target.value);
                
                if (isNaN(value) || value < 1) {
                    value = 1;
                } else if (value > 99) {
                    value = 99;
                }
                
                e.target.value = value;
                updateItemQuantity(itemId, value);
            }
        });

        // 删除商品事件
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-remove')) {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                
                if (confirm('确定要删除这个商品吗？')) {
                    removeItem(itemId);
                }
            }
        });

        // 清空选中事件
        document.getElementById('clear-selected').addEventListener('click', function() {
            const selectedItems = cartItems.filter(item => item.selected);
            if (selectedItems.length === 0) {
                alert('没有选中的商品');
                return;
            }
            
            if (confirm(`确定要删除选中的 ${selectedItems.length} 件商品吗？`)) {
                cartItems = cartItems.filter(item => !item.selected);
                updateCartDisplay();
                updateCartSummary();
            }
        });

        // 结算事件
        document.getElementById('checkout-btn').addEventListener('click', function() {
            const selectedItems = cartItems.filter(item => item.selected);
            if (selectedItems.length === 0) {
                alert('请选择要结算的商品');
                return;
            }
            
            // 跳转到结算页面
            const checkoutData = selectedItems.map(item => ({
                id: item.id,
                quantity: item.quantity
            }));
            
            localStorage.setItem('checkoutItems', JSON.stringify(checkoutData));
            window.location.href = 'checkout.html';
        });

        // 推荐商品加入购物车
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-add-cart')) {
                const recommendationItem = e.target.closest('.recommendation-item');
                const productName = recommendationItem.querySelector('h3').textContent;
                const productPrice = parseInt(recommendationItem.querySelector('.price').textContent.replace('￥', ''));
                const productImage = recommendationItem.querySelector('img').src;
                
                addToCart({
                    id: Date.now(),
                    name: productName,
                    spec: '默认规格',
                    desc: '推荐商品',
                    price: productPrice,
                    quantity: 1,
                    image: productImage,
                    selected: true
                });
                
                alert('已添加到购物车');
            }
        });
    }

    // 更新商品选择状态
    function updateItemSelection(itemId, selected) {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            item.selected = selected;
            updateCartSummary();
        }
    }

    // 更新商品数量
    function updateItemQuantity(itemId, quantity) {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity = quantity;
            renderCartItems();
            updateCartSummary();
        }
    }

    // 删除商品
    function removeItem(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCartDisplay();
        updateCartSummary();
    }

    // 添加商品到购物车
    function addToCart(newItem) {
        // 检查是否已存在相同商品
        const existingItem = cartItems.find(item => item.name === newItem.name && item.spec === newItem.spec);
        
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            cartItems.push(newItem);
        }
        
        updateCartDisplay();
        updateCartSummary();
    }

    // 初始化购物车
    initCart();
}); 