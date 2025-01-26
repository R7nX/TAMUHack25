"use client";

import { useState } from "react";
import styles from "./budget.module.css";
import Header from "../../components/header"
import Footer from '../../components/footer'
import Head from "next/head";
import Script from "next/script";

export default function Budget() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({ needs: 0, wants: 0, savings: 0 });
  const [hold] = useState({ needs: 0, wants: 0, savings: 0 });

  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setIncome(value);
    setCategoryBudgets({
      needs: value * 0.5,
      wants: value * 0.3,
      savings: value * 0.2,
    });
  };

  const addExpense = (category, amount) => {
    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
  };

  const calculateSpent = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1>Budget Tracker</h1>
        <p>Organize your spending and meet your financial goals.</p>
      </section>

      <section className={styles.budgetInput}>
        <h2>Set Your Monthly Income</h2>
        <input
          type="number"
          placeholder="Enter your monthly income"
          onChange={handleIncomeChange}
          className={styles.inputField}
        />
        <div className={styles.budgetSummary}>
          <div>
            <h3>Needs (50%)</h3>
            <p>${categoryBudgets.needs.toFixed(2)}</p>
          </div>
          <div>
            <h3>Wants (30%)</h3>
            <p>${categoryBudgets.wants.toFixed(2)}</p>
          </div>
          <div>
            <h3>Savings (20%)</h3>
            <p>${categoryBudgets.savings.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className={styles.expenseTracker}>
        <h2>Add an Expense</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const category = e.target.category.value;
            const amount = e.target.amount.value;
            if (category && amount) addExpense(category, amount);
            e.target.reset();
          }}
          className={styles.expenseForm}
        >
          <select name="category" required className={styles.selectField}>
            <option value="">Select Category</option>
            <option value="needs">Needs</option>
            <option value="wants">Wants</option>
            <option value="savings">Savings</option>
          </select>
          <input type="number" name="amount" placeholder="Expense amount" required className={styles.inputField} />
          <button type="submit" className={styles.addButton}>Add Expense</button>
        </form>
      </section>

      <section className={styles.progressSection}>
        <h2>Progress</h2>
        <div className={styles.progressGrid}>
          {["needs", "wants", "savings"].map((category) => {
            const spent = calculateSpent(category);
            const budget = categoryBudgets[category];
            const percentage = Math.min((spent / budget) * 100, 100);

            hold[category] = spent;

            return (
              <div key={category} className={styles.progressCard}>
                <h3>
                  {category.charAt(0).toUpperCase() + category.slice(1)}: ${spent.toFixed(2)} / $
                  {budget.toFixed(2)}
                </h3>
                <div className={styles.progressBar}>
                  <div
                    className={styles.filledBar}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: spent > budget ? "red" : "green",
                    }}
                  ></div>
                  <script>
                  </script>
                </div>
                  {spent > budget > 100 && <p className={styles.warningText}>Over Budget!</p>}
                <div>
                <p id={category}>
                </p>
                </div>
              </div>
            );

          })}
        </div>
        <br></br>
        <h2>
          Net Profit: ${income-hold.needs-hold.wants-hold.savings}
        </h2>
      </section>


      
      <Footer />
    </div>
  );
}