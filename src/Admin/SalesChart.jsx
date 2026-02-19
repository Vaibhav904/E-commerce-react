import React from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBox,
} from "react-icons/fa";
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
  // SALES CHART DATA
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [12000, 15000, 10000, 18000, 22000, 17000, 25000],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(75,192,192,1)",
        fill: true,
      },
    ],
  };

  // TRAFFIC SOURCES DATA
  const trafficData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Direct",
        data: [120, 190, 170, 220, 200, 180, 210],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78,115,223,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Organic",
        data: [90, 140, 130, 160, 150, 170, 180],
        borderColor: "#1cc88a",
        backgroundColor: "rgba(28,200,138,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Social",
        data: [60, 80, 75, 100, 95, 110, 120],
        borderColor: "#f6c23e",
        backgroundColor: "rgba(246,194,62,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="main-content">
      {/* STATS CARDS */}
      <div className="stats-cards">
        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL SALES</h3>
            <p>₹24,562</p>
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
            <p>₹18,256</p>
            <span>+10% from last week</span>
          </div>
          <div className="stat-icon revenue">
            <FaChartLine />
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts">
        <div className="card">
          <h3>Sales Overview</h3>
          <div className="chart-container">
            <Line data={salesData} options={options} />
          </div>
        </div>

        <div className="card">
          <h3>Traffic Sources</h3>
          <div className="chart-container">
            <Line data={trafficData} options={options} />
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card">
        <h3>Recent Orders</h3>

        {[
          ["#ORD-001", "John Doe • Wireless Headphones", "₹150", "Delivered"],
          ["#ORD-002", "Jane Smith • Smart Watch", "₹250", "Processing"],
          ["#ORD-003", "Robert Johnson • Sneakers", "₹120", "Delivered"],
          ["#ORD-004", "Sarah Williams • Backpack", "₹80", "Cancelled"],
          ["#ORD-005", "Michael Brown • Water Bottle", "₹30", "Delivered"],
        ].map((order, i) => (
          <div className="order-item" key={i}>
            <div className="order-info">
              <div className="order-img">
                <FaBox />
              </div>
              <div>
                <h4>{order[0]}</h4>
                <p>{order[1]}</p>
                <span>Nov 2023</span>
              </div>
            </div>
            <div>
              <p>
                <strong>{order[2]}</strong>
              </p>
              <span className={`order-status ${order[3].toLowerCase()}`}>
                {order[3]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;