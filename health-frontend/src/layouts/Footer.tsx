const Footer = () => {
    return (
      <footer className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center px-3">
          <div className="text-[#4e253a] text-sm font-semibold">
            &copy; {new Date().getFullYear()} HEALTH Inc. All rights reserved.
          </div>
          <div className="flex gap-4 text-[#4e253a] text-sm">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  