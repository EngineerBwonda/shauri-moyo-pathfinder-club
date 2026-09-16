"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Users,
  Mountain,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   async function handleLogin(e: React.FormEvent) {
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
    <main className={styles.page}>
      {/* LEFT SIDE */}
      <section className={styles.visualSection}>
        <div className={styles.visualOverlay} />

        <div className={styles.visualContent}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>P</div>

            <div>
              <strong>PATHFINDER</strong>
              <span>CLUB MANAGEMENT</span>
            </div>
          </Link>

          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.badge}>
              <Mountain size={15} />
              Pathfinder Community
            </div>

            <h1>
              Growing young people.
              <span> Building character.</span>
            </h1>

            <p>
              Connect with your Pathfinder club, track your progress,
              participate in activities, and grow together in faith, service,
              and leadership.
            </p>
          </motion.div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Users size={18} />
              </div>

              <div>
                <strong>Connected Community</strong>
                <span>
                  Stay connected with your club and fellow Pathfinders.
                </span>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Secure & Organized</strong>
                <span>Your club information is managed securely.</span>
              </div>
            </div>
          </div>

          <div className={styles.quote}>
            <span className={styles.quoteLine} />
            <p>&ldquo;Save to serve, and serve to save.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* FORM SIDE */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          {/* Mobile Logo */}
          <Link href="/" className={styles.mobileLogo}>
            <div className={styles.logoMark}>P</div>

            <div>
              <strong>PATHFINDER</strong>
              <span>CLUB MANAGEMENT</span>
            </div>
          </Link>

          <motion.div
            className={styles.formHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.formEyebrow}>Welcome back</span>

            <h2>Sign in to your account</h2>

            <p>Enter your details to continue to your Pathfinder dashboard.</p>
          </motion.div>

          {/* Error */}
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <motion.form
            onSubmit={handleLogin}
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email address</label>

              <div className={styles.inputWrapper}>
                <Mail size={19} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>

                <Link href="/forgot-password">Forgot password?</Link>
              </div>

              <div className={styles.inputWrapper}>
                <Lock size={19} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <div className={styles.options}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />

                <span>Remember me</span>
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* DIVIDER */}
            <div className={styles.divider}>
              <span />
              <p>OR</p>
              <span />
            </div>

            {/* GOOGLE */}
            {/* <button
              type="button"
              className={styles.googleButton}
              onClick={() => {
                console.log("Google login");
              }}
            >
              <span className={styles.googleIcon}>G</span>
              Continue with Google
            </button> */}
          </motion.form>

          {/* REGISTER */}
          <div className={styles.registerPrompt}>
            <span>Don&apos;t have an account?</span>

            <Link href="../../pages/registerb">Create an account</Link>
          </div>

          {/* APPROVAL NOTICE */}
          <div className={styles.approvalNotice}>
            <ShieldCheck size={18} className={styles.approvalIcon} />

            <div>
              <strong>Account approval required</strong>
              <p>
                New accounts must be reviewed and approved by an administrator
                before you can access the system.
              </p>
            </div>
          </div>

          <p className={styles.terms}>
            By continuing, you agree to the Pathfinder platform&apos;s terms and
            privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}
