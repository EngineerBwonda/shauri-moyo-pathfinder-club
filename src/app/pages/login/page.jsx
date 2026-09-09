"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

import styles from "./style.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Supabase login will go here
      console.log("Login data:", formData);

      // Example:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: formData.email,
      //   password: formData.password,
      // });

      // if (error) throw error;

      // router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

          <motion.form
            onSubmit={handleSubmit}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  value={formData.password}
                  onChange={handleChange}
                  required
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
                  checked={formData.remember}
                  onChange={handleChange}
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
            <button
              type="button"
              className={styles.googleButton}
              onClick={() => {
                console.log("Google login");
              }}
            >
              <span className={styles.googleIcon}>G</span>
              Continue with Google
            </button>
          </motion.form>

          {/* REGISTER */}
          <div className={styles.registerPrompt}>
            <span>Dont have an account?</span>

            <Link href="../../pages/registration">Create an account</Link>
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
