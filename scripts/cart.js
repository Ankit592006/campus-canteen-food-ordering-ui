let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  showToast("Item added to cart!");
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.innerHTML = `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}
                       <button onclick='removeFromCart(${item.id})'>❌</button>`;
      cartItemsContainer.appendChild(div);
    });
  }

  document.getElementById('cart-total').innerText = total.toFixed(2);
  document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function placeOrder() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const newOrder = {
    id: Date.now(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleString(),
    status: "Preparing"
  };
  orders.unshift(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
  showToast("Order placed successfully!");
  setTimeout(() => window.location.href = 'my-orders.html', 1000);
}

document.getElementById('cart-icon').addEventListener('click', () => {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.getElementById('theme-toggle').innerText = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('overlay')?.classList.remove('show');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}