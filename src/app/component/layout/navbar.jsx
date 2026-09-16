"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./styles/navbar2.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/pages/aboutus" },
  { label: "Programme", href: "/pages/programmeb" },
  { label: "Gallery", href: "/pages/gallery" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Course", href: "/pages/course" },
];

export default function Navbar() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = offcanvasOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [offcanvasOpen]);

  useEffect(() => {
    setOffcanvasOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          {/* =====================================================
              BRAND
          ====================================================== */}
          <Link href="/" className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Image
                src="/logoC.png"
                alt="Shauri Moyo Pathfinder Club"
                width={64}
                height={64}
                className={styles.logo}
                priority
              />
            </div>

            <div className={styles.brandContent}>
              <span className={styles.brandName}>SHAURI MOYO</span>

              <span className={styles.brandClub}>PATHFINDER CLUB</span>

              <span className={styles.brandTagline}>
                Take the Advent Message
              </span>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className={styles.desktopNavigation}>
            <div className={styles.navLabel}>
              <span className={styles.navLabelLine}></span>
              NAVIGATION
            </div>

            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href} className={styles.navItem}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${
                      isActive(link.href) ? styles.active : ""
                    }`}
                  >
                    <span className={styles.navNumber}>{link.short}</span>

                    <span className={styles.navText}>{link.label}</span>

                    <span className={styles.navIndicator}></span>
                  </Link>
                </li>
              ))}

              {/* JOIN US CTA */}
              <li className={styles.navItem}>
                <Link
                  href="/pages/registerc"
                  className={`${styles.joinButton} ${
                    isActive("/login") ? styles.joinActive : ""
                  }`}
                >
                  <span>SIGN UP</span>

                  <span className={styles.joinArrow}>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              MOBILE TOGGLE
          ====================================================== */}
          <button
            className={`${styles.menuButton} ${
              offcanvasOpen ? styles.menuButtonActive : ""
            }`}
            onClick={() => setOffcanvasOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={offcanvasOpen}
          >
            <span className={styles.menuText}>MENU</span>

            <span className={styles.menuIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Bottom structural line */}
        <div className={styles.navBottomLine}>
          <span></span>
        </div>
      </nav>

      {/* =========================================================
          BACKDROP
      ========================================================== */}
      <div
        className={`${styles.backdrop} ${
          offcanvasOpen ? styles.backdropVisible : ""
        }`}
        onClick={() => setOffcanvasOpen(false)}
        aria-hidden="true"
      />

      {/* =========================================================
          MOBILE OFFCANVAS
      ========================================================== */}
      <aside
        className={`${styles.offcanvas} ${
          offcanvasOpen ? styles.offcanvasOpen : ""
        }`}
        aria-hidden={!offcanvasOpen}
      >
        {/* Drawer Header */}
        <div className={styles.offcanvasHeader}>
          <span className={styles.drawerLabel}>PATHFINDER / MENU</span>

          <button
            className={styles.closeButton}
            onClick={() => setOffcanvasOpen(false)}
            aria-label="Close navigation menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* =====================================================
            MOBILE BRAND
        ====================================================== */}
        <div className={styles.mobileBrand}>
          <div className={styles.mobileLogoWrapper}>
            <Image
              src="/logoC.png"
              alt="Shauri Moyo Pathfinder Club"
              width={90}
              height={90}
              className={styles.mobileLogo}
            />
          </div>

          <div className={styles.mobileBrandInfo}>
            <span className={styles.mobileBrandName}>SHAURI MOYO</span>

            <span className={styles.mobileBrandClub}>PATHFINDER CLUB</span>

            <em>Take the Advent Message</em>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.drawerDivider}>
          <span>01</span>
          <div></div>
          <span>MENU</span>
        </div>

        {/* =====================================================
            MOBILE LINKS
            i like the code 
        ====================================================== */}
        <nav className={styles.mobileNavigation}>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${
                isActive(link.href) ? styles.mobileLinkActive : ""
              }`}
              onClick={() => setOffcanvasOpen(false)}
            >
              <span className={styles.mobileLinkNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.mobileLinkText}>{link.label}</span>

              <span className={styles.mobileLinkArrow}>→</span>
            </Link>
          ))}

          {/* Sign Up */}
          <Link
            href="/pages/registerc"
            className={`${styles.mobileJoin} ${
              isActive("/pages/registerc") ? styles.mobileJoinActive : ""
            }`}
            onClick={() => setOffcanvasOpen(false)}
          >
            <span>SIGN UP</span>
            <span>→</span>
          </Link>
        </nav>

        {/* =====================================================
            DRAWER FOOTER
        ====================================================== */}
        <div className={styles.drawerFooter}>
          <div>
            <span className={styles.footerLabel}>SHAURI MOYO</span>

            <span className={styles.footerText}>Pathfinder Club</span>
          </div>

          <div className={styles.footerStatus}>
            <span className={styles.statusDot}></span>
            <span>ACTIVE</span>
          </div>
        </div>
      </aside>
    </>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./styles/navbar.module.css";
// import { label } from "framer-motion/client";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "About Us", href: "../../pages/about" },
//   { label: "Programme", href: "../../pages/programme" },
//   { label: "Gallery", href: "../../pages/gallery" },
//   { label: "Join Us", href: "/join" },
//   { label: "Contact", href: "../../pages/contact" },
//   { label: "Sign Up", href: "../../pages/sign-Up" },
// ];

// export default function Navbar() {
//   const [offcanvasOpen, setOffcanvasOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeHref, setActiveHref] = useState("/");

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = offcanvasOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [offcanvasOpen]);

//   return (
//     <>
//       {/* ── Main Navbar ── */}
//       <nav
//         className={`navbar navbar-expand-lg   ${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
//       >
//         <div className="container-xxl ">
//           {/* Brand */}
//           <Link
//             href="/"
//             className={`navbar-brand d-flex align-items-center gap-2 ${styles.brand}`}
//           >
//             <Image
//               src="/logoC.png"
//               alt="Pathfinder Club Logo"
//               width={70}
//               height={70}
//               className={styles.logoImg}
//               priority
//             />
//             <div className={`d-flex flex-column ${styles.brandText}`}>
//               <span className={styles.brandName}>
//                 Shauri Moyo Pathfinder Club
//               </span>
//               <em className={styles.brandTagline}>Take the Advent Message</em>
//             </div>
//           </Link>

//           {/* Hamburger toggler */}
//           <button
//             className={`navbar-toggler border-0 shadow-none ${styles.toggler}`}
//             type="button"
//             onClick={() => setOffcanvasOpen(true)}
//             aria-label="Open navigation"
//           >
//             <span className={styles.togglerBar} />
//             <span className={styles.togglerBar} />
//             <span className={styles.togglerBar} />
//           </button>

//           {/* Desktop Links */}
//           <div className="collapse navbar-collapse justify-content-end">
//             <ul className={`navbar-nav align-items-center ${styles.navList}`}>
//               {navLinks.map(({ label, href }) => (
//                 <li className="nav-item" key={label}>
//                   <Link
//                     href={href}
//                     className={`nav-link ${styles.navLink} ${activeHref === href ? styles.active : ""}`}
//                     onClick={() => setActiveHref(href)}
//                   >
//                     {label}
//                     <span className={styles.underline} />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* ── Backdrop ── */}
//       <div
//         className={styles.backdrop}
//         style={{
//           opacity: offcanvasOpen ? 1 : 0,
//           pointerEvents: offcanvasOpen ? "all" : "none",
//         }}
//         onClick={() => setOffcanvasOpen(false)}
//       />

//       {/* ── Offcanvas Drawer ── */}
//       <div
//         className={`${styles.offcanvas} ${offcanvasOpen ? styles.offcanvasOpen : ""}`}
//       >
//         {/* Close */}
//         <div className="d-flex justify-content-end w-100">
//           <button
//             className={styles.closeBtn}
//             onClick={() => setOffcanvasOpen(false)}
//             aria-label="Close menu"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Top third – logo + texts */}
//         <div
//           className={`d-flex flex-column align-items-center justify-content-center w-100 ${styles.offcanvasTop}`}
//         >
//           <Image
//             src="/logoC.png"
//             alt="Pathfinder Club Logo"
//             width={80}
//             height={80}
//             className={styles.offcanvasLogoImg}
//           />
//           <span className={`mt-3 text-center ${styles.offcanvasBrandName}`}>
//             Shauri Moyo Pathfinder Club
//           </span>
//           <em className={styles.offcanvasTagline}>Take the Advent Message</em>
//         </div>

//         {/* Divider */}
//         <hr className={styles.offcanvasDivider} />

//         {/* Centered links */}
//         <ul className={`navbar-nav w-100 ${styles.offcanvasNavList}`}>
//           {navLinks.map(({ label, href }) => (
//             <li className="nav-item text-center" key={label}>
//               <Link
//                 href={href}
//                 className={`nav-link ${styles.offcanvasLink} ${activeHref === href ? styles.offcanvasActive : ""}`}
//                 onClick={() => {
//                   setActiveHref(href);
//                   setOffcanvasOpen(false);
//                 }}
//               >
//                 {label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }
//=============================================================================

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./styles/navbar.module.css";

// export default function Navbar({
//   logoSrc = "",
//   logoAlt = "School Logo",
//   logoText = "Shauri Moyo Pathfinder Club",
//   height = 20,
//   logoWidth = 100, // ← Adjustable
//   logoHeight = 50, // ← Adjustable
// }) {
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg shadow-lg ${styles.navbar}`}
//         style={{ "--navbar-height": height }}
//       >
//         <div className="container-fluid">
//           {/* Logo - Supports Image or Text */}
//           <Link href="/" className={`${styles.navbarBrand} navbar-brand`}>
//             {logoSrc ? (
//               <Image
//                 src={logoSrc}
//                 alt={logoAlt}
//                 width={logoWidth}
//                 height={logoHeight}
//                 className={styles.logoImage}
//                 priority
//               />
//             ) : (
//               logoText
//             )}
//           </Link>

//           {/* Offcanvas Toggle Button */}
//           <button
//             className="btn btn-outline-secondary d-lg-none ms-auto"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Desktop Menu */}
//           <div
//             className="collapse navbar-collapse d-none d-lg-flex"
//             id="navbarSupportedContent"
//           >
//             <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navList}`}>
//               <li className="nav-item">
//                 <Link href="/" className={`${styles.navLink} nav-link active`}>
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/about" className={`${styles.navLink} nav-link`}>
//                   About Us
//                 </Link>
//               </li>

//               <li className="nav-item dropdown">
//                 <a
//                   className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Programs
//                 </a>
//                 <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//                   <li>
//                     <Link
//                       href="/programs"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       All Programs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/academic"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Academic
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/extracurricular"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Extracurricular
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//                   Gallery
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/join" className={`${styles.navLink} nav-link`}>
//                   Join Us
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/contact" className={`${styles.navLink} nav-link`}>
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* ====================== OFFCANVAS ====================== */}
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasNavbar"
//         aria-labelledby="offcanvasNavbarLabel"
//       >
//         <div className="offcanvas-header flex-column align-items-center border-bottom pb-3">
//           {/* Logo at the top of Offcanvas */}
//           <Link href="/" className="mb-3">
//             {logoSrc ? (
//               <Image
//                 src={logoSrc}
//                 alt={logoAlt}
//                 width={logoWidth * 0.85} // Slightly smaller in offcanvas
//                 height={logoHeight * 0.85}
//                 className={styles.logoImage}
//                 priority
//               />
//             ) : (
//               <h5 className={`offcanvas-title ${styles.offcanvasTitle}`}>
//                 {logoText}
//               </h5>
//             )}
//           </Link>

//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>

//         <div className="offcanvas-body">
//           <ul
//             className={`navbar-nav flex-grow-1 pe-3 ${styles.offcanvasNavList}`}
//           >
//             <li className="nav-item">
//               <Link href="/" className={`${styles.navLink} nav-link active`}>
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/about" className={`${styles.navLink} nav-link`}>
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//                 href="#"
//                 role="button"
//                 data-bs-toggle="dropdown"
//               >
//                 Programs
//               </a>
//               <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//                 <li>
//                   <Link
//                     href="/programs"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     All Programs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/programs/academic"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     Academic
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/programs/extracurricular"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     Extracurricular
//                   </Link>
//                 </li>
//               </ul>
//             </li>
//             <li className="nav-item">
//               <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//                 Gallery
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/join" className={`${styles.navLink} nav-link`}>
//                 Join Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/contact" className={`${styles.navLink} nav-link`}>
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
//-------------====================================================================================================================================================================================

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./styles/navbar.module.css";

// export default function Navbar({
//   logoSrc = "/logoB.png",
//   logoAlt = "School Logo",
//   logoText = "Your School Name",
//   logoWidth = 160,
//   logoHeight = 70,
// }) {
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg ${styles.navbar}`}
//       >
//         <div className="container-fluid">
//           {/* Logo - Supports Image or Text */}
//           <Link href="/" className={`${styles.navbarBrand} navbar-brand`}>
//             {logoSrc ? (
//               <Image
//                 src={logoSrc}
//                 alt={logoAlt}
//                 width={logoWidth}
//                 height={logoHeight}
//                 className={styles.logoImage}
//                 priority
//               />
//             ) : (
//               logoText
//             )}
//           </Link>

//           {/* Offcanvas Toggle Button */}
//           <button
//             className="btn btn-outline-secondary d-lg-none ms-auto"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Desktop Menu */}
//           <div
//             className="collapse navbar-collapse d-none d-lg-flex"
//             id="navbarSupportedContent"
//           >
//             <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navList}`}>
//               <li className="nav-item">
//                 <Link href="/" className={`${styles.navLink} nav-link active`}>
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/about" className={`${styles.navLink} nav-link`}>
//                   About Us
//                 </Link>
//               </li>

//               <li className="nav-item dropdown">
//                 <a
//                   className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Programs
//                 </a>
//                 <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//                   <li>
//                     <Link
//                       href="/programs"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       All Programs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/academic"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Academic
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/extracurricular"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Extracurricular
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//                   Gallery
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/join" className={`${styles.navLink} nav-link`}>
//                   Join Us
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/contact" className={`${styles.navLink} nav-link`}>
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* ====================== OFFCANVAS ====================== */}
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasNavbar"
//         aria-labelledby="offcanvasNavbarLabel"
//       >
//         <div className="offcanvas-header flex-column align-items-center border-bottom pb-3">
//           {/* Logo at the top of Offcanvas */}
//           <Link href="/" className="mb-3">
//             {logoSrc ? (
//               <Image
//                 src={logoSrc}
//                 alt={logoAlt}
//                 width={logoWidth * 0.85}
//                 height={logoHeight * 0.85}
//                 className={styles.logoImage}
//                 priority
//               />
//             ) : (
//               <h5 className={`offcanvas-title ${styles.offcanvasTitle}`}>
//                 {logoText}
//               </h5>
//             )}
//           </Link>

//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <ul
//           className={`navbar-nav flex-grow-1 pe-3 ${styles.offcanvasNavList}`}
//         >
//           <li className="nav-item">
//             <Link href="/" className={`${styles.navLink} nav-link active`}>
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link href="/about" className={`${styles.navLink} nav-link`}>
//               About Us
//             </Link>
//           </li>
//           <li className="nav-item dropdown">
//             <a
//               className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//               href="#"
//               role="button"
//               data-bs-toggle="dropdown"
//             >
//               Programs
//             </a>
//             <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//               <li>
//                 <Link
//                   href="/programs"
//                   className={`dropdown-item ${styles.dropdownItem}`}
//                 >
//                   All Programs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/programs/academic"
//                   className={`dropdown-item ${styles.dropdownItem}`}
//                 >
//                   Academic
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/programs/extracurricular"
//                   className={`dropdown-item ${styles.dropdownItem}`}
//                 >
//                   Extracurricular
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="nav-item">
//             <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//               Gallery
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link href="/join" className={`${styles.navLink} nav-link`}>
//               Join Us
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link href="/contact" className={`${styles.navLink} nav-link`}>
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image"; // Recommended for Next.js
// import styles from "./styles/navbar.module.css";

// export default function Navbar({
//   logoSrc = "", // Path to logo image
//   logoAlt = "School Logo",
//   logoText = "Your School Name",
//   height = "60px",
// }) {
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg ${styles.navbar}`}
//         style={{ "--navbar-height": height }}
//       >
//         <div className="container-fluid">
//           {/* Logo - Supports Image or Text */}
//           <Link
//             href="/public/logoA.png"
//             className={`${styles.navbarBrand} navbar-brand`}
//           >
//             {logoSrc ? (
//               <Image
//                 src={logoSrc}
//                 alt={logoAlt}
//                 width={160}
//                 height={170}
//                 className={styles.logoImage}
//                 priority
//               />
//             ) : (
//               logoText
//             )}
//           </Link>

//           {/* Offcanvas Toggle Button - Right on mobile */}
//           <button
//             className="btn btn-outline-secondary d-lg-none ms-auto"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Desktop Menu */}
//           <div
//             className="collapse navbar-collapse d-none d-lg-flex"
//             id="navbarSupportedContent"
//           >
//             <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navList}`}>
//               <li className="nav-item">
//                 <Link href="/" className={`${styles.navLink} nav-link active`}>
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/about" className={`${styles.navLink} nav-link`}>
//                   About Us
//                 </Link>
//               </li>

//               <li className="nav-item dropdown">
//                 <a
//                   className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Programs
//                 </a>
//                 <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//                   <li>
//                     <Link
//                       href="/programs"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       All Programs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/academic"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Academic
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/programs/extracurricular"
//                       className={`dropdown-item ${styles.dropdownItem}`}
//                     >
//                       Extracurricular
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//                   Gallery
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link href="/join" className={`${styles.navLink} nav-link`}>
//                   Join Us
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link href="/contact" className={`${styles.navLink} nav-link`}>
//                   Contact
//                 </Link>
//               </li>
//             </ul>

//             {/* Search Form */}
//             <form className="d-flex ms-lg-3" role="search">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search..."
//                 aria-label="Search"
//               />
//               <button className="btn btn-outline-primary" type="submit">
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>

//       {/* Left Offcanvas */}
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasNavbar"
//         aria-labelledby="offcanvasNavbarLabel"
//       >
//         <div className="offcanvas-header">
//           <h5
//             className={`offcanvas-title ${styles.offcanvasTitle}`}
//             id="offcanvasNavbarLabel"
//           >
//             Menu
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//             <li className="nav-item">
//               <Link href="/" className={`${styles.navLink} nav-link active`}>
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/about" className={`${styles.navLink} nav-link`}>
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className={`${styles.dropdownToggle} nav-link dropdown-toggle`}
//                 href="#"
//                 role="button"
//                 data-bs-toggle="dropdown"
//               >
//                 Programs
//               </a>
//               <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
//                 <li>
//                   <Link
//                     href="/programs"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     All Programs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/programs/academic"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     Academic
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/programs/extracurricular"
//                     className={`dropdown-item ${styles.dropdownItem}`}
//                   >
//                     Extracurricular
//                   </Link>
//                 </li>
//               </ul>
//             </li>
//             <li className="nav-item">
//               <Link href="/gallery" className={`${styles.navLink} nav-link`}>
//                 Gallery
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/join" className={`${styles.navLink} nav-link`}>
//                 Join Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/contact" className={`${styles.navLink} nav-link`}>
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
