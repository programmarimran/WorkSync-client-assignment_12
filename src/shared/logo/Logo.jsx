import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className=" flex gap-1 items-center">
      <img className=" w-18" src={logo} alt="" />
      <h2 className="text-3xl font-bold">
        W<span className="text-primary">o</span>rkSync
      </h2>
    </div>
  );
};

export default Logo;
