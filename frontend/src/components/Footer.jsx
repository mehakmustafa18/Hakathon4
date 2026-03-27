import '../styles/Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Home',
      links: ['Categories', 'Devices', 'Pricing', 'FAQ'],
    },
    {
      title: 'Movies',
      links: ['Gernes', 'Trending', 'New Release', 'Popular'],
    },
    {
      title: 'Shows',
      links: ['Gernes', 'Trending', 'New Release', 'Popular'],
    },
    {
      title: 'Support',
      links: ['Contact Us'],
    },
    {
      title: 'Subscription',
      links: ['Plans', 'Features'],
    },
  ];

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-main">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect With Us */}
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <img src="/Icon (8).png" alt="Facebook" />
              </a>
              <a href="#" className="social-link">
                <img src="/Icon (9).png" alt="Twitter" />
              </a>
              <a href="#" className="social-link">
                <img src="/Icon (10).png" alt="Linkedin" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>@2023 streamvib, All Rights Reserved</p>
          <div className="footer-legal">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
