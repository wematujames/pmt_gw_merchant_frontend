"use client";
import CollectionsGrapgh from "./components/CollectionsGrapgh";
import DisbursementsGrapgh from "./components/DisbursementsGrapgh";
import StatisticsCards from "./components/Statistics";
import Jumbotron from "./components/Jumbotron";
import { useAuth } from "../../../../hooks/useAuth";
import PageLoader from "../../PageLoader";

const Dashboard: React.FC = () => {
  const authenticated = useAuth();

  if (!authenticated) return <PageLoader />;

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
