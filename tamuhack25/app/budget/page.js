"use client";

import { useState } from "react";
import styles from "./budget.module.css";
import Header from "../../components/header"
import Head from "next/head";

export default function Budget() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({ needs: 0, wants: 0, savings: 0 });

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
      <h1 className={styles.title}>Budget Tracker (50/30/20 Rule)</h1>
      
      <section className={styles.budgetInput}>
        <h2>Set Your Monthly Income</h2>
        <input
          type="number"
          placeholder="Enter your monthly income"
          onChange={handleIncomeChange}
        />
        <div className={styles.budgetSummary}>
          <p>Needs (50%): ${categoryBudgets.needs.toFixed(2)}</p>
          <p>Wants (30%): ${categoryBudgets.wants.toFixed(2)}</p>
          <p>Savings (20%): ${categoryBudgets.savings.toFixed(2)}</p>
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
        >
          <select name="category" required>
            <option value="">Select Category</option>
            <option value="needs">Needs</option>
            <option value="wants">Wants</option>
            <option value="savings">Savings</option>
          </select>
          <input type="number" name="amount" placeholder="Expense amount" required />
          <button type="submit">Add Expense</button>
        </form>
        <div className={styles.expenseList}>
          <h3>Expenses:</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.category}: ${expense.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.progressSection}>
        <h2>Progress</h2>
        {["needs", "wants", "savings"].map((category) => {
          const spent = calculateSpent(category);
          const budget = categoryBudgets[category];
          const percentage = Math.min((spent / budget) * 100, 100);

          return (
            <div key={category} className={styles.progressBar}>
              <p>
                {category.charAt(0).toUpperCase() + category.slice(1)}: ${spent.toFixed(2)} / $
                {budget.toFixed(2)}
              </p>
              <div className={styles.bar}>
                <div
                  className={styles.filled}
                  style={{ width: `${percentage}%`, backgroundColor: percentage > 100 ? "red" : "green" }}
                ></div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
