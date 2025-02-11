import Button from "./Button";

const Navbar = () => {
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/" },
    { title: "About", href: "/" },
  ];
  return (
    <nav className="flex w-full bg-zinc-700 h-[100px] justify-between">
      <img src={"/logo.svg"} className="size-14" />
      <div className="uppercase flex justify-between">
        {menuItems.map((item) => (
          <a key={item.title} href={item.href}>
            {item.title}
          </a>
        ))}
      </div>
      <Button>Login</Button>
    </nav>
  );
};

export default Navbar;
