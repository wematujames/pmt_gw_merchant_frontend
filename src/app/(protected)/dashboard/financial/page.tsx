"use client";
import StatisticsCards from "./components/Statistics";
import Jumbotron from "./components/Jumbotron";
import { useAuth } from "../../../../hooks/useAuth";
import PageLoader from "../../PageLoader";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CollectionsGrapgh = dynamic(
  () => import("./components/CollectionsGrapgh"),
  { ssr: false }
);

const DisbursementsGrapgh = dynamic(
  () => import("./components/DisbursementsGrapgh"),
  { ssr: false }
);

function Dashboard() {
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
}

export default function DashboardSuspended() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}
