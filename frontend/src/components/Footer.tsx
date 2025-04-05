import { NavLink } from "react-router";
import logo from "@img/logo.svg";
import logoFacebook from "@img/icons/Facebook.svg";
import logoInstagram from "@img/icons/Instagram.svg";
import logoX from "@img/icons/X.svg";
import logoLinkedIn from "@img/icons/LinkedIn.svg";
import logoYoutube from "@img/icons/Youtube.svg";
import FadeInSection from "./common/FadeInSection";

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
    { href: "#", image: logoFacebook },
    { href: "#", image: logoInstagram },
    { href: "#", image: logoX },
    { href: "#", image: logoLinkedIn },
    { href: "#", image: logoYoutube },
  ];

  return (
    <footer className="flex bg-frame-red text-char-sec sec-padding">
      <FadeInSection className="grid items-center text-sm gap-12 page-container mt-20 mb-0">
        <div className="flex flex-col gap-6 items-center lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center text-center sm:text-start lg:items-start">
            <p className="text-lg font-semibold">Subscribe to updates</p>
            <p className="text-base">
              Stay informed about our latest travel packages and offers.
            </p>
          </div>
          <div className="flex flex-col text-base gap-2 items-center lg:items-end">
            <form className="flex flex-col xs:flex-row gap-4">
              <input
                className="border-white border-1 h-12 px-4 focus:border-primary focus:outline-1 focus:outline-primary"
                type="email"
                placeholder="Your email here"
              />
              <button className="border-white border-1 px-4 h-12 sm:px-12 hover:cursor-pointer hover:bg-primary hover:border-primary">
                Join
              </button>
            </form>
            <p className="text-center sm:text-start">By subscribing, you accept our Privacy Policy and updates.</p>
          </div>
        </div>
        <div className="grid xs:grid-cols-2 gap-10 md:grid-cols-4 lg:gap-2">
          <div className="flex justify-center">
            <img className="stroke-white h-8" src={logo} alt="logo image" />
          </div>
          {links.map((link, i) => (
            <div key={i} className="flex flex-col gap-3 items-center">
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
        <div className="flex flex-col gap-4 md:flex-row justify-between border-t-1 border-white py-6">
          <div className="flex flex-col items-center sm:flex-row gap-4">
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
          <div className="flex justify-evenly gap-4 sm:justify-start">
            {socialIcons.map((icon, i) => (
              <NavLink key={i} to={icon.href}>
                <img src={icon.image} alt="social icon" />
              </NavLink>
            ))}
          </div>
        </div>
      </FadeInSection>
    </footer>
  );
};

export default Footer;
