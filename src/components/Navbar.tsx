import Button from "./Button";

const Navbar = () => {
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/" },
    { title: "About", href: "/" },
  ];
  return (
    <nav className="flex w-full wrapper bg-zinc-700 h-20 justify-between items-center absolute z-50">
      <a href="/">
        <img src={"/logo.svg"} className="size-24" />
      </a>
      <div className="uppercase flex justify-between gap-40 text-xl font-bold text-white font-inter">
        {menuItems.map((item) => (
          <a key={item.title} href={item.href} className="">
            {item.title}
          </a>
        ))}
      </div>
      <a href="/login">
        <Button size="sm" primary={true}>Login</Button>
      </a>
    </nav>
  );
};

export default Navbar;
