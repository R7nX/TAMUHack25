import Link from 'next/link'
import styles from './header.module.css'

const Header = () =>{
    return (
        <header className={styles.header}>
      <h1 className="text-xl font-bold">My App</h1>
      <br></br>
      <nav className="flex space-x-4">
        <Link href="/home">
          Home
        </Link>
        <Link href="/budget">
          Budget
        </Link>
        <Link href="/market">
          Market
        </Link>
      </nav>
      <br></br>
    </header>
    );
};

export default Header;