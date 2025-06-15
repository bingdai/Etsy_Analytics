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
      <div class="metric-sparkline">
        <svg viewBox="0 0 200 40" style="width: 100%; height: 100%;">
          <path d="M 0 30 L 20 28 L 40 25 L 60 26 L 80 22 L 100 20 L 120 18 L 140 15 L 160 12 L 180 10 L 200 8" 
                stroke="${metric.color === 'blue' ? '#3B82F6' : metric.color === 'green' ? '#10B981' : metric.color === 'purple' ? '#8B5CF6' : '#F59E0B'}" 
                stroke-width="2" 
                fill="none" 
                opacity="0.5" />
        </svg>
      </div>
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
            <svg viewBox="0 0 800 300" style="width: 100%; height: 100%;">
              <!-- Grid lines -->
              <g class="grid-lines" stroke="#374151" stroke-width="0.5" opacity="0.3">
                <line x1="50" y1="250" x2="750" y2="250" />
                <line x1="50" y1="200" x2="750" y2="200" />
                <line x1="50" y1="150" x2="750" y2="150" />
                <line x1="50" y1="100" x2="750" y2="100" />
                <line x1="50" y1="50" x2="750" y2="50" />
              </g>
              
              <!-- Y-axis labels -->
              <g class="y-labels" fill="#9CA3AF" font-size="12">
                <text x="40" y="255" text-anchor="end">$0</text>
                <text x="40" y="205" text-anchor="end">$10k</text>
                <text x="40" y="155" text-anchor="end">$20k</text>
                <text x="40" y="105" text-anchor="end">$30k</text>
                <text x="40" y="55" text-anchor="end">$40k</text>
              </g>
              
              <!-- Area chart gradient -->
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0" />
                </linearGradient>
              </defs>
              
              <!-- Revenue area -->
              <path d="M 50 220 L 100 210 L 150 180 L 200 170 L 250 160 L 300 140 L 350 130 L 400 120 L 450 110 L 500 100 L 550 90 L 600 85 L 650 80 L 700 75 L 750 70 L 750 250 L 50 250 Z" 
                    fill="url(#revenueGradient)" />
              
              <!-- Revenue line -->
              <path d="M 50 220 L 100 210 L 150 180 L 200 170 L 250 160 L 300 140 L 350 130 L 400 120 L 450 110 L 500 100 L 550 90 L 600 85 L 650 80 L 700 75 L 750 70" 
                    stroke="#3B82F6" stroke-width="3" fill="none" />
              
              <!-- Data points -->
              <g fill="#3B82F6">
                <circle cx="50" cy="220" r="4" />
                <circle cx="150" cy="180" r="4" />
                <circle cx="250" cy="160" r="4" />
                <circle cx="350" cy="130" r="4" />
                <circle cx="450" cy="110" r="4" />
                <circle cx="550" cy="90" r="4" />
                <circle cx="650" cy="80" r="4" />
                <circle cx="750" cy="70" r="4" />
              </g>
              
              <!-- X-axis labels -->
              <g class="x-labels" fill="#9CA3AF" font-size="12">
                <text x="50" y="270" text-anchor="middle">Dec 1</text>
                <text x="200" y="270" text-anchor="middle">Dec 5</text>
                <text x="350" y="270" text-anchor="middle">Dec 10</text>
                <text x="500" y="270" text-anchor="middle">Dec 15</text>
                <text x="650" y="270" text-anchor="middle">Dec 20</text>
              </g>
              
              <!-- Comparison line (last period) -->
              <path d="M 50 240 L 100 235 L 150 230 L 200 225 L 250 220 L 300 215 L 350 210 L 400 205 L 450 200 L 500 195 L 550 190 L 600 185 L 650 180 L 700 175 L 750 170" 
                    stroke="#9CA3AF" stroke-width="2" fill="none" stroke-dasharray="5,5" opacity="0.5" />
                    
              <!-- Legend -->
              <g font-size="12">
                <rect x="580" y="20" width="15" height="3" fill="#3B82F6" />
                <text x="600" y="24" fill="#9CA3AF">Current Period</text>
                <rect x="580" y="35" width="15" height="2" fill="#9CA3AF" opacity="0.5" />
                <text x="600" y="39" fill="#9CA3AF">Previous Period</text>
              </g>
            </svg>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">Sales by Category</h3>
            <button class="btn-icon">⋮</button>
          </div>
          <div class="chart-placeholder" style="height: 300px;">
            <svg viewBox="0 0 400 300" style="width: 100%; height: 100%;">
              <!-- Donut chart segments -->
              <g transform="translate(150, 130)">
                <!-- Home Decor - 35% -->
                <path d="M 0,-80 A 80,80 0 0,1 61.44,51.42 L 30.72,25.71 A 40,40 0 0,0 0,-40 Z"
                      fill="#8B5CF6" opacity="0.9" />
                
                <!-- Jewelry - 28% -->
                <path d="M 61.44,51.42 A 80,80 0 0,1 -31.17,73.72 L -15.59,36.86 A 40,40 0 0,0 30.72,25.71 Z"
                      fill="#3B82F6" opacity="0.9" />
                
                <!-- Fashion - 22% -->
                <path d="M -31.17,73.72 A 80,80 0 0,1 -78.48,-15.64 L -39.24,-7.82 A 40,40 0 0,0 -15.59,36.86 Z"
                      fill="#10B981" opacity="0.9" />
                
                <!-- Wellness - 15% -->
                <path d="M -78.48,-15.64 A 80,80 0 0,1 0,-80 L 0,-40 A 40,40 0 0,0 -39.24,-7.82 Z"
                      fill="#F59E0B" opacity="0.9" />
                
                <!-- Center circle for donut -->
                <circle cx="0" cy="0" r="40" fill="#1E2139" />
                
                <!-- Center text -->
                <text x="0" y="-5" text-anchor="middle" fill="#F9FAFB" font-size="24" font-weight="700">$47.4k</text>
                <text x="0" y="15" text-anchor="middle" fill="#9CA3AF" font-size="12">Total Sales</text>
              </g>
              
              <!-- Legend -->
              <g transform="translate(280, 80)" font-size="12">
                <!-- Home Decor -->
                <rect x="0" y="0" width="12" height="12" fill="#8B5CF6" rx="2" />
                <text x="18" y="10" fill="#F9FAFB">Home Decor</text>
                <text x="18" y="24" fill="#9CA3AF">35% • $16.6k</text>
                
                <!-- Jewelry -->
                <rect x="0" y="40" width="12" height="12" fill="#3B82F6" rx="2" />
                <text x="18" y="50" fill="#F9FAFB">Jewelry</text>
                <text x="18" y="64" fill="#9CA3AF">28% • $13.3k</text>
                
                <!-- Fashion -->
                <rect x="0" y="80" width="12" height="12" fill="#10B981" rx="2" />
                <text x="18" y="90" fill="#F9FAFB">Fashion</text>
                <text x="18" y="104" fill="#9CA3AF">22% • $10.4k</text>
                
                <!-- Wellness -->
                <rect x="0" y="120" width="12" height="12" fill="#F59E0B" rx="2" />
                <text x="18" y="130" fill="#F9FAFB">Wellness</text>
                <text x="18" y="144" fill="#9CA3AF">15% • $7.1k</text>
              </g>
            </svg>
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