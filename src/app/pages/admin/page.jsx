"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  X,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import styles from "./style.module.css";

const users = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 712 345 678",
    status: "pending",
    joined: "Sep 10, 2026",
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+254 723 456 789",
    status: "approved",
    joined: "Sep 9, 2026",
  },
  {
    id: "user-003",
    name: "Peter Mwangi",
    email: "peter@example.com",
    phone: "+254 734 567 890",
    status: "rejected",
    joined: "Sep 8, 2026",
  },
  {
    id: "user-004",
    name: "Mary Wanjiku",
    email: "mary@example.com",
    phone: "+254 745 678 901",
    status: "pending",
    joined: "Sep 7, 2026",
  },
];

function StatusBadge({ status }) {
  const badgeClass = {
    pending: styles.badgePending,
    approved: styles.badgeApproved,
    rejected: styles.badgeRejected,
  };

  const labels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span className={`${styles.badge} ${badgeClass[status]}`}>
      <span className={styles.badgeDot} />
      {labels[status]}
    </span>
  );
}

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || user.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>A</div>
            <span className={styles.brandText}>Admin Panel</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            Dashboard
          </a>

          <a href="#" className={`${styles.navLink} ${styles.navLinkActive}`}>
            <Users size={18} />
            Users
          </a>

          <a href="#" className={styles.navLink}>
            <Clock size={18} />
            Pending
            <span className={styles.navBadge}>{pendingCount}</span>
          </a>

          <a href="#" className={styles.navLink}>
            <CheckCircle size={18} />
            Approved
          </a>

          <a href="#" className={styles.navLink}>
            <XCircle size={18} />
            Rejected
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Users</h1>

          <div className={styles.admin}>
            <div className={styles.avatar}>AD</div>
            <div className={styles.adminInfo}>
              <p className={styles.adminName}>Administrator</p>
              <p className={styles.adminEmail}>admin@example.com</p>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* Page heading */}
          <div className={styles.pageHeading}>
            <h2 className={styles.pageTitle}>User Management</h2>
            <p className={styles.pageSubtitle}>
              Review registered users and manage their account access.
            </p>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <StatCard
              icon={<Users size={18} />}
              label="Total Users"
              value={users.length}
            />
            <StatCard
              icon={<Clock size={18} />}
              label="Pending"
              value={pendingCount}
            />
            <StatCard
              icon={<CheckCircle size={18} />}
              label="Approved"
              value={approvedCount}
            />
            <StatCard
              icon={<XCircle size={18} />}
              label="Rejected"
              value={rejectedCount}
            />
          </div>

          {/* Users card */}
          <div className={styles.card}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.searchWrap}>
                <Search size={17} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Users</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Table */}
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th className={styles.right}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar}>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className={styles.userName}>{user.name}</p>
                            <p className={styles.userId}>{user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <p className={styles.contactEmail}>{user.email}</p>
                        <p className={styles.contactPhone}>{user.phone}</p>
                      </td>

                      <td>
                        <StatusBadge status={user.status} />
                      </td>

                      <td className={styles.joined}>{user.joined}</td>

                      <td className={styles.actionCell}>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className={styles.viewBtn}
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className={styles.empty}>No users found.</div>
            )}
          </div>
        </div>
      </main>

      {/* Profile Drawer */}
      {selectedUser && (
        <div className={styles.overlay}>
          {/* Overlay */}
          <button
            aria-label="Close"
            onClick={() => setSelectedUser(null)}
            className={styles.overlayBackdrop}
          />

          {/* Drawer */}
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <h3 className={styles.drawerTitle}>User Profile</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className={styles.iconBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {/* Profile header */}
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  {selectedUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h4 className={styles.profileName}>{selectedUser.name}</h4>
                <p className={styles.profileEmail}>{selectedUser.email}</p>

                <div className={styles.profileBadge}>
                  <StatusBadge status={selectedUser.status} />
                </div>
              </div>

              {/* Details */}
              <div className={styles.section}>
                <h5 className={styles.sectionTitle}>Personal Information</h5>
                <div className={styles.infoList}>
                  <InfoRow
                    icon={<Users size={17} />}
                    label="Full Name"
                    value={selectedUser.name}
                  />
                  <InfoRow
                    icon={<Mail size={17} />}
                    label="Email"
                    value={selectedUser.email}
                  />
                  <InfoRow
                    icon={<Phone size={17} />}
                    label="Phone"
                    value={selectedUser.phone}
                  />
                  <InfoRow
                    icon={<Calendar size={17} />}
                    label="Joined"
                    value={selectedUser.joined}
                  />
                </div>
              </div>

              {/* Account */}
              <div className={styles.section}>
                <h5 className={styles.sectionTitle}>Account Information</h5>
                <div className={styles.infoList}>
                  <InfoRow
                    icon={<ShieldCheck size={17} />}
                    label="Account ID"
                    value={selectedUser.id}
                  />
                  <InfoRow
                    icon={<ShieldCheck size={17} />}
                    label="Status"
                    value={
                      selectedUser.status.charAt(0).toUpperCase() +
                      selectedUser.status.slice(1)
                    }
                  />
                </div>
              </div>

              {/* Actions */}
              {selectedUser.status === "pending" && (
                <div className={styles.actionsRow}>
                  <button className={`${styles.btn} ${styles.btnDanger}`}>
                    Reject User
                  </button>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    Approve User
                  </button>
                </div>
              )}

              {selectedUser.status === "approved" && (
                <button
                  className={`${styles.btn} ${styles.btnDanger} ${styles.btnBlock}`}
                >
                  Revoke Access
                </button>
              )}

              {selectedUser.status === "rejected" && (
                <button
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                >
                  Approve User
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <div className={styles.statIcon}>{icon}</div>
        <MoreHorizontal size={18} className={styles.statMore} />
      </div>

      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.infoIcon}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <p className={styles.infoLabel}>{label}</p>
        <p className={styles.infoValue}>{value}</p>
      </div>
    </div>
  );
}
