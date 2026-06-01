"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User, Home, Tv, Film, Heart } from "lucide-react";
import styles from "./Navbar.module.css";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tv", label: "TV Shows" },
  { href: "/movies", label: "Movies" },
  { href: "/new", label: "New & Popular" },
  { href: "/mylist", label: "My List" },
];

const MOBILE_NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tv", label: "TV Shows", icon: Tv },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/mylist", label: "My List", icon: Heart },
  { href: "/search", label: "Search", icon: Search },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide the navbar entirely on the full-screen watch experience
  if (pathname?.startsWith("/watch/")) {
    return null;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Logo />
            <nav className={styles.navLinks}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? styles.active : ""}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.right}>
            <Link href="/search" className={styles.iconBtn} aria-label="Search">
              <Search size={20} />
            </Link>
            <button className={styles.iconBtn} aria-label="Notifications" style={{ display: "var(--display-desktop-only, flex)" }}>
              <Bell size={20} />
            </button>
            <div className={styles.profile}>
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileBottomNav}>
        {MOBILE_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavItem} ${active ? styles.mobileActive : ""}`}
            >
              <Icon size={22} className={styles.mobileNavIcon} />
              <span className={styles.mobileNavLinkText}>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

