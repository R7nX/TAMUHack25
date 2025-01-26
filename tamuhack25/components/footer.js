import Link from 'next/link'
import styles from './footer.module.css'

const Footer = () =>{
    return (
    <footer className={styles.footer}>
    <p>&copy; 2025 My App. All rights reserved.</p>
    </footer>
    );
};

export default Footer;