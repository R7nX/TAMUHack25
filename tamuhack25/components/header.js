import Link from 'next/link'
import styles from './header.module.css'

const Header = () =>{
    return (
        <header className={styles.header}>
      <h1 className="text-xl font-bold">My App</h1>
      <br></br>
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
      <br></br>
    </header>
    );
};

export default Header;