"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  MapPin,
  CalendarDays,
} from "lucide-react";

import { createClient } from "../../utils/supabase/client";
import styles from "./styles.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    password: "",
    confirmPassword: "",
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

    setError("");
    setSuccess("");

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!formData.terms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            age: formData.age,
            gender: formData.gender,
            location: formData.location.trim(),
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!authData.user) {
        setError("Unable to create account. Please try again.");
        return;
      }

      const { error: memberError } = await supabase.from("members").upsert({
        id: authData.user.id,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        location: formData.location.trim(),
        approved: false,
      });

      if (memberError) {
        console.error(memberError);
        setError(
          "Your account was created, but access could not be set up. Please contact support.",
        );
        return;
      }

      setSuccess("Your account has been created and is awaiting approval.");
      router.push("../../pages/pending");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
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
                  <strong>Grow &amp; Serve</strong>
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

          {/* ERROR */}
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className={styles.successAlert} role="alert">
              <strong>Registration successful!</strong>
              <br />
              {success}
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* FULL NAME */}
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full name</label>

              <div className={styles.inputWrapper}>
                <User size={18} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
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
                  autoComplete="email"
                />
              </div>
            </div>

            {/* AGE + GENDER */}
            <div className={styles.nameGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="age">Age</label>

                <div className={styles.inputWrapper}>
                  <CalendarDays size={18} />

                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="e.g. 15"
                    min="0"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="gender">Gender</label>

                <div className={styles.selectWrapper}>
                  <Users size={18} />

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className={styles.inputGroup}>
              <label htmlFor="location">Location</label>

              <div className={styles.inputWrapper}>
                <MapPin size={18} />

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
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
                  minLength={6}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
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
