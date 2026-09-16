"use client";

import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaClipboardList,
  FaFileAlt,
  FaTrophy,
  FaSearch,
  FaRegClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaFilePdf,
  FaFileWord,
  FaBook,
  FaEye,
  FaPlayCircle,
  FaTimes,
  FaStar,
  FaFlagCheckered,
} from "react-icons/fa";

import styles from "./styles.module.css";

/* =====================================================
   MOCK DATA
===================================================== */

const STUDENT = {
  name: "Christopher",
  fullName: "Christopher Bwonda",
  className: "Pathfinder Class 1",
};

const STATS = [
  {
    key: "assignments",
    value: 8,
    label: "Assignments",
    hint: "3 pending",
    icon: FaFileAlt,
    tone: "blue",
  },
  {
    key: "cats",
    value: 2,
    label: "CATs Available",
    hint: "1 upcoming",
    icon: FaClipboardList,
    tone: "green",
  },
  {
    key: "notes",
    value: 14,
    label: "Learning Notes",
    hint: "New resources",
    icon: FaBookOpen,
    tone: "amber",
  },
  {
    key: "average",
    value: "86%",
    label: "Average Score",
    hint: "This term",
    icon: FaTrophy,
    tone: "violet",
  },
];

const UPCOMING = [
  {
    id: "up-1",
    type: "assignment",
    subject: "Pathfinder Principles",
    title: "Assignment 03",
    badge: "Due Tomorrow",
    badgeTone: "danger",
    due: "20 September 2026 • 5:00 PM",
    meta: "Maximum Marks: 20",
    progress: 90,
    progressLabel: "Almost complete",
    cta: "Open Assignment",
  },
  {
    id: "up-2",
    type: "cat",
    subject: "Basic Pathfinder Skills",
    title: "CAT 02",
    badge: "Available Soon",
    badgeTone: "info",
    available: "21 September 2026",
    meta: "30 Marks • 25 Questions",
    cta: "View CAT",
  },
];

const ASSIGNMENTS = [
  {
    id: "a-03",
    subject: "Pathfinder Principles",
    title: "Assignment 03",
    due: "20 September 2026 • 5:00 PM",
    maxMarks: 20,
    status: "in-progress", // in-progress | submitted | marked | overdue
    score: null,
    submittedAt: null,
  },
  {
    id: "a-02",
    subject: "First Aid Basics",
    title: "Assignment 02",
    due: "18 September 2026 • 4:00 PM",
    maxMarks: 20,
    status: "submitted",
    score: null,
    submittedAt: "17 Sept 2026",
  },
  {
    id: "a-01",
    subject: "Pathfinder History",
    title: "Assignment 01",
    due: "10 September 2026",
    maxMarks: 20,
    status: "marked",
    score: 17,
    submittedAt: "09 Sept 2026",
  },
  {
    id: "a-04",
    subject: "Community Service",
    title: "Assignment 02",
    due: "25 September 2026",
    maxMarks: 15,
    status: "in-progress",
    score: null,
    submittedAt: null,
  },
  {
    id: "a-05",
    subject: "Leadership Skills",
    title: "Assignment 01",
    due: "30 September 2026",
    maxMarks: 20,
    status: "in-progress",
    score: null,
    submittedAt: null,
  },
  {
    id: "a-06",
    subject: "Nature Study",
    title: "Assignment 03",
    due: "05 September 2026",
    maxMarks: 20,
    status: "overdue",
    score: null,
    submittedAt: null,
  },
];

const CATS = [
  {
    id: "c-02",
    subject: "Basic Pathfinder Skills",
    title: "CAT 02",
    questions: 25,
    marks: 30,
    available: "21 Sept – 25 Sept 2026",
    status: "available", // available | upcoming | completed
    score: null,
  },
  {
    id: "c-01",
    subject: "Pathfinder History",
    title: "CAT 01",
    questions: 20,
    marks: 20,
    available: "12 Sept 2026",
    status: "completed",
    score: 18,
  },
  {
    id: "c-03",
    subject: "First Aid",
    title: "CAT 01",
    questions: 15,
    marks: 20,
    available: "28 Sept 2026",
    status: "upcoming",
    score: null,
  },
  {
    id: "c-04",
    subject: "Leadership",
    title: "CAT 02",
    questions: 20,
    marks: 25,
    available: "05 Oct 2026",
    status: "upcoming",
    score: null,
  },
];

const NOTES = [
  {
    id: "n-04",
    subject: "Pathfinder History",
    title: "Lesson 04",
    published: "14 September 2026",
    fileType: "PDF",
    pages: 4,
    isNew: true,
  },
  {
    id: "n-05",
    subject: "First Aid Basics",
    title: "Reference Sheet",
    published: "10 September 2026",
    fileType: "PDF",
    pages: 6,
    isNew: false,
  },
  {
    id: "n-06",
    subject: "Pathfinder Leadership",
    title: "Leadership Notes",
    published: "08 September 2026",
    fileType: "Document",
    pages: 8,
    isNew: false,
  },
  {
    id: "n-07",
    subject: "Community Service",
    title: "Service Handbook",
    published: "05 September 2026",
    fileType: "PDF",
    pages: 12,
    isNew: false,
  },
  {
    id: "n-08",
    subject: "Pathfinder Pledge",
    title: "Pledge & Law",
    published: "01 September 2026",
    fileType: "Reading Material",
    pages: 2,
    isNew: false,
  },
  {
    id: "n-09",
    subject: "Nature Study",
    title: "Field Guide",
    published: "28 August 2026",
    fileType: "PDF",
    pages: 18,
    isNew: false,
  },
];

const RESULTS = [
  {
    id: "r-01",
    subject: "Pathfinder Principles",
    title: "Assignment 03",
    score: 17,
    max: 20,
    grade: "Excellent",
  },
  {
    id: "r-02",
    subject: "Basic Pathfinder Skills",
    title: "CAT 01",
    score: 18,
    max: 20,
    grade: "Excellent",
  },
  {
    id: "r-03",
    subject: "Pathfinder History",
    title: "Assignment 02",
    score: 16,
    max: 20,
    grade: "Good",
  },
  {
    id: "r-04",
    subject: "First Aid Basics",
    title: "Assignment 01",
    score: 14,
    max: 20,
    grade: "Good",
  },
  {
    id: "r-05",
    subject: "Nature Study",
    title: "Assignment 02",
    score: 18,
    max: 20,
    grade: "Excellent",
  },
];

const ACTIVITIES = [
  {
    id: "act-1",
    icon: FaCheckCircle,
    tone: "green",
    text: "Assignment 02 submitted",
    time: "Today • 10:32 AM",
  },
  {
    id: "act-2",
    icon: FaCheckCircle,
    tone: "green",
    text: "CAT 01 completed",
    time: "Yesterday • 3:45 PM",
  },
  {
    id: "act-3",
    icon: FaBookOpen,
    tone: "blue",
    text: "New notes published — Pathfinder History",
    time: "12 Sept • 9:00 AM",
  },
  {
    id: "act-4",
    icon: FaCheckCircle,
    tone: "green",
    text: "Assignment 01 marked (17/20)",
    time: "10 Sept • 2:15 PM",
  },
  {
    id: "act-5",
    icon: FaPlayCircle,
    tone: "violet",
    text: "Started Assignment 03",
    time: "09 Sept • 8:15 AM",
  },
  {
    id: "act-6",
    icon: FaFlagCheckered,
    tone: "amber",
    text: "Joined Pathfinder Class 1",
    time: "01 Sept • 7:00 AM",
  },
];

const FILTERS = [
  { value: "all", label: "All" },
  { value: "assignment", label: "Assignments" },
  { value: "cat", label: "CATs" },
  { value: "note", label: "Notes" },
];

/* =====================================================
   HELPERS
===================================================== */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function statusMeta(status) {
  switch (status) {
    case "in-progress":
      return { label: "In Progress", tone: "info", icon: FaPlayCircle };
    case "submitted":
      return { label: "Submitted", tone: "blue", icon: FaCheckCircle };
    case "marked":
      return { label: "Marked", tone: "green", icon: FaCheckCircle };
    case "overdue":
      return { label: "Overdue", tone: "danger", icon: FaExclamationCircle };
    case "available":
      return { label: "Available", tone: "green", icon: FaCheckCircle };
    case "upcoming":
      return { label: "Upcoming", tone: "info", icon: FaRegClock };
    case "completed":
      return { label: "Completed", tone: "green", icon: FaCheckCircle };
    default:
      return { label: status, tone: "info", icon: FaRegClock };
  }
}

function gradeTone(grade) {
  if (grade === "Excellent") return "green";
  if (grade === "Good") return "blue";
  return "amber";
}

/* =====================================================
   PAGE
===================================================== */

export default function StudentLearningPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const greeting = useMemo(() => getGreeting(), []);

  const materials = useMemo(() => {
    return [
      ...ASSIGNMENTS.map((a) => ({ ...a, type: "assignment" })),
      ...CATS.map((c) => ({ ...c, type: "cat" })),
      ...NOTES.map((n) => ({ ...n, type: "note" })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return materials.filter((m) => {
      if (filter !== "all" && m.type !== filter) return false;
      if (!q) return true;
      return (
        m.title?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.type?.toLowerCase().includes(q)
      );
    });
  }, [materials, filter, search]);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2600);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ============================
            WELCOME
        ============================ */}
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeDecor} aria-hidden="true">
            <span className={styles.decorCircle1} />
            <span className={styles.decorCircle2} />
          </div>

          <div className={styles.welcomeContent}>
            <div className={styles.studentInfo}>
              <span className={styles.classBadge}>
                <FaStar aria-hidden="true" />
                {STUDENT.className}
              </span>
            </div>

            <h1 className={styles.welcomeTitle}>
              {greeting}, {STUDENT.name} <span aria-hidden="true">👋</span>
            </h1>

            <p className={styles.welcomeSubtitle}>
              Welcome back! Stay on top of your Pathfinder learning and keep
              making progress.
            </p>

            <p className={styles.welcomeHint}>
              Keep learning, keep growing, keep serving.
            </p>
          </div>
        </section>

        {/* ============================
            STATS
        ============================ */}
        <section className={styles.statsGrid} aria-label="Learning overview">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.key}
                className={`${styles.statCard} ${styles[`stat_${s.tone}`]}`}
              >
                <div className={styles.statIcon}>
                  <Icon aria-hidden="true" />
                </div>

                <div className={styles.statContent}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statDescription}>{s.hint}</span>
                </div>
              </article>
            );
          })}
        </section>

        {/* ============================
            UPCOMING
        ============================ */}
        <section className={styles.upcomingSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Upcoming</h2>
              <p className={styles.sectionDescription}>
                Don&apos;t miss your upcoming Pathfinder activities.
              </p>
            </div>
          </header>

          <div className={styles.upcomingGrid}>
            {UPCOMING.map((u) => (
              <article key={u.id} className={styles.upcomingCard}>
                <header className={styles.upcomingHeader}>
                  <span className={styles.materialType}>
                    {u.type === "assignment" ? (
                      <FaFileAlt aria-hidden="true" />
                    ) : (
                      <FaClipboardList aria-hidden="true" />
                    )}
                    {u.type === "assignment" ? "Assignment" : "CAT"}
                  </span>

                  <span
                    className={`${styles.badge} ${
                      styles[`badge_${u.badgeTone}`]
                    }`}
                  >
                    {u.badge}
                  </span>
                </header>

                <div className={styles.upcomingContent}>
                  <p className={styles.materialSubtitle}>{u.subject}</p>
                  <h3 className={styles.materialTitle}>{u.title}</h3>

                  <p className={styles.materialMeta}>
                    <FaRegClock aria-hidden="true" />
                    {u.due ? `Due: ${u.due}` : `Available: ${u.available}`}
                  </p>

                  <p className={styles.materialMeta}>
                    <FaClipboardList aria-hidden="true" />
                    {u.meta}
                  </p>

                  {typeof u.progress === "number" && (
                    <div className={styles.progressContainer}>
                      <div className={styles.progressLabel}>
                        <span>{u.progressLabel}</span>
                        <span>{u.progress}%</span>
                      </div>
                      <div className={styles.progressTrack} aria-hidden="true">
                        <span
                          className={styles.progressFill}
                          style={{ width: `${u.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.activityButton}
                  onClick={() => notify(`${u.cta} — ${u.title}…`)}
                >
                  {u.cta} <FaArrowRight aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ============================
            MY LEARNING
        ============================ */}
        <section className={styles.learningSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>My Learning</h2>
              <p className={styles.sectionDescription}>
                Assignments, CATs and notes from your Pathfinder teachers.
              </p>
            </div>

            <button
              type="button"
              className={styles.viewAll}
              onClick={() => notify("Opening all learning materials…")}
            >
              View All <FaArrowRight aria-hidden="true" />
            </button>
          </header>

          {/* FILTERS */}
          <div className={styles.filters}>
            <label className={styles.searchBox}>
              <FaSearch aria-hidden="true" />
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Search learning materials…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search learning materials"
              />
            </label>

            <div
              className={styles.filterButtons}
              role="tablist"
              aria-label="Filter materials"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.value}
                  className={`${styles.filterButton} ${
                    filter === f.value ? styles.activeFilter : ""
                  }`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* MATERIALS */}
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} aria-hidden="true">
                <FaSearch />
              </div>
              <h3>🔍 No learning materials found</h3>
              <p>Try searching for another assignment, CAT or note.</p>
            </div>
          ) : (
            <div className={styles.materialGrid}>
              {filtered.map((m) => (
                <MaterialCard
                  key={`${m.type}-${m.id}`}
                  material={m}
                  onAction={notify}
                />
              ))}
            </div>
          )}
        </section>

        {/* ============================
            RESULTS + ACTIVITY
        ============================ */}
        <div className={styles.twoColumn}>
          {/* RECENT RESULTS */}
          <section className={styles.resultsSection}>
            <header className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Recent Results</h2>
                <p className={styles.sectionDescription}>
                  See how you&apos;re progressing in your Pathfinder studies.
                </p>
              </div>
            </header>

            <div className={styles.resultsList}>
              {RESULTS.map((r) => {
                const pct = Math.round((r.score / r.max) * 100);
                const tone = gradeTone(r.grade);

                return (
                  <article key={r.id} className={styles.resultCard}>
                    <div className={styles.resultInfo}>
                      <p className={styles.materialSubtitle}>{r.subject}</p>
                      <h3 className={styles.materialTitle}>{r.title}</h3>
                    </div>

                    <div className={styles.resultRight}>
                      <div className={styles.scoreWrap}>
                        <span className={styles.score}>
                          {r.score}
                          <em>/{r.max}</em>
                        </span>
                        <span className={styles.scoreLabel}>{pct}%</span>
                      </div>

                      <span
                        className={`${styles.badge} ${styles[`badge_${tone}`]}`}
                      >
                        {r.grade}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* RECENT ACTIVITY */}
          <section className={styles.activitySection}>
            <header className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <p className={styles.sectionDescription}>
                  Your latest actions and updates.
                </p>
              </div>
            </header>

            <ol className={styles.activityTimeline}>
              {ACTIVITIES.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.id} className={styles.activityItem}>
                    <span
                      className={`${styles.activityIcon} ${
                        styles[`icon_${a.tone}`]
                      }`}
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>

                    <div className={styles.activityContent}>
                      <p className={styles.activityText}>{a.text}</p>
                      <span className={styles.activityTime}>{a.time}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {/* ============================
            MOTIVATION
        ============================ */}
        <section className={styles.motivationCard}>
          <div className={styles.motivationContent}>
            <h3 className={styles.motivationTitle}>Keep going! 🌟</h3>
            <p className={styles.motivationText}>
              You&apos;ve completed 72% of your current learning activities.
              Consistency is the key to becoming a better Pathfinder.
            </p>

            <div className={styles.motivationProgress}>
              <div className={styles.progressTrack} aria-hidden="true">
                <span
                  className={styles.progressFill}
                  style={{ width: "72%" }}
                />
              </div>
              <span className={styles.motivationPercent}>72%</span>
            </div>
          </div>
        </section>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <FaCheckCircle aria-hidden="true" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   SUB-COMPONENTS
===================================================== */

function MaterialCard({ material, onAction }) {
  if (material.type === "assignment")
    return <AssignmentCard data={material} onAction={onAction} />;
  if (material.type === "cat")
    return <CatCard data={material} onAction={onAction} />;
  if (material.type === "note")
    return <NoteCard data={material} onAction={onAction} />;
  return null;
}

function AssignmentCard({ data, onAction }) {
  const status = statusMeta(data.status);
  const StatusIcon = status.icon;

  const progress =
    data.status === "marked"
      ? 100
      : data.status === "submitted"
        ? 90
        : data.status === "in-progress"
          ? 55
          : 0;

  const cta =
    data.status === "marked"
      ? "View Result"
      : data.status === "submitted"
        ? "View Submission"
        : "Open Assignment";

  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialType} ${styles.typeBlue}`}>
          <FaFileAlt aria-hidden="true" />
          Assignment
        </span>

        <span
          className={`${styles.statusPill} ${styles[`pill_${status.tone}`]}`}
        >
          <StatusIcon aria-hidden="true" />
          {status.label}
        </span>
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubtitle}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          Due: {data.due}
        </p>

        <p className={styles.materialMeta}>
          <FaClipboardList aria-hidden="true" />
          Max Marks: {data.maxMarks}
        </p>

        {data.status === "marked" && (
          <p className={styles.materialMeta}>
            <FaTrophy aria-hidden="true" />
            Scored {data.score} / {data.maxMarks}
          </p>
        )}

        {data.status === "submitted" && data.submittedAt && (
          <p className={styles.materialMeta}>
            <FaCheckCircle aria-hidden="true" />
            Submitted {data.submittedAt}
          </p>
        )}

        <div className={styles.progressContainer}>
          <div className={styles.progressLabel}>
            <span>{status.label}</span>
            <span>{progress}%</span>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <footer className={styles.materialFooter}>
        <button
          type="button"
          className={styles.materialButton}
          onClick={() => onAction(`${cta} — ${data.title}…`)}
        >
          {cta} <FaArrowRight aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}

function CatCard({ data, onAction }) {
  const status = statusMeta(data.status);
  const StatusIcon = status.icon;

  const isAvailable = data.status === "available";
  const isCompleted = data.status === "completed";

  const cta = isCompleted
    ? "View Result"
    : isAvailable
      ? "Start CAT"
      : "Preview";

  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialType} ${styles.typeGreen}`}>
          <FaClipboardList aria-hidden="true" />
          CAT
        </span>

        <span
          className={`${styles.statusPill} ${styles[`pill_${status.tone}`]}`}
        >
          <StatusIcon aria-hidden="true" />
          {status.label}
        </span>
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubtitle}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaClipboardList aria-hidden="true" />
          {data.questions} Questions • {data.marks} Marks
        </p>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          {isCompleted
            ? `Taken: ${data.available}`
            : `Available: ${data.available}`}
        </p>

        {isCompleted && (
          <p className={styles.materialMeta}>
            <FaTrophy aria-hidden="true" />
            Score {data.score} / {data.marks}
          </p>
        )}
      </div>

      <footer className={styles.materialFooter}>
        <button
          type="button"
          className={`${styles.materialButton} ${
            isAvailable ? styles.materialButtonPrimary : ""
          }`}
          onClick={() => onAction(`${cta} — ${data.title}…`)}
        >
          {cta} <FaArrowRight aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}

function NoteCard({ data, onAction }) {
  const FileIcon =
    data.fileType === "PDF"
      ? FaFilePdf
      : data.fileType === "Document"
        ? FaFileWord
        : FaBook;

  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialType} ${styles.typeAmber}`}>
          <FaBookOpen aria-hidden="true" />
          Notes
        </span>

        {data.isNew && (
          <span className={`${styles.statusPill} ${styles.pill_new}`}>New</span>
        )}
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubtitle}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          Published: {data.published}
        </p>

        <p className={styles.materialMeta}>
          <FileIcon aria-hidden="true" />
          {data.fileType} • {data.pages} Pages
        </p>
      </div>

      <footer className={styles.materialFooter}>
        <button
          type="button"
          className={styles.materialButton}
          onClick={() => onAction(`Reading ${data.subject} — ${data.title}…`)}
        >
          <FaEye aria-hidden="true" /> Read Notes
        </button>
      </footer>
    </article>
  );
}
