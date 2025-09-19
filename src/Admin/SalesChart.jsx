import React from "react";
import { FaSearch, FaBell, FaDollarSign, FaShoppingCart, FaUsers, FaChartLine, FaBox } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const SalesChart = () => {
      const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [12000, 15000, 10000, 18000, 22000, 17000, 25000],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="main-content">
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL SALES</h3>
            <p>$24,562</p>
            <span>+12% from last week</span>
          </div>
          <div className="stat-icon sales">
            <FaDollarSign />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL ORDERS</h3>
            <p>1,258</p>
            <span>+8% from last week</span>
          </div>
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL CUSTOMERS</h3>
            <p>3,642</p>
            <span>+15% from last week</span>
          </div>
          <div className="stat-icon customers">
            <FaUsers />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL REVENUE</h3>
            <p>$18,256</p>
            <span>+10% from last week</span>
          </div>
          <div className="stat-icon revenue">
            <FaChartLine />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="card">
          <h3>Sales Overview</h3>
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="card">
          <h3>Traffic Sources</h3>
          <div className="chart-container">
            <canvas></canvas>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h3>Recent Orders</h3>

        <div className="order-item">
          <div className="order-info">
            <div className="order-img">
              <FaBox />
            </div>
            <div>
              <h4>#ORD-001</h4>
              <p>John Doe • Wireless Headphones</p>
              <span>12 Nov 2023</span>
            </div>
          </div>
          <div>
            <p><strong>$150</strong></p>
            <span className="order-status delivered">Delivered</span>
          </div>
        </div>

        <div className="order-item">
          <div className="order-info">
            <div className="order-img">
              <FaBox />
            </div>
            <div>
              <h4>#ORD-002</h4>
              <p>Jane Smith • Smart Watch</p>
              <span>11 Nov 2023</span>
            </div>
          </div>
          <div>
            <p><strong>$250</strong></p>
            <span className="order-status processing">Processing</span>
          </div>
        </div>

        <div className="order-item">
          <div className="order-info">
            <div className="order-img">
              <FaBox />
            </div>
            <div>
              <h4>#ORD-003</h4>
              <p>Robert Johnson • Sneakers</p>
              <span>10 Nov 2023</span>
            </div>
          </div>
          <div>
            <p><strong>$120</strong></p>
            <span className="order-status delivered">Delivered</span>
          </div>
        </div>

        <div className="order-item">
          <div className="order-info">
            <div className="order-img">
              <FaBox />
            </div>
            <div>
              <h4>#ORD-004</h4>
              <p>Sarah Williams • Backpack</p>
              <span>09 Nov 2023</span>
            </div>
          </div>
          <div>
            <p><strong>$80</strong></p>
            <span className="order-status cancelled">Cancelled</span>
          </div>
        </div>

        <div className="order-item">
          <div className="order-info">
            <div className="order-img">
              <FaBox />
            </div>
            <div>
              <h4>#ORD-005</h4>
              <p>Michael Brown • Water Bottle</p>
              <span>08 Nov 2023</span>
            </div>
          </div>
          <div>
            <p><strong>$30</strong></p>
            <span className="order-status delivered">Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
