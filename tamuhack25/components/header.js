import Link from 'next/link'

const Header = () =>{
    return (
        <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <nav className="flex space-x-4">
        <Link href="/home">
          <a className="hover:underline">Home</a>
        </Link>
        <Link href="/budget">
          <a className="hover:underline">Budget</a>
        </Link>
        <Link href="/market">
          <a className="hover:underline">Market</a>
        </Link>
      </nav>
    </header>
    );
};

export default Header;