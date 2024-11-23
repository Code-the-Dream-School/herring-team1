function Header() {
  return (
    <nav id="nav" className="flex m-4 justify-end space-x-4">
      <a href="/">Home</a>
      <br />
      <a href="/#mission">Our Mission</a>
      <br />
      <a href="/search">Find Opportunities</a> <br />
      <a href="/register">Register</a> <br />
      <a href="/login">Login</a>
    </nav>
  );
}

export default Header;
