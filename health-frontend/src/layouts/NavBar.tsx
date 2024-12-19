import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#f3dcd6] to-[#dad5e3] p-3">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between">
        <div className="text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-[#eb6144] to-[#a85580] bg-clip-text text-transparent">
            HEALTH
          </span>
        </div>
        <div className="flex gap-4 text-xl font-semibold text-[#4e253a] my-auto">
          <Link to="/" className="mr-4">Edit Thresholds</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
