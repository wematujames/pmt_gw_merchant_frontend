"use client";
import CollectionsGrapgh from "./components/CollectionsGrapgh";
import DisbursementsGrapgh from "./components/DisbursementsGrapgh";
import StatisticsCards from "./components/Statistics";
import Jumbotron from "./components/Jumbotron";

const Dashboard = () => {
  return (
    <>
      <Jumbotron />
      <StatisticsCards />
      <CollectionsGrapgh />
      <DisbursementsGrapgh />
    </>
  );
};

export default Dashboard;
