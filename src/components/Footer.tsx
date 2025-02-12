import { NavLink } from "react-router";

const Footer = () => {
  const links = [
    [
      { href: "#", title: "Quick Links" },
      { href: "#", title: "About Us" },
      { href: "#", title: "Contact Us" },
      { href: "#", title: "Destinations" },
      { href: "#", title: "Travel Tips" },
      { href: "#", title: "Blog Posts" },
    ],
    [
      { href: "#", title: "Support" },
      { href: "#", title: "Help Center" },
      { href: "#", title: "FAQs" },
      { href: "#", title: "Feedback" },
      { href: "#", title: "Sitemap" },
      { href: "#", title: "Careers" },
    ],
    [
      { href: "#", title: "Connect With Us" },
      { href: "#", title: "Facebook" },
      { href: "#", title: "Intagram" },
      { href: "#", title: "Twitter" },
      { href: "#", title: "LinkedIn" },
      { href: "#", title: "YouTube" },
    ],
  ];
  const credits = [
    { href: "#", title: "© 2024 J-Travel. All rights reserved." },
    { href: "#", title: "Privacy Policy" },
    { href: "#", title: "Terms of Service" },
    { href: "#", title: "Cookie Settings" },
  ];
  const socialIcons = [
    { href: "#", image: "Facebook.svg" },
    { href: "#", image: "Instagram.svg" },
    { href: "#", image: "X.svg" },
    { href: "#", image: "LinkedIn.svg" },
    { href: "#", image: "Youtube.svg" },
  ];

  return (
    <section className="flex bg-dark-secondary">
      <div className="wrapper grid font-inter text-white items-center mt-30 mb-10 mx-20 text-sm gap-12 w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Subscribe to updates</p>
            <p className="text-base">
              Stay informed about our latest travel packages and offers.
            </p>
          </div>
          <div className="flex flex-col text-base gap-2">
            <form className="flex gap-4">
              <input
                className="border-white border-1 h-12 px-4 focus:border-primary focus:outline-1 focus:outline-primary"
                type="email"
                size={30}
                placeholder="Your email here"
              />
              <button className="border-white border-1 h-12 px-12 hover:cursor-pointer hover:bg-primary hover:border-primary">
                Join
              </button>
            </form>
            <p>By subscribing, you accept our Privacy Policy and updates.</p>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-between w-full">
          <img className="stroke-white size-16" src="./logo.svg" alt="" />
          {links.map((link, i) => (
            <div key={i} className="flex flex-col gap-4">
              {link.map((item, i) =>
                i === 0 ? (
                  <p key={i} className="font-semibold text-base">
                    {item.title}
                  </p>
                ) : (
                  <NavLink key={i} to={item.href} className="hover:underline">
                    <p>{item.title}</p>
                  </NavLink>
                )
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t-1 border-white py-6">
          <div className="flex gap-4">
            {credits.map((c, i) =>
              i === 0 ? (
                <p key={i}>{c.title}</p>
              ) : (
                <NavLink
                  key={i}
                  to={c.href}
                  className="hover:underline first:cursor-default"
                  target="_blank"
                >
                  <p>{c.title}</p>
                </NavLink>
              )
            )}
          </div>
          <div className="flex gap-4">
            {socialIcons.map((icon, i) => (
              <NavLink key={i} to={icon.href}>
                <img src={`./icons/${icon.image}`} alt="social icon" />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
