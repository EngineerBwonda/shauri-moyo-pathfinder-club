"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Mail,
  Users,
  ArrowRight,
  CheckCircle2,
  Mountain,
} from "lucide-react";

import { createClient } from "../../utils/supabase/client";
import styles from "./styles.module.css";

export default function PendingPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("../../pages/loginb");
        return;
      }

      const { data: member } = await supabase
        .from("members")
        .select("approved")
        .eq("id", user.id)
        .maybeSingle();

      if (member?.approved) {
        router.replace("../../homepage/dash");
        return;
      }
    };

    checkStatus();
  }, [router, supabase]);

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
              Almost there
            </div>

            <h1>
              You&apos;re on the
              <span> right path.</span>
            </h1>

            <p>
              Your registration has been received. Our team is reviewing your
              details to make sure everything is set up correctly before
              welcoming you into the club.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Registration received</strong>
                  <span>Your account has been created successfully.</span>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <Clock size={18} />
                </div>

                <div>
                  <strong>Awaiting review</strong>
                  <span>
                    An administrator is currently verifying your account.
                  </span>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>You&apos;ll be notified</strong>
                  <span>You can sign in as soon as you&apos;re approved.</span>
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

      {/* STATUS PANEL */}
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
            <span className={styles.formEyebrow}>Account status</span>

            <h2>Awaiting approval</h2>

            <p>
              Your account has been created. You&apos;ll have full access once
              an administrator approves your registration.
            </p>
          </motion.div>

          <motion.div
            className={styles.statusCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className={styles.statusSpinnerWrapper}>
              <span className={styles.statusSpinner} />
            </div>

            <div className={styles.statusText}>
              <strong>Review in progress</strong>
              <span>This usually takes less than 24 hours.</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.infoList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.infoItem}>
              <ShieldCheck size={18} className={styles.infoIcon} />
              <div>
                <strong>Secure review</strong>
                <span>
                  Only administrators can see your registration details.
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Mail size={18} className={styles.infoIcon} />
              <div>
                <strong>Check your email</strong>
                <span>
                  We may contact you if additional information is needed.
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Users size={18} className={styles.infoIcon} />
              <div>
                <strong>Need help?</strong>
                <span>Reach out to your club leader for assistance.</span>
              </div>
            </div>
          </motion.div>

          <Link href="../../pages/loginc" className={styles.submitButton}>
            Login to your account
            <ArrowRight size={18} />
          </Link>

          <div className={styles.securityNote}>
            <ShieldCheck size={15} />

            <span>Your account information is securely protected.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "../../utils/supabase/client";

// export default function PendingPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   useEffect(() => {
//     const checkStatus = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         router.replace("/loginb");
//         return;
//       }

//       const { data: member } = await supabase
//         .from("members")
//         .select("approved")
//         .eq("id", user.id)
//         .maybeSingle();

//       if (member?.approved) {
//         router.replace("/dashboard");
//         return;
//       }
//     };

//     checkStatus();
//   }, [router, supabase]);

//   return (
//     <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="text-center p-4">
//         <div className="mb-4">
//           <div className="spinner-border text-warning" role="status" />
//         </div>

//         <h2 className="fw-bold">Account awaiting approval</h2>

//         <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
//           Your account has been created successfully. An administrator is
//           currently reviewing your registration. You will be able to access the
//           system once your account has been approved.
//         </p>
//       </div>
//     </main>
//   );
// }
