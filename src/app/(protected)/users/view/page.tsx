"use client";

import { useAuth } from "../../../../hooks/useAuth";
import { useLogout } from "../../../../hooks/useLogout";

export default function DashboardPage() {
  const authenticated = useAuth();
  const logout = useLogout();

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Platform users</h1>
      <p>Manage platform users</p>
    </div>
  );
}
