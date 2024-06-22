"use client";
import CollectionsGrapgh from "./components/CollectionsGrapgh";
import DisbursementsGrapgh from "./components/DisbursementsGrapgh";
import StatisticsCards from "./components/Statistics";
import Jumbotron from "./components/Jumbotron";
import { useAuth } from "../../../../hooks/useAuth";
import { useLogout } from "../../../../hooks/useLogout";

const Dashboard = () => {
  const authenticated = useAuth();
  const logout = useLogout();

  const overallStats = [
    {
      title: "Collections Today",
      value: 1128.87,
      prefix: "₵",
    },
    {
      title: "Total Collections",
      value: 93842,
      prefix: "₵",
    },
    {
      title: "Disbursements Today",
      value: 48393,
      prefix: "₵",
    },
    {
      title: "Total Disbursements",
      value: 238,
      prefix: "₵",
    },
  ];

  const netWorkStats = [
    {
      title: "MTN",
      value: 1128.87,
      prefix: "₵",
    },
    {
      title: "Vodafone",
      value: 93842,
      prefix: "₵",
    },
  ];

  if (!authenticated) return <div>Loading...</div>;

  return (
    <>
      <Jumbotron />
      <StatisticsCards stats={overallStats} />
      <CollectionsGrapgh />
      <DisbursementsGrapgh />
    </>
  );
};

export default Dashboard;
