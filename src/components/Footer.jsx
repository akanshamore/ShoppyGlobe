import "./Footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} ShoppyGlobe. Created by Akansha More</p>
      </div>
    </footer>
  );
};
