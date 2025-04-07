import { FaRegFaceSmile, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        {/* Gradient Accent */}
        <div className="position-relative mb-4">
          <div
            className="position-absolute w-100"
            style={{
              height: "3px",
              top: "-10px",
              background: "linear-gradient(to right, #8F87F1, #C68EFD, #E9A5F1)",
            }}
          ></div>
        </div>

        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <FaRegFaceSmile className="fs-4 text-primary me-2" />
              <h5 className="fw-bold mb-0">WhoYou?</h5>
            </div>
            <p className="text-white-50 mb-3 small">
              Find your celebrity doppelgänger with our advanced AI facial comparison technology.
            </p>
            <div className="d-flex gap-2">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.link} className="social-icon-link">
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Team Info Column */}
          <div className="col-md-6">
            <div className="row">
              {/* Contact Us Column */}
              <div className="col-md-6">
                <h6 className="mb-2 fw-bold small text-uppercase">Contact Us</h6>
                <ul className="list-unstyled mb-0 small">
                  <li className="mb-1">
                    <a href="mailto:hello@twinface.ai" className="footer-link">
                      info@whoyou.ai
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="tel:+11234567890" className="footer-link">
                      +1 (431) 688-6858
                    </a>
                  </li>
                </ul>
              </div>
              {/* Team Column */}
              <div className="col-md-6">
                <h6 className="mb-2 fw-bold small text-uppercase">Team</h6>
                <ul className="list-unstyled mb-0 small">
                  <li className="mb-1 text-white-50">Anna Dao A01275485</li>
                  <li className="mb-1 text-white-50">Gem Baojimin Sha A01345766</li>
                  <li className="mb-1 text-white-50">Vanessa La A01336725</li>
                  <li className="mb-1 text-white-50">Jason Hong A01232139</li>
                  <li className="mb-1 text-white-50">Andre Hindarmara A01075140</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-3 opacity-25" />

        <div className="text-center">
          <p className="small mb-0 text-white-50">
            &copy; {currentYear} WhoYou. All rights reserved.
          </p>
        </div>
      </div>

      <style>
        {`
        .footer-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: white;
        }
        .social-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.2s ease;
        }
        .social-icon-link:hover {
          background-color: rgba(198, 142, 253, 0.3);
          color: white;
        }
        `}
      </style>
    </footer>
  );
};

const socialLinks = [
  { icon: FaFacebook, link: "https://www.facebook.com/" },
  { icon: FaTwitter, link: "https://x.com/?lang=en-ca" },
  { icon: FaInstagram, link: "https://www.instagram.com/" },
  { icon: FaLinkedin, link: "https://www.linkedin.com/" },
];

export default Footer;