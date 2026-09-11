"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function PendingPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/loginb");
        return;
      }

      const { data: member } = await supabase
        .from("members")
        .select("approved")
        .eq("id", user.id)
        .maybeSingle();

      if (member?.approved) {
        router.replace("/dashboard");
        return;
      }
    };

    checkStatus();
  }, [router, supabase]);

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center p-4">
        <div className="mb-4">
          <div className="spinner-border text-warning" role="status" />
        </div>

        <h2 className="fw-bold">Account awaiting approval</h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
          Your account has been created successfully. An administrator is
          currently reviewing your registration. You will be able to access the
          system once your account has been approved.
        </p>
      </div>
    </main>
  );
}
