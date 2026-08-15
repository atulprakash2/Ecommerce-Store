// orders.js
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
    return;
  }
  const ordersContainer = document.getElementById('orders-list');
  if (ordersContainer) {
    loadOrders();
  }
});

async function loadOrders() {
  try {
    const orders = await getOrders();
    const container = document.getElementById('orders-list');
    if (!orders || orders.length === 0) {
      container.innerHTML = '<p>No orders yet.</p>';
      return;
    }
    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <h3>Order #${order._id}</h3>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod} | ${order.isPaid ? 'Paid' : 'Not Paid'}</p>
        <p><strong>Status:</strong> ${order.isDelivered ? 'Delivered' : 'Processing'}</p>
        <div class="order-items">
          ${order.orderItems.map(item => `
            <div class="order-item">
              <span>${item.name} x ${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error(error);
    document.getElementById('orders-list').innerHTML = '<p>Failed to load orders.</p>';
  }
}
