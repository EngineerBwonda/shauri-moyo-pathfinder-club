"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function RejectedPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 text-center">
              <div className="card-body p-5">
                <div
                  className="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "64px", height: "64px", fontSize: "28px" }}
                >
                  ✕
                </div>

                <h3 className="fw-bold mb-2">Access Denied</h3>

                <p className="text-muted mb-4">
                  Your account has been rejected or is pending approval. Please
                  contact the administrator if you believe this is a mistake.
                </p>

                <button className="btn btn-dark w-100" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// export default function RejectedPage() {
//   return (
//     <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="text-center p-4">
//         <div
//           className="rounded-circle bg-danger-subtle text-danger d-inline-flex align-items-center justify-content-center mb-4"
//           style={{
//             width: 70,
//             height: 70,
//           }}
//         >
//           ✕
//         </div>

//         <h2 className="fw-bold">Account not approved</h2>

//         <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
//           Unfortunately, your account has not been approved by an administrator.
//           Please contact support if you believe this was a mistake.
//         </p>
//       </div>
//     </main>
//   );
// }
