import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalOrderAmount: number;
  ordersPerDayLast7Days: Record<string, number>;
  paymentMethodCounts: Record<string, number>;
  shippingMethodCounts: Record<string, number>;
  statusCounts: Record<string, number>;
}

const ReportsPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get<Stats>("http://localhost:8080/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  const ordersPerDayData = {
    labels: Object.keys(stats.ordersPerDayLast7Days),
    datasets: [
      {
        label: "Orders",
        data: Object.values(stats.ordersPerDayLast7Days),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const shippingMethodData = {
    labels: Object.keys(stats.shippingMethodCounts),
    datasets: [
      {
        data: Object.values(stats.shippingMethodCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8AFF33"],
      },
    ],
  };

  const paymentMethodData = {
    labels: Object.keys(stats.paymentMethodCounts),
    datasets: [
      {
        data: Object.values(stats.paymentMethodCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8AFF33"],
      },
    ],
  };

  const statusData = {
    labels: Object.keys(stats.statusCounts),
    datasets: [
      {
        data: Object.values(stats.statusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8AFF33"],
      },
    ],
  };

  // Chart sizes
  const barChartHeight = 250; 
  const doughnutChartHeight = 200;

  return (
    <div className="p-6 mb-12 md:mx-6 lg:mx-12">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {/* DaisyUI Stats */}
      <div className="stats shadow mb-8 flex flex-col md:flex-row gap-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <img className="w-12" src="/icons/users.png" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.totalUsers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <img className="w-12" src="/icons/orders.png" />
          </div>
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-secondary">{stats.totalOrders}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <img className="w-12" src="/icons/revenue.png" />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-accent">
            {stats.totalOrderAmount.toFixed(2)} €
          </div>
        </div>
      </div>

      {/* Orders per Day */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Orders Per Day (Last 15 Orders)</h2>
        <div style={{ maxHeight: barChartHeight }}>
          <Bar
            data={ordersPerDayData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      {/* Doughnut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24">
        <div style={{ maxHeight: doughnutChartHeight }}>
          <h2 className="text-xl font-semibold mb-2 text-center">Shipping Methods</h2>
          <Doughnut
            data={shippingMethodData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div style={{ maxHeight: doughnutChartHeight }}>
          <h2 className="text-xl font-semibold mb-2 text-center">Payment Methods</h2>
          <Doughnut
            data={paymentMethodData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div style={{ maxHeight: doughnutChartHeight }}>
          <h2 className="text-xl font-semibold mb-2 text-center">Order Status</h2>
          <Doughnut
            data={statusData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;