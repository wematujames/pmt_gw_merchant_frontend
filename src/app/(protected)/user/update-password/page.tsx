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
      <h1>Welcome to the user/update-password!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
