"use client";

import { useState } from "react";
// import { createClient } from "@/utils/supabase/client";
import { createClient } from "../../utils/supabase/client";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with Supabase
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (!data.user) {
        setError("Unable to sign in. Please try again.");
        return;
      }

      // 2. Check the member record for approval status
      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("approved")
        .eq("id", data.user.id)
        .single();

      if (memberError) {
        setError(
          "Your account profile could not be loaded. Please contact support.",
        );
        return;
      }

      // 3. Check approval status
      if (!member.approved) {
        router.push("../../pages/pending");
        return;
      }

      // 4. Approved users go to dashboard
      router.push("../../pages/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-vh-100 bg-light">
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* Left side */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between bg-dark text-white p-5">
            <div>
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-white text-dark fw-bold rounded-3"
                  style={{ width: 40, height: 40 }}
                >
                  A
                </div>

                <span className="fs-5 fw-semibold">Admin System</span>
              </div>
            </div>

            <div style={{ maxWidth: 448 }}>
              <div
                className="d-flex align-items-center justify-content-center rounded-3 mb-4"
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <ShieldCheck size={25} />
              </div>

              <h1 className="display-5 fw-semibold lh-sm">
                Secure access to your account.
              </h1>

              <p className="mt-4 fs-6 lh-lg text-secondary">
                Sign in to access your account. New registrations are reviewed
                and approved by an administrator before access is granted.
              </p>
            </div>

            <p className="small text-secondary mb-0">
              © 2026 Admin System. All rights reserved.
            </p>
          </div>

          {/* Right side */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center px-4 py-5">
            <div className="w-100" style={{ maxWidth: 448 }}>
              {/* Mobile logo */}
              <div className="d-flex d-lg-none align-items-center gap-3 mb-5">
                <div
                  className="d-flex align-items-center justify-content-center bg-dark text-white fw-bold rounded-3"
                  style={{ width: 40, height: 40 }}
                >
                  A
                </div>

                <span className="fw-semibold">Admin System</span>
              </div>

              {/* Heading */}
              <div className="mb-4">
                <h2 className="fs-2 fw-semibold mb-2">Welcome back</h2>
                <p className="small text-secondary mb-0">
                  Sign in to your account to continue.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger small mb-4" role="alert">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="d-flex flex-column gap-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="form-label fw-medium small mb-2"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg fs-6"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <label
                      htmlFor="password"
                      className="form-label fw-medium small mb-0"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="small fw-medium text-secondary text-decoration-none"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="position-relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-lg fs-6 pe-5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary p-2"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-dark btn-lg w-100 d-flex align-items-center justify-content-center gap-2 fs-6 fw-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="spinner-border spinner-border-sm border-0"
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Register */}
              <p className="text-center small text-secondary mt-5 mb-0">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="fw-semibold text-dark text-decoration-none"
                >
                  Create an account
                </Link>
              </p>

              {/* Approval notice */}
              <div className="card border rounded-3 mt-5">
                <div className="card-body p-3">
                  <div className="d-flex gap-3">
                    <ShieldCheck
                      size={18}
                      className="text-secondary flex-shrink-0 mt-1"
                    />

                    <div>
                      <p className="small fw-medium mb-1">
                        Account approval required
                      </p>

                      <p
                        className="text-secondary mb-0"
                        style={{ fontSize: 12, lineHeight: 1.6 }}
                      >
                        New accounts must be reviewed and approved by an
                        administrator before you can access the system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
