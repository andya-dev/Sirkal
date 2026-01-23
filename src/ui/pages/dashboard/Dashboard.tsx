import { Link, Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Dashboard internal navigation */}
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <hr />

      {/* Child pages render here */}
      <Outlet />
    </div>
  )
}
