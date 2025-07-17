import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className=" flex md:gap-1 items-center">
        <img className=" w-18" src={logo} alt="" />
        <h2 className=" hidden md:flex font-poppins -ml-2 text-lg md:text-3xl font-bold">
          Work<span className="text-primary text-4xl">S</span>ync
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
