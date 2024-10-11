import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-slate-500  font-bold text-black">
      <div className="flex mb-4 justify-between items-center px-20 p-4">
        <Link href="/">
          <h3 className="font-bold text-2xl">Next CRUD</h3>
        </Link>
        <ul className="flex gap-x-2 text-lg font-bold">
          <li>
            <Link href="/new" className="text-slate-300 hover:text-slate-200 px-10">New</Link>
          </li>
          <li>
            <Link href="/about" className="text-slate-300 hover:text-slate-200">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
