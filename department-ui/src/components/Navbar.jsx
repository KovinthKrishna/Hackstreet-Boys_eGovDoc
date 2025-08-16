import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MdOutlineMapsHomeWork } from "react-icons/md";

function Navbar() {
  const navItems = [
    { path: "/dashboard", label: "Home", Icon: MdOutlineMapsHomeWork },
  ];

  return (
    <nav className="sticky top-0 bottom-0 flex h-dvh flex-col items-center justify-between bg-gradient-to-b from-[#2F7496]/70 from-0% to-[#0F2530]/70 to-100% py-5">
      <header>
        <img src={Logo} alt="Logo" className="h-[139px] w-[148px]" />
      </header>

      <div className="flex min-h-[500px] flex-col justify-between">
        {navItems.map(({ path, label, Icon }) => {
          return (
            <Link
              to={path}
              key={path}
              className="button-primary flex items-center gap-4"
            >
              <Icon className="[&>path:not([fill='none'])]:fill-[url(#icon-gradient)]" />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="button-primary flex justify-center">Sign out</div>
    </nav>
  );
}

export default Navbar;
