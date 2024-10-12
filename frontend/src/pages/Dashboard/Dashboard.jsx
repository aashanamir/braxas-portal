import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.css";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { FiUsers } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6";
import RecentMessages from "../../components/RecentMessages/RecentMessages";


const Dashboard = () => {

  const messages = [
    {
      avatar: "https://via.placeholder.com/40",
      sender: "John Doe",
      preview: "Can we reschedule the meeting?",
      timestamp: "10 minutes ago",
    },
    {
      avatar: "https://via.placeholder.com/40",
      sender: "Jane Smith",
      preview: "Attendance report is ready.",
      timestamp: "1 hour ago",
    },
    {
      avatar: "https://via.placeholder.com/40",
      sender: "Mike Johnson",
      preview: "Received your payment, thank you!",
      timestamp: "2 days ago",
    },
  ];


  return (
    <div>
      <Navbar />
      <div className={styles.dashboard_container}>
      <Sidebar />

        <div className={styles.dashboard}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.cardsContainer}>
            <DashboardCard title="Total Users" qty="150" icon={<FiUsers/>} />
            <DashboardCard title="Total Earnings" qty="$3,500" />
            <DashboardCard title="Active Rides" qty="25" />
            <DashboardCard title="New Messages" qty="5" icon={<FaMessage/>}/>
          </div>

          <div className={styles.messagesSection}>
            <RecentMessages  messages={messages}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
