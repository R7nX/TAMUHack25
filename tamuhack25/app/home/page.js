import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/header'

export default function Home() {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="bg-gray-100 min-h-screen">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
            <div className="container mx-auto text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to My App
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Simplify your budgeting, explore the market, and stay in control.
              </p>
              <a
                href="/budget"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200"
              >
                Get Started
              </a>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <Image
                    src="/budget-icon.svg"
                    alt="Budget"
                    width={60}
                    height={60}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Budget Management</h3>
                  <p className="text-gray-600">
                    Keep track of your income and expenses with ease.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <Image
                    src="/market-icon.svg"
                    alt="Market"
                    width={60}
                    height={60}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
                  <p className="text-gray-600">
                    Explore the latest market trends and opportunities.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <Image
                    src="/analytics-icon.svg"
                    alt="Analytics"
                    width={60}
                    height={60}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                  <p className="text-gray-600">
                    Gain actionable insights with powerful analytics.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 My App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


