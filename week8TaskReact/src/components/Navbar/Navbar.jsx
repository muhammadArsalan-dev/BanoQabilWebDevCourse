const Navbar = ({ links }) => {
  return (
    <nav className="navbar">
      <h2>TechFlow Solutions</h2>
      <ul className="nav-links">
        {links.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;