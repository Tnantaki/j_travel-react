import React from "react";

const Footer = () => {
  const links = [
    [
      "Quick Links",
      "About Us",
      "Contact Us",
      "Destinations",
      "Travel Tips",
      "Blog Posts",
    ],
    ["Support", "Help Center", "FAQs", "Feedback", "Sitemap", "Careers"],
    [
      "Connect With Us",
      "Facebook",
      "Intagram",
      "Twitter",
      "LinkedIn",
      "YouTube",
    ],
  ];
  const credits = [
    "© 2024 J-Travel. All rights reserved.",
    "Privacy Policy",
    "Terms of Service",
    "Cookie Settings",
  ];
  const socialIcons = [
    "Facebook.svg",
    "Instagram.svg",
    "X.svg",
    "LinkedIn.svg",
    "Youtube.svg",
  ];

  return (
    <section className="flex bg-dark-secondary">
      <div className="wrapper grid font-inter text-white items-center mt-30 mb-10 mx-20 text-sm gap-12 w-full">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Subscribe to updates</p>
            <p className="text-base">
              Stay informed about our latest travel packages and offers.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-between w-full">
          <img className="stroke-white size-16" src="/logo.svg" alt="" />
          {links.map((link) => (
            <div className="flex flex-col gap-4">
              {link.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t-1 border-white py-6">
          <div className="flex gap-4">
            {credits.map((c) => (
              <p>{c}</p>
            ))}
          </div>
          <div className="flex gap-4">
            {socialIcons.map((icon) => (
              <img src={`/icons/${icon}`} alt="social icon" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
