import { Link } from "react-router";

export const Menu = () => {
  return (
    <header className="flex flex-row justify-center gap-2 h-12 items-center px-4">
      <Link to="/" className="text-md font-regular">Write Every Day</Link>
    </header>
  );
};
