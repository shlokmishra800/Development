export default function Footer() {
  return (
    <footer id="footer" className="relative bg-[#D1E6DB] pt-12 pb-16 overflow-hidden">
      
      {/* Horizontal Divider separating Newsletter and Footer */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="border-t border-charcoal/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-20 text-left">
          
          {/* Column 1: Company */}
          <div className="space-y-4">
            <h4 className="text-[17px] font-bold text-charcoal tracking-tight">Company</h4>
            <ul className="space-y-2.5 text-[15px] font-medium text-charcoal/70">
              <li><a href="#hero" className="hover:text-charcoal transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="hover:text-charcoal transition-colors duration-300">Studio</a></li>
              <li><a href="#services" className="hover:text-charcoal transition-colors duration-300">Service</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Blog</a></li>
            </ul>
          </div>

          {/* Column 2: Terms & Policies */}
          <div className="space-y-4">
            <h4 className="text-[17px] font-bold text-charcoal tracking-tight">Terms & Policies</h4>
            <ul className="space-y-2.5 text-[15px] font-medium text-charcoal/70">
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Explore</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Accesibility</a></li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="space-y-4">
            <h4 className="text-[17px] font-bold text-charcoal tracking-tight">Follow Us</h4>
            <ul className="space-y-2.5 text-[15px] font-medium text-charcoal/70">
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Youtube</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Twitter</a></li>
            </ul>
          </div>

          {/* Column 4: Terms & Policies (Duplicate Header as in Figma) */}
          <div className="space-y-4">
            <h4 className="text-[17px] font-bold text-charcoal tracking-tight">Terms & Policies</h4>
            <div className="space-y-2 text-[15px] font-medium text-charcoal/70 leading-relaxed">
              <p>
                1498w Fluton ste, STE<br />
                2D Chicgo, IL 63867.
              </p>
              <p className="pt-2">
                (123) 456789000
              </p>
              <p className="pt-1">
                <a href="mailto:info@elementum.com" className="hover:text-charcoal transition-colors duration-300">
                  info@elementum.com
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom (Centered Copyright) */}
        <div className="text-center text-xs md:text-sm font-medium text-charcoal/50">
          &copy;2023 Elementum. All rights reserved
        </div>

      </div>
    </footer>
  );
}
