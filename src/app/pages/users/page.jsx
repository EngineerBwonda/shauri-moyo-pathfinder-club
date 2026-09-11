"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function UsersPage() {
  const supabase = createClient();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setUsers(data || []);

      setLoading(false);
    };

    fetchUsers();
  }, []);

  const toggleApproval = async (userId, currentStatus) => {
    setUpdatingId(userId);

    const nextApproved = !currentStatus;

    const { error } = await supabase
      .from("members")
      .update({ approved: nextApproved })
      .eq("id", userId);

    if (error) {
      setError(error.message);
      setUpdatingId(null);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, approved: nextApproved } : u)),
    );

    setUpdatingId(null);
  };

  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.location?.toLowerCase().includes(q) ||
      user.gender?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1">Registered Users</h2>
            <p className="text-muted mb-0">
              {loading
                ? "Loading users..."
                : `${filteredUsers.length} user${
                    filteredUsers.length !== 1 ? "s" : ""
                  } found`}
            </p>
          </div>

          <input
            type="search"
            className="form-control"
            style={{ maxWidth: "320px" }}
            placeholder="Search by name, email, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
              <p className="text-muted mb-0">No users found.</p>
            </div>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="py-3">Full Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Age</th>
                    <th className="py-3">Gender</th>
                    <th className="py-3">Location</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-end pe-4">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 text-muted">{index + 1}</td>
                      <td className="fw-semibold">{user.full_name || "—"}</td>
                      <td className="text-muted">{user.email || "—"}</td>
                      <td>{user.age ?? "—"}</td>
                      <td className="text-capitalize">
                        {user.gender
                          ? String(user.gender).replace(/_/g, " ")
                          : "—"}
                      </td>
                      <td>{user.location || "—"}</td>

                      {/* Status badge */}
                      <td>
                        {user.approved ? (
                          <span className="badge bg-success-subtle text-success-emphasis">
                            Approved
                          </span>
                        ) : (
                          <span className="badge bg-warning-subtle text-warning-emphasis">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Toggle switch */}
                      <td className="text-end pe-4">
                        <div className="form-check form-switch d-inline-block">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`toggle-${user.id}`}
                            checked={!!user.approved}
                            disabled={updatingId === user.id}
                            onChange={() =>
                              toggleApproval(user.id, user.approved)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-center text-muted small mt-4">
          © 2026 Admin System. All rights reserved.
        </p>
      </div>
    </main>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "../../utils/supabase/client";

// export default function UsersPage() {
//   const supabase = createClient();

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError("");

//       const { data, error } = await supabase
//         .from("members")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) {
//         setError(error.message);
//       } else {
//         setUsers(data || []);
//       }

//       setLoading(false);
//     };

//     fetchUsers();
//   }, []);

//   // Filter by search
//   const filteredUsers = users.filter((user) => {
//     const q = search.toLowerCase();
//     return (
//       user.full_name?.toLowerCase().includes(q) ||
//       user.email?.toLowerCase().includes(q) ||
//       user.location?.toLowerCase().includes(q) ||
//       user.gender?.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <main className="bg-light min-vh-100 py-5">
//       <div className="container">
//         {/* Header */}
//         <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
//           <div>
//             <h2 className="fw-bold mb-1">Registered Users</h2>
//             <p className="text-muted mb-0">
//               {loading
//                 ? "Loading users..."
//                 : `${filteredUsers.length} user${
//                     filteredUsers.length !== 1 ? "s" : ""
//                   } found`}
//             </p>
//           </div>

//           <input
//             type="search"
//             className="form-control"
//             style={{ maxWidth: "320px" }}
//             placeholder="Search by name, email, location..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-5">
//             <div className="spinner-border text-dark" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {/* Empty */}
//         {!loading && !error && filteredUsers.length === 0 && (
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="card-body text-center py-5">
//               <p className="text-muted mb-0">No users found.</p>
//             </div>
//           </div>
//         )}

//         {/* Table */}
//         {!loading && !error && filteredUsers.length > 0 && (
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="px-4 py-3">#</th>
//                     <th className="py-3">Full Name</th>
//                     <th className="py-3">Email</th>
//                     <th className="py-3">Age</th>
//                     <th className="py-3">Gender</th>
//                     <th className="py-3">Location</th>
//                     <th className="py-3">Registered</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map((user, index) => (
//                     <tr key={user.id}>
//                       <td className="px-4 text-muted">{index + 1}</td>
//                       <td className="fw-semibold">{user.full_name || "—"}</td>
//                       <td className="text-muted">{user.email || "—"}</td>
//                       <td>{user.age ?? "—"}</td>
//                       <td className="text-capitalize">
//                         {user.gender
//                           ? String(user.gender).replace(/_/g, " ")
//                           : "—"}
//                       </td>
//                       <td>{user.location || "—"}</td>
//                       <td className="text-muted small">
//                         {user.created_at
//                           ? new Date(user.created_at).toLocaleDateString(
//                               "en-GB",
//                               {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                               },
//                             )
//                           : "—"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <p className="text-center text-muted small mt-4">
//           © 2026 Admin System. All rights reserved.
//         </p>
//       </div>
//     </main>
//   );
// }
