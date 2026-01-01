import { Link } from "react-router";

export const Menu = () => {
  return (
    <div className="flex flex-row justify-center gap-2 h-12 items-center px-4">
      <header className="text-md font-regular"><Link to="/">Write Every Day</Link></header>
    </div>
  );
};