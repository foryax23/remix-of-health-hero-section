import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center px-5 md:px-10 py-6 text-foreground font-medium">
      {/* Logo */}
      <Link
        to="/"
        className="absolute left-5 md:left-10 h-7"
      >
        <img
          src={logo}
          alt="Aero"
          className="h-full w-auto cursor-pointer"
        />
      </Link>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute right-5 p-2 rounded-full text-foreground"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Navigation Pills */}
      <div
        className="hidden md:flex items-center justify-center gap-0 p-1 rounded-full border-2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Link
          to="/about"
          className="px-5 py-3 rounded-full text-foreground hover:bg-white/10 transition-colors"
        >
          About us
        </Link>
        <Link
          to="/blog"
          className="px-5 py-3 rounded-full text-foreground hover:bg-white/10 transition-colors"
        >
          Blog
        </Link>
        <a
          href="#"
          className="px-5 py-3 rounded-full text-foreground transition-colors"
          style={{ backgroundColor: "rgba(34, 35, 38, 0.1)" }}
        >
          Download App
        </a>
      </div>

      {/* Desktop Auth Buttons - Right Side */}
      <div
        className="hidden md:flex items-center justify-center gap-0 p-1 rounded-full border-2 absolute right-5 md:right-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Link
          to="/login"
          className="px-5 py-3 rounded-full text-foreground hover:bg-white/10 transition-colors"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-5 py-3 rounded-full text-foreground transition-colors"
          style={{ backgroundColor: "rgba(34, 35, 38, 0.1)" }}
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-[76px] flex flex-col items-center pt-8 gap-2"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="w-[90%] text-center px-5 py-4 rounded-full text-foreground hover:bg-white/10 transition-colors border border-white/10"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="w-[90%] text-center px-5 py-4 rounded-full text-foreground transition-colors bg-white/10"
          >
            Sign Up
          </Link>
          <div className="w-[90%] h-px bg-white/10 my-2" />
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="w-[90%] text-center px-5 py-4 rounded-full text-foreground hover:bg-white/10 transition-colors border border-white/10"
          >
            About us
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsOpen(false)}
            className="w-[90%] text-center px-5 py-4 rounded-full text-foreground hover:bg-white/10 transition-colors border border-white/10"
          >
            Blog
          </Link>
          <a
            href="#"
            className="w-[90%] text-center px-5 py-4 rounded-full text-foreground transition-colors bg-white/10"
          >
            Download App
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
