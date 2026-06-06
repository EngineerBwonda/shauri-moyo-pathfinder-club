"use client";

import { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center fw-bold fs-4"
        >
          <span style={{ color: "#00b140" }}>VALE</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Menu */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Who We Are
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/about" className="dropdown-item">
                    About Vale
                  </Link>
                </li>
                <li>
                  <Link href="/leadership" className="dropdown-item">
                    Leadership
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="dropdown-item">
                    History
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                What We Do
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/mining" className="dropdown-item">
                    Mining
                  </Link>
                </li>
                <li>
                  <Link href="/logistics" className="dropdown-item">
                    Logistics
                  </Link>
                </li>
                <li>
                  <Link href="/base-metals" className="dropdown-item">
                    Base Metals
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/sustainability" className="nav-link">
                Sustainability
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/innovation" className="nav-link">
                Innovation
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/investors" className="nav-link">
                Investors
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/news" className="nav-link">
                Vale Now
              </Link>
            </li>
          </ul>

          {/* Right Side: Search + Language + CTA */}
          <div className="d-flex align-items-center gap-3">
            {/* Search */}
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "200px" }}
              />
            </div>

            {/* Language Selector */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                EN
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Português
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Español
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="btn btn-success btn-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
