import Link from 'next/link'
import styles from './header.module.css'

const Header = () =>{
    return (
        <header className={styles.header}>
      <h1 className={styles.title}>My App</h1>
      <nav className={styles.nav}>
        <Link href="/home">Home</Link>
        <Link href="/budget">Budget</Link>
        <Link href="/market">Market</Link>
      </nav>
    </header>
    );
};

export default Header;