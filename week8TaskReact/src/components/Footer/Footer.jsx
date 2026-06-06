const Footer = ({ year, companyName }) => {
  return (
    <footer className="footer">
      <p>&copy; {year} {companyName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;