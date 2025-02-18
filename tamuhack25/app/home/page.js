import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from './home.module.css'

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>Welcome to Howdy Stock</h1>
          <p>Simplify your budgeting, explore the market, and stay in control.</p>
          <Link href="/budget" className={styles.ctaButton}>
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <Image src="/icons/budget-icon.png" alt="Budget" width={60} height={60} />
              <h3>Budget Management</h3>
              <p>Keep track of your income and expenses with ease.</p>
            </div>
            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <Image src="/icons/market-icon.png" alt="Market" width={60} height={60} />
              <h3>Market Insights</h3>
              <p>Explore the latest market trends and opportunities.</p>
            </div>
            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <Image src="/icons/analytics-icon.png" alt="Analytics" width={60} height={60} />
              <h3>Analytics</h3>
              <p>Gain actionable insights with powerful analytics.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}