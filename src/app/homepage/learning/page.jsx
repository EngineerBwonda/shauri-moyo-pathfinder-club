"use client";

import { useMemo, useState } from "react";
import {
  FaPlus,
  FaFileAlt,
  FaClipboardList,
  FaBookOpen,
  FaInbox,
  FaSearch,
  FaRegClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserGraduate,
  FaArrowRight,
  FaFilePdf,
  FaEye,
  FaPen,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";

import styles from "./style.module.css";

/* =====================================================
   MOCK DATA
===================================================== */

const MOCK_STATS = [
  {
    key: "assignments",
    value: 12,
    label: "Assignments",
    hint: "Published assignments",
    icon: FaFileAlt,
    tone: "blue",
    trend: "+3 this week",
  },
  {
    key: "cats",
    value: 5,
    label: "CATs",
    hint: "Active assessments",
    icon: FaClipboardList,
    tone: "green",
    trend: "1 ending soon",
  },
  {
    key: "notes",
    value: 18,
    label: "Notes",
    hint: "Learning resources",
    icon: FaBookOpen,
    tone: "amber",
    trend: "+2 this week",
  },
  {
    key: "submissions",
    value: 34,
    label: "Submissions",
    hint: "Awaiting review",
    icon: FaInbox,
    tone: "rose",
    trend: "8 new today",
  },
];

const MOCK_MATERIALS = [
  {
    id: "a-03",
    type: "assignment",
    subject: "Pathfinder Principles",
    title: "Assignment 03",
    due: "20 September 2026 • 5:00 PM",
    students: 24,
    submitted: 18,
    status: "published",
    tone: "blue",
    icon: FaFileAlt,
  },
  {
    id: "c-02",
    type: "cat",
    subject: "Basic Pathfinder Skills",
    title: "CAT 02",
    questions: 25,
    marks: 30,
    status: "active",
    availableUntil: "25 September 2026",
    tone: "green",
    icon: FaClipboardList,
  },
  {
    id: "n-04",
    type: "note",
    subject: "Pathfinder History",
    title: "Lesson 04",
    published: "14 September 2026",
    fileType: "PDF",
    pages: 4,
    status: "published",
    tone: "amber",
    icon: FaBookOpen,
  },
  {
    id: "a-02",
    type: "assignment",
    subject: "Basic First Aid",
    title: "Assignment 02",
    due: "18 September 2026 • 4:00 PM",
    students: 24,
    submitted: 22,
    status: "published",
    tone: "blue",
    icon: FaFileAlt,
  },
  {
    id: "n-03",
    type: "note",
    subject: "First Aid Basics",
    title: "Reference Sheet",
    published: "10 September 2026",
    fileType: "PDF",
    pages: 6,
    status: "published",
    tone: "amber",
    icon: FaBookOpen,
  },
  {
    id: "c-01",
    type: "cat",
    subject: "Pathfinder History",
    title: "CAT 01",
    questions: 20,
    marks: 25,
    status: "closed",
    availableUntil: "12 September 2026",
    tone: "green",
    icon: FaClipboardList,
  },
];

const MOCK_SUBMISSIONS = [
  {
    id: "s-01",
    student: "John Kamau",
    assignment: "Assignment 03",
    submitted: "18 Sept 2026",
    status: "pending",
  },
  {
    id: "s-02",
    student: "Mary Wanjiku",
    assignment: "Assignment 02",
    submitted: "17 Sept 2026",
    status: "marked",
  },
  {
    id: "s-03",
    student: "Peter Mwangi",
    assignment: "Assignment 03",
    submitted: "16 Sept 2026",
    status: "pending",
  },
  {
    id: "s-04",
    student: "David Otieno",
    assignment: "Assignment 01",
    submitted: "15 Sept 2026",
    status: "marked",
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

/* =====================================================
   PAGE
===================================================== */

export default function TeacherLearningPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const greeting = useMemo(() => getGreeting(), []);

  const filteredMaterials = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_MATERIALS.filter((m) => {
      if (filter !== "all" && m.type !== filter) return false;
      if (!q) return true;
      return (
        m.title?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q)
      );
    });
  }, [filter, search]);

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
            <span className={styles.blob1} />
            <span className={styles.blob2} />
            <span className={styles.blob3} />
          </div>

          <div className={styles.welcomeContent}>
            <span className={styles.eyebrow}>Teacher Dashboard</span>

            <h1 className={styles.welcomeTitle}>
              {greeting}, Teacher <span aria-hidden="true">👋</span>
            </h1>

            <p className={styles.welcomeSubtitle}>
              Manage your Pathfinder learning materials and keep your students
              on track.
            </p>

            <p className={styles.welcomeHint}>
              Create, organize and monitor your Pathfinder class learning
              activities.
            </p>

            <div className={styles.quickActions}>
              <button
                type="button"
                className={`${styles.actionButton} ${styles.actionPrimary}`}
                onClick={() => notify("Opening Create Assignment…")}
              >
                <FaPlus aria-hidden="true" />
                <span>Create Assignment</span>
              </button>

              <button
                type="button"
                className={`${styles.actionButton} ${styles.actionSecondary}`}
                onClick={() => notify("Opening Create CAT…")}
              >
                <FaPlus aria-hidden="true" />
                <span>Create CAT</span>
              </button>

              <button
                type="button"
                className={`${styles.actionButton} ${styles.actionTertiary}`}
                onClick={() => notify("Opening Add Notes…")}
              >
                <FaPlus aria-hidden="true" />
                <span>Add Notes</span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================
            STATS
        ============================ */}
        <section className={styles.statsGrid} aria-label="Learning statistics">
          {MOCK_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.key}
                className={`${styles.statCard} ${styles[`stat_${s.tone}`]}`}
              >
                <div className={styles.statIcon}>
                  <Icon aria-hidden="true" />
                </div>

                <div className={styles.statBody}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statHint}>{s.hint}</span>
                </div>

                <span className={styles.statTrend}>{s.trend}</span>
              </article>
            );
          })}
        </section>

        {/* ============================
            RECENT MATERIALS
        ============================ */}
        <section className={styles.materialSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Learning Materials</h2>
              <p className={styles.sectionSubtitle}>
                Keep track of your latest assignments, CATs and learning
                resources.
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
                type="search"
                placeholder="Search learning materials…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search learning materials"
              />
            </label>

            <div
              className={styles.filterGroup}
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

          {/* MATERIAL GRID */}
          {filteredMaterials.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} aria-hidden="true">
                <FaSearch />
              </div>
              <h3>No matching materials</h3>
              <p>
                Try changing your filters or search for a different keyword.
              </p>
            </div>
          ) : (
            <div className={styles.materialGrid}>
              {filteredMaterials.map((m) => (
                <MaterialCard key={m.id} material={m} onAction={notify} />
              ))}
            </div>
          )}
        </section>

        {/* ============================
            RECENT SUBMISSIONS
        ============================ */}
        <section className={styles.submissionsSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Submissions</h2>
              <p className={styles.sectionSubtitle}>
                Review and mark work submitted by your Pathfinder students.
              </p>
            </div>

            <button
              type="button"
              className={styles.viewAll}
              onClick={() => notify("Opening all submissions…")}
            >
              View All <FaArrowRight aria-hidden="true" />
            </button>
          </header>

          <div className={styles.tableWrap}>
            <table className={styles.submissionTable}>
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Assignment</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Status</th>
                  <th scope="col" className={styles.right}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {MOCK_SUBMISSIONS.map((s) => (
                  <tr key={s.id}>
                    <td data-label="Student">
                      <div className={styles.studentCell}>
                        <span className={styles.avatar} aria-hidden="true">
                          {s.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <span>{s.student}</span>
                      </div>
                    </td>

                    <td data-label="Assignment">{s.assignment}</td>

                    <td data-label="Submitted">
                      <span className={styles.submittedCell}>
                        <FaRegClock aria-hidden="true" />
                        {s.submitted}
                      </span>
                    </td>

                    <td data-label="Status">
                      <StatusBadge status={s.status} />
                    </td>

                    <td data-label="Action" className={styles.right}>
                      <button
                        type="button"
                        className={`${styles.rowAction} ${
                          s.status === "pending"
                            ? styles.rowActionPrimary
                            : styles.rowActionGhost
                        }`}
                        onClick={() =>
                          notify(
                            s.status === "pending"
                              ? `Reviewing ${s.student}'s submission…`
                              : `Viewing ${s.student}'s submission…`,
                          )
                        }
                      >
                        {s.status === "pending" ? "Review" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className={styles.updatedAt}>
          Updated just now • Last sync a few seconds ago
        </p>
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
   SUB COMPONENTS (inside same file)
===================================================== */

function MaterialCard({ material, onAction }) {
  const { type } = material;

  if (type === "assignment")
    return <AssignmentCard data={material} onAction={onAction} />;
  if (type === "cat") return <CatCard data={material} onAction={onAction} />;
  if (type === "note") return <NoteCard data={material} onAction={onAction} />;
  return null;
}

function AssignmentCard({ data, onAction }) {
  const progress = Math.round((data.submitted / data.students) * 100);

  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialBadge} ${styles.badgeBlue}`}>
          <FaFileAlt aria-hidden="true" />
          Assignment
        </span>

        <span className={`${styles.statusBadge} ${styles.statusPublished}`}>
          {data.status}
        </span>
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubject}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          Due: {data.due}
        </p>

        <div className={styles.progressContainer}>
          <div className={styles.progressLabel}>
            <span>
              {data.submitted} / {data.students} submitted
            </span>
            <span>{progress}%</span>
          </div>
          <div className={styles.progressBar} aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <footer className={styles.materialActions}>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialPrimary}`}
          onClick={() => onAction(`Viewing "${data.title}"…`)}
        >
          <FaEye aria-hidden="true" /> View
        </button>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialGhost}`}
          onClick={() => onAction(`Editing "${data.title}"…`)}
        >
          <FaPen aria-hidden="true" /> Edit
        </button>
      </footer>
    </article>
  );
}

function CatCard({ data, onAction }) {
  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialBadge} ${styles.badgeGreen}`}>
          <FaClipboardList aria-hidden="true" />
          CAT
        </span>

        <span
          className={`${styles.statusBadge} ${
            data.status === "active" ? styles.statusActive : styles.statusClosed
          }`}
        >
          {data.status}
        </span>
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubject}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaClipboardList aria-hidden="true" />
          {data.questions} Questions • {data.marks} Marks
        </p>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          Available until: {data.availableUntil}
        </p>
      </div>

      <footer className={styles.materialActions}>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialPrimary}`}
          onClick={() => onAction(`Viewing "${data.title}"…`)}
        >
          <FaEye aria-hidden="true" /> View
        </button>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialGhost}`}
          onClick={() => onAction(`Viewing results for "${data.title}"…`)}
        >
          <FaChartBar aria-hidden="true" /> Results
        </button>
      </footer>
    </article>
  );
}

function NoteCard({ data, onAction }) {
  return (
    <article className={styles.materialCard}>
      <header className={styles.materialHeader}>
        <span className={`${styles.materialBadge} ${styles.badgeAmber}`}>
          <FaBookOpen aria-hidden="true" />
          Notes
        </span>

        <span className={`${styles.statusBadge} ${styles.statusPublished}`}>
          {data.status}
        </span>
      </header>

      <div className={styles.materialBody}>
        <p className={styles.materialSubject}>{data.subject}</p>
        <h3 className={styles.materialTitle}>{data.title}</h3>

        <p className={styles.materialMeta}>
          <FaRegClock aria-hidden="true" />
          Published: {data.published}
        </p>

        <p className={styles.materialMeta}>
          <FaFilePdf aria-hidden="true" />
          {data.fileType} • {data.pages} Pages
        </p>
      </div>

      <footer className={styles.materialActions}>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialPrimary}`}
          onClick={() => onAction(`Viewing "${data.subject} – ${data.title}"…`)}
        >
          <FaEye aria-hidden="true" /> View
        </button>
        <button
          type="button"
          className={`${styles.materialButton} ${styles.materialGhost}`}
          onClick={() => onAction(`Editing "${data.subject} – ${data.title}"…`)}
        >
          <FaPen aria-hidden="true" /> Edit
        </button>
      </footer>
    </article>
  );
}

function StatusBadge({ status }) {
  const isPending = status === "pending";

  return (
    <span
      className={`${styles.statusBadge} ${
        isPending ? styles.statusPending : styles.statusMarked
      }`}
    >
      {isPending ? (
        <FaExclamationCircle aria-hidden="true" />
      ) : (
        <FaCheckCircle aria-hidden="true" />
      )}
      {isPending ? "Pending Review" : "Marked"}
    </span>
  );
}
