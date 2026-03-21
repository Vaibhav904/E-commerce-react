import React, { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const SalesChart = () => {
  // SALES CHART DATA
  // const salesData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  //   datasets: [
  //     {
  //       label: "Sales (₹)",
  //       data: [12000, 15000, 10000, 18000, 22000, 17000, 25000],
  //       borderColor: "rgba(75,192,192,1)",
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       tension: 0.4,
  //       pointBackgroundColor: "rgba(75,192,192,1)",
  //       fill: true,
  //     },
  //   ],
  // };
  const [totalSales, setTotalSales] = useState("");
  const [salesComparison, setSalesComparison] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [ordersComparison, setOrdersComparison] = useState("");
  const [totalcustomer,setTotalCustomer]=useState("");
   const [customerComparison,setCustomerComparison]=useState("");
   const [salesData, setSalesData] = useState(null);
   const [recentOrders, setRecentOrders] = useState([]);
const [trafficData, setTrafficData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://tech-shop.techsaga.live/api/v1/dashboard/total-sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setTotalSales(res.data.overall.formatted);
          setSalesComparison(res.data.comparison.text);
        }
      })
      .catch((err) => console.log(err));
  }, []);



useEffect(() => {

  const token = localStorage.getItem("token");

  axios.get(
    "http://tech-shop.techsaga.live/api/v1/dashboard/recent-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((res) => {
    if (res.data.status) {
      setRecentOrders(res.data.data);
    }
  })
  .catch((err) => console.log(err));

}, []);


useEffect(() => {

  const token = localStorage.getItem("token");

  axios.get(
    "http://tech-shop.techsaga.live/api/v1/dashboard/total-customers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((res) => {
    if (res.data.status) {
      setTotalCustomer(res.data.formatted_customers);
      setCustomerComparison(res.data.comparison_text);
    }
  })
  .catch((err) => console.log(err));

}, []);

useEffect(() => {

  const token = localStorage.getItem("token");

  axios.get(
    "http://tech-shop.techsaga.live/api/v1/dashboard/yearly-sales",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((res) => {

    const months = res.data.data.months;
    const sales = res.data.data.sales.map(Number);

    setSalesData({
      labels: months,
      datasets: [
        {
          label: "Sales (₹)",
          data: sales,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
          pointBackgroundColor: "rgba(75,192,192,1)",
          fill: true,
        },
      ],
    });

  })
  .catch((err) => console.log(err));

}, []);



 useEffect(() => {
  const token = localStorage.getItem("token");

  axios
    .get("http://tech-shop.techsaga.live/api/v1/analytics/current-year-traffic", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const apiData = res.data.data;

      // Labels (Months)
      const labels = apiData.map((item) => item.month);

      // Channels collect karenge
      const channelsMap = {};

      apiData.forEach((item) => {
        item.channels.forEach((ch) => {
          if (!channelsMap[ch.channel]) {
            channelsMap[ch.channel] = [];
          }
          channelsMap[ch.channel].push(ch.sessions); // sessions use kiya
        });
      });

      // Colors (optional)
      const colors = {
        Direct: "#4e73df",
        Organic: "#1cc88a",
        Social: "#f6c23e",
      };

      // Datasets banana
      const datasets = Object.keys(channelsMap).map((channel) => ({
        label: channel,
        data: channelsMap[channel],
        borderColor: colors[channel] || "#000",
        backgroundColor: `${colors[channel] || "#000"}33`,
        tension: 0.4,
        fill: true,
      }));

      setTrafficData({
        labels,
        datasets,
      });
    })
    .catch((err) => console.error(err));
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://tech-shop.techsaga.live/api/v1/dashboard/total-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setTotalOrders(res.data.formatted_orders);
          setOrdersComparison(res.data.comparison_text);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
            <p>₹{totalSales}</p>
            <span>{salesComparison}</span>
          </div>
          <div className="stat-icon sales">
            <FaDollarSign />
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL ORDERS</h3>
            <p>{totalOrders}</p>
            <span>{ordersComparison}</span>
          </div>
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>TOTAL CUSTOMERS</h3>
            <p>{totalcustomer}</p>
            <span>{customerComparison}</span>
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
    {salesData && <Line data={salesData} options={options} />}
  </div>
</div>

       <div className="card">
  <h3>Traffic Sources</h3>
  <div className="chart-container">
    {trafficData && <Line data={trafficData} options={options} />}
  </div>
</div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card">
  <h3>Recent Orders</h3>

  {recentOrders.map((order, i) => (
    <div className="order-item" key={i}>
      <div className="order-info">
        <div className="order-img">
          <FaBox />
        </div>

        <div>
          <h4>{order.display_id}</h4>

          <p>
            {order.user?.name} • {order.items?.[0]?.product?.name}
          </p>

          <span>{order.created_at}</span>
        </div>
      </div>

      <div>
        <p>
          <strong>₹{order.total}</strong>
        </p>

        <span className={`order-status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>
    </div>
  ))}

</div>
    </div>
  );
};

export default SalesChart;
