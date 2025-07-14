import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-6 py-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand + Contact */}
        <div className="space-y-4">
          <Logo></Logo>
          <p className="text-sm text-gray-400">
            WorkSync is a modern employee management platform to efficiently
            manage tasks, salaries, and role-based access with ease.
          </p>
          <button className="btn btn-primary rounded-full mt-2">
            +00 123 456 789
          </button>
          <div className="text-sm mt-4">
            <p>Location: 123 Down Street, Envato HQ Australia</p>
            <p>Inquiry: themeht123@gmail.com</p>
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-lg font-bold mb-2">Our Services</h4>
          <ul className="space-y-1">
            <li>Portfolio Manage</li>
            <li>Team Leadership</li>
            <li>Market Research</li>
            <li>Executive Search</li>
            <li>Strategic Planning</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-bold mb-2">Explore</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Blog Classic</li>
            <li>Our History</li>
            <li>Price Table</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold">Our Newsletter</h4>
          <p>Enter your email and we contact you!</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="input input-bordered w-full rounded-l"
            />
            <button className="btn btn-primary rounded-l-none">Send</button>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="max-w-7xl mx-auto flex justify-between items-center border-t border-gray-700 pt-4 mt-6 text-sm flex-wrap gap-4">
        <div className="flex gap-3">
          <button className="btn btn-sm btn-circle btn-neutral">W</button>
          <button className="btn btn-sm btn-circle btn-neutral">X</button>
          <button className="btn btn-sm btn-circle btn-neutral">G</button>
        </div>
        <p>© 2024 Hireox. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
