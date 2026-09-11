"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.replace("../../pages/loginb");
        return;
      }

      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("approved, full_name, email, age, gender, location")
        .eq("id", authUser.id)
        .maybeSingle();

      if (memberError && memberError.code !== "PGRST116") {
        router.replace("../../pages/loginb");
        return;
      }

      if (!member || !member.approved) {
        router.replace("../../pages/pending");
        return;
      }

      if (memberError || !member || !member.approved) {
        router.replace("../../pages/pending");
        return;
      }

      setUser(member);
      setLoading(false);
    };

    checkAccess();
  }, [router, supabase]);

  if (loading) {
    return (
      <main className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <h2 className="fw-bold mb-1">
              Welcome, {user.full_name || "User"} 👋
            </h2>
            <p className="text-muted mb-4">You have access to the dashboard.</p>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="border rounded-3 p-3">
                  <div className="text-muted small">Email</div>
                  <div className="fw-semibold">{user.email || "—"}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded-3 p-3">
                  <div className="text-muted small">Age</div>
                  <div className="fw-semibold">{user.age ?? "—"}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded-3 p-3">
                  <div className="text-muted small">Gender</div>
                  <div className="fw-semibold text-capitalize">
                    {user.gender ? user.gender.replace(/_/g, " ") : "—"}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded-3 p-3">
                  <div className="text-muted small">Location</div>
                  <div className="fw-semibold">{user.location || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
