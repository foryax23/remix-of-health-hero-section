import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Download", href: "#" },
    { label: "Updates", href: "#" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Guides", href: "#" },
    { label: "API", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30">
      <div className="px-5 md:px-10 py-16 md:py-20">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
            {/* Logo & Description */}
            <div className="col-span-2">
              <Link to="/" className="inline-block mb-6">
                <img src={logo} alt="Aero" className="h-8" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                Your AI-powered personal coach for nutrition, fitness, and wellness. Transform your health on auto-pilot.
              </p>
              {/* App Store Badge */}
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <svg className="w-5 h-5 text-foreground" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.3223 4.39453C13.4941 4.39453 13.7871 4.42188 14.2012 4.47656C14.6152 4.53125 15.0684 4.6875 15.5605 4.94531C16.0605 5.19531 16.5137 5.61328 16.9199 6.19922C16.8965 6.22266 16.7832 6.30859 16.5801 6.45703C16.377 6.59766 16.1504 6.80859 15.9004 7.08984C15.6504 7.36328 15.4316 7.71484 15.2441 8.14453C15.0566 8.56641 14.9629 9.07031 14.9629 9.65625C14.9629 10.3281 15.0801 10.8984 15.3145 11.3672C15.5566 11.8359 15.834 12.2148 16.1465 12.5039C16.4668 12.7852 16.748 12.9922 16.9902 13.125C17.2402 13.2578 17.373 13.3281 17.3887 13.3359C17.3809 13.3672 17.2793 13.6445 17.084 14.168C16.8965 14.6914 16.584 15.2734 16.1465 15.9141C15.7637 16.4688 15.3496 16.9805 14.9043 17.4492C14.4668 17.918 13.9395 18.1523 13.3223 18.1523C12.9082 18.1523 12.5684 18.0938 12.3027 17.9766C12.0371 17.8516 11.7637 17.7305 11.4824 17.6133C11.2012 17.4883 10.8223 17.4258 10.3457 17.4258C9.88477 17.4258 9.49805 17.4883 9.18555 17.6133C8.88086 17.7383 8.58789 17.8633 8.30664 17.9883C8.0332 18.1133 7.70898 18.1758 7.33398 18.1758C6.76367 18.1758 6.26367 17.9492 5.83398 17.4961C5.4043 17.043 4.96289 16.5 4.50977 15.8672C3.98633 15.1172 3.53711 14.2031 3.16211 13.125C2.79492 12.0391 2.61133 10.9453 2.61133 9.84375C2.61133 8.66406 2.83398 7.67578 3.2793 6.87891C3.72461 6.07422 4.29492 5.46875 4.99023 5.0625C5.69336 4.64844 6.41992 4.44141 7.16992 4.44141C7.56836 4.44141 7.94336 4.50781 8.29492 4.64062C8.64648 4.76562 8.97461 4.89453 9.2793 5.02734C9.5918 5.16016 9.87305 5.22656 10.123 5.22656C10.3652 5.22656 10.6465 5.15625 10.9668 5.01562C11.2871 4.875 11.6465 4.73828 12.0449 4.60547C12.4434 4.46484 12.8691 4.39453 13.3223 4.39453Z" />
                </svg>
                <span className="text-sm text-foreground">App Store</span>
              </a>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Aero. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
