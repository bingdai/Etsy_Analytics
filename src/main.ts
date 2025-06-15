import './styles/main.css';

interface MetricData {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface SegmentData {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconClass: string;
  stats: {
    customers: number;
    avgOrder: number;
    revenueShare: number;
    ltv: string;
  };
}

interface ProductData {
  id: string;
  name: string;
  category: string;
  revenue: number;
  unitsSold: number;
  performance: number;
  status: 'bestseller' | 'trending' | 'regular';
  icon: string;
}

const metrics: MetricData[] = [
  { label: 'TOTAL REVENUE', value: '$47,382', change: 23.5, trend: 'up', icon: '💰', color: 'blue' },
  { label: 'CONVERSION RATE', value: '4.8%', change: 0.7, trend: 'up', icon: '📈', color: 'green' },
  { label: 'AVERAGE ORDER VALUE', value: '$127.45', change: 15.2, trend: 'up', icon: '🛒', color: 'purple' },
  { label: 'ACTIVE CUSTOMERS', value: '2,847', change: -3.2, trend: 'down', icon: '👥', color: 'orange' }
];

const segments: SegmentData[] = [
  {
    id: 'vip',
    name: 'VIP Customers',
    description: 'Top 10% spenders with 5+ purchases in the last year',
    icon: '👑',
    iconClass: 'vip',
    stats: { customers: 287, avgOrder: 385, revenueShare: 45, ltv: '8.2x' }
  },
  {
    id: 'loyal',
    name: 'Loyal Customers',
    description: 'Repeat buyers with consistent purchase patterns',
    icon: '💎',
    iconClass: 'loyal',
    stats: { customers: 892, avgOrder: 145, revenueShare: 28, ltv: '3.5x' }
  },
  {
    id: 'new',
    name: 'New Customers',
    description: 'First-time buyers in the last 60 days',
    icon: '🌟',
    iconClass: 'new',
    stats: { customers: 456, avgOrder: 67, revenueShare: 12, ltv: '24%' }
  },
  {
    id: 'risk',
    name: 'At Risk',
    description: 'Previously active customers with no recent purchases',
    icon: '⚠️',
    iconClass: 'risk',
    stats: { customers: 234, avgOrder: 120, revenueShare: 2.8, ltv: '65%' }
  }
];

const products: ProductData[] = [
  { id: '1', name: 'Handcrafted Ceramic Vase Set', category: 'Home Decor', revenue: 8234, unitsSold: 124, performance: 95, status: 'bestseller', icon: '🏺' },
  { id: '2', name: 'Sterling Silver Moon Necklace', category: 'Jewelry', revenue: 6892, unitsSold: 89, performance: 80, status: 'trending', icon: '💍' },
  { id: '3', name: 'Organic Cotton Scarf Collection', category: 'Fashion', revenue: 5421, unitsSold: 156, performance: 70, status: 'trending', icon: '🧣' },
  { id: '4', name: 'Soy Wax Aromatherapy Candles', category: 'Wellness', revenue: 4127, unitsSold: 203, performance: 60, status: 'bestseller', icon: '🕯️' }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function renderMetricCard(metric: MetricData): string {
  const trendClass = metric.trend === 'up' ? 'change-positive' : 'change-negative';
  const trendIcon = metric.trend === 'up' ? '↑' : '↓';
  
  return `
    <div class="metric-card ${metric.color}">
      <div class="metric-header">
        <div class="metric-label">${metric.label}</div>
        <div class="metric-icon ${metric.color}">${metric.icon}</div>
      </div>
      <div class="metric-value">${metric.value}</div>
      <div class="metric-change ${trendClass}">
        ${trendIcon} ${Math.abs(metric.change)}% from last month
      </div>
      <div class="metric-sparkline"></div>
    </div>
  `;
}

function renderSegmentCard(segment: SegmentData): string {
  return `
    <div class="segment-card">
      <div class="segment-icon ${segment.iconClass}">${segment.icon}</div>
      <h3 class="segment-name">${segment.name}</h3>
      <p class="segment-description">${segment.description}</p>
      <div class="segment-stats">
        <div class="segment-stat">
          <div class="segment-stat-value">${segment.stats.customers}</div>
          <div class="segment-stat-label">Customers</div>
        </div>
        <div class="segment-stat">
          <div class="segment-stat-value">$${segment.stats.avgOrder}</div>
          <div class="segment-stat-label">Avg. Order</div>
        </div>
        <div class="segment-stat">
          <div class="segment-stat-value">${segment.stats.revenueShare}%</div>
          <div class="segment-stat-label">Revenue Share</div>
        </div>
        <div class="segment-stat">
          <div class="segment-stat-value">${segment.stats.ltv}</div>
          <div class="segment-stat-label">${segment.id === 'risk' ? 'Win-back Rate' : segment.id === 'new' ? 'Return Rate' : 'Lifetime Value'}</div>
        </div>
      </div>
    </div>
  `;
}

function renderProductRow(product: ProductData): string {
  return `
    <tr>
      <td>
        <div class="product-cell">
          <div class="product-image">${product.icon}</div>
          <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.category}</div>
          </div>
        </div>
      </td>
      <td style="font-weight: 600;">${formatCurrency(product.revenue)}</td>
      <td>${product.unitsSold}</td>
      <td>
        <div class="performance-bar">
          <div class="performance-fill" style="width: ${product.performance}%;"></div>
        </div>
      </td>
      <td><span class="tag ${product.status}">${product.status === 'bestseller' ? 'Bestseller' : 'Trending'}</span></td>
    </tr>
  `;
}

function renderAnalyticsDashboard(): string {
  return `
    <!-- Top Navigation -->
    <nav class="top-nav">
      <div class="brand">
        <div class="brand-logo">E</div>
        <div class="brand-name">Etsy Analytics Pro</div>
      </div>
      
      <div class="nav-tabs">
        <button class="nav-tab active">Overview</button>
        <button class="nav-tab">Sales</button>
        <button class="nav-tab">Customers</button>
        <button class="nav-tab">Products</button>
        <button class="nav-tab">Marketing</button>
      </div>
      
      <div class="nav-actions">
        <div class="date-selector">
          📅 Last 30 Days ▼
        </div>
        <button class="btn-icon">🔔</button>
        <button class="btn-icon">⚙️</button>
        <button class="btn-icon">👤</button>
      </div>
    </nav>

    <!-- Main Container -->
    <div class="main-container">
      <!-- Key Metrics -->
      <div class="metrics-grid">
        ${metrics.map(metric => renderMetricCard(metric)).join('')}
      </div>

      <!-- Analytics Charts -->
      <div class="analytics-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">Revenue Analytics</h3>
            <div class="chart-options">
              <button class="chart-option active">Daily</button>
              <button class="chart-option">Weekly</button>
              <button class="chart-option">Monthly</button>
            </div>
          </div>
          <div class="chart-placeholder">
            <span>Interactive Revenue Chart with Multiple Metrics</span>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">Sales by Category</h3>
            <button class="btn-icon">⋮</button>
          </div>
          <div class="chart-placeholder" style="height: 300px;">
            <span>Interactive Donut Chart</span>
          </div>
        </div>
      </div>

      <!-- Customer Segments -->
      <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Customer Segments</h2>
      <div class="segment-grid">
        ${segments.map(segment => renderSegmentCard(segment)).join('')}
      </div>

      <!-- Product Performance -->
      <div class="table-container">
        <div class="table-header-row">
          <h3 class="chart-title">Top Performing Products</h3>
          <input type="text" class="search-input" placeholder="🔍 Search products...">
        </div>
        
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 40%">Product</th>
              <th>Revenue</th>
              <th>Units Sold</th>
              <th>Performance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(product => renderProductRow(product)).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="floating-action">
      <button class="fab">+</button>
    </div>
  `;
}

function init() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = renderAnalyticsDashboard();
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);