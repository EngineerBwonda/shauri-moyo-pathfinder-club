"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Mountain,
} from "lucide-react";

import styles from "./style.module.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "pathfinder",
    terms: false,
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      console.log("Registration data:", formData);

      // Supabase signup will go here.
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* LEFT INFORMATION PANEL */}
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
            className={styles.heroContent}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.badge}>
              <Mountain size={15} />
              Join the Pathfinder Family
            </div>

            <h1>
              Your journey
              <span> starts here.</span>
            </h1>

            <p>
              Create your Pathfinder account and become part of a community
              dedicated to spiritual growth, service, adventure, leadership, and
              character.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Track Your Progress</strong>
                  <span>Keep up with classes, honors and achievements.</span>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Stay Connected</strong>
                  <span>Receive important club announcements and updates.</span>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Grow & Serve</strong>
                  <span>Participate in activities and community service.</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className={styles.bottomMessage}>
            <span />
            <p>Learn. Serve. Lead. Grow.</p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
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
            <span className={styles.formEyebrow}>Get started</span>

            <h2>Create your account</h2>

            <p>Join your Pathfinder club and start your journey.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* NAME */}
            <div className={styles.nameGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First name</label>

                <div className={styles.inputWrapper}>
                  <User size={18} />

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last name</label>

                <div className={styles.inputWrapper}>
                  <User size={18} />

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email address</label>

              <div className={styles.inputWrapper}>
                <Mail size={18} />

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

            {/* ROLE */}
            <div className={styles.inputGroup}>
              <label htmlFor="role">I am joining as</label>

              <div className={styles.selectWrapper}>
                <Users size={18} />

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="pathfinder">Pathfinder</option>

                  <option value="parent">Parent / Guardian</option>

                  <option value="staff">Club Staff</option>
                </select>
              </div>
            </div>

            {/* PASSWORD */}
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>

              <div className={styles.inputWrapper}>
                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className={styles.inputWrapper}>
                <Lock size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <label className={styles.termsCheck}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the Pathfinder platform&apos;s terms and privacy
                policy.
              </span>
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </motion.form>

          {/* LOGIN */}
          <div className={styles.loginPrompt}>
            <span>Already have an account?</span>

            <Link href="../../pages/login">Sign in</Link>
          </div>

          <div className={styles.securityNote}>
            <ShieldCheck size={15} />

            <span>Your account information is securely protected.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
