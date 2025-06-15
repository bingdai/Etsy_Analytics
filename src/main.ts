import './styles/main.css';

interface OrderData {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

const mockOrders: OrderData[] = [
  { id: '#3428', customer: 'Sarah Johnson', product: 'Handknit Wool Socks', amount: '$32.00', status: 'shipped', date: '2025-01-06' },
  { id: '#3427', customer: 'Michael Chen', product: 'Cotton Ankle Socks (3 Pack)', amount: '$24.00', status: 'processing', date: '2025-01-06' },
  { id: '#3426', customer: 'Emma Davis', product: 'Bamboo Crew Socks', amount: '$28.00', status: 'pending', date: '2025-01-05' },
  { id: '#3425', customer: 'James Wilson', product: 'Merino Wool Hiking Socks', amount: '$36.00', status: 'delivered', date: '2025-01-05' },
  { id: '#3424', customer: 'Lisa Anderson', product: 'Compression Running Socks', amount: '$42.00', status: 'shipped', date: '2025-01-04' },
];

async function init() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App container not found');
    return;
  }

  app.innerHTML = `
    <div class="dashboard">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <h2>SocksCRM</h2>
          <span class="subtitle">Etsy Shop Manager</span>
        </div>
        
        <nav class="nav">
          <a href="#" class="nav-item active">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </a>
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Orders
          </a>
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            Products
          </a>
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
            </svg>
            Customers
          </a>
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Analytics
          </a>
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"></path>
            </svg>
            Messages
            <span class="badge">3</span>
          </a>
        </nav>
        
        <div class="nav-footer">
          <a href="#" class="nav-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
            </svg>
            Settings
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header class="header">
          <div>
            <h1>Dashboard</h1>
            <p class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div class="header-actions">
            <button class="btn-secondary">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Sync
            </button>
            <button class="btn-primary">+ New Order</button>
          </div>
        </header>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Total Revenue</span>
              <span class="stat-badge positive">+12.5%</span>
            </div>
            <div class="stat-value">$3,247</div>
            <div class="stat-subtitle">This month</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Orders</span>
              <span class="stat-badge positive">+8.2%</span>
            </div>
            <div class="stat-value">142</div>
            <div class="stat-subtitle">This month</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Avg Order Value</span>
              <span class="stat-badge negative">-2.4%</span>
            </div>
            <div class="stat-value">$22.88</div>
            <div class="stat-subtitle">Per order</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Pending Reviews</span>
              <span class="stat-badge neutral">0%</span>
            </div>
            <div class="stat-value">7</div>
            <div class="stat-subtitle">Awaiting response</div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="content-section">
          <div class="section-header">
            <h2>Recent Orders</h2>
            <a href="#" class="link">View all →</a>
          </div>
          
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${mockOrders.map(order => `
                  <tr>
                    <td class="order-id">${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.product}</td>
                    <td class="amount">${order.amount}</td>
                    <td><span class="status status-${order.status}">${order.status}</span></td>
                    <td>${order.date}</td>
                    <td class="actions">
                      <button class="btn-icon">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h3>Quick Actions</h3>
          <div class="action-grid">
            <button class="action-card">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Add Product</span>
            </button>
            <button class="action-card">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Schedule Post</span>
            </button>
            <button class="action-card">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Export Data</span>
            </button>
            <button class="action-card">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', init);