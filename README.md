# ⚙️ GitHub Actions Commands

GitHub Actions commands are the **core part** of the workflow execution process.
They allow you to automate tasks like setting up environments, running tests, or deploying code — all within GitHub’s cloud infrastructure.

---

## 🧩 Execution Hierarchy in GitHub Actions

When a GitHub Action runs, it follows this structured order:

1. **Workflow (Pipeline)** → defines the overall automation process.
2. **Jobs** → define stages or sections inside a workflow.
3. **Steps** → each job consists of multiple steps (tasks).
4. **Commands** → actual operations or scripts run in each step.

---

## 💡 What Are GitHub Actions Commands?

A **GitHub Action command** is a **predefined operation** provided by GitHub or the open-source community that can be directly used as a step in a workflow.

Instead of writing manual shell commands to install dependencies or configure environments, you can use these predefined actions to **save time**, **reduce errors**, and **simplify project setup**.

---

### 🧠 Example Scenario

Suppose we have a **runner machine** (a virtual machine hosted by GitHub on the cloud) with a **Linux OS**, and we want to set up a **Ruby on Rails** project.

To manually set up Ruby and Rails, we’d typically need to:

1. Install Ruby.
2. Install Rails.
3. Configure dependencies.
4. Set up environment variables.

Now imagine your organization has **20 different Ruby or Node.js projects** — repeating all setup commands manually for each would be inefficient and hard to maintain, especially when setup processes change over time.

---

## ✅ Solution: Use Predefined GitHub Actions

GitHub provides a marketplace full of **ready-to-use actions** for common tasks like setting up programming environments, checking out repositories, or caching dependencies.

These are used via the `uses:` keyword in a workflow YAML file.

---

### 🧰 Commonly Used GitHub Actions

| Purpose              | Action Name               | Example                                        |
| -------------------- | ------------------------- | ---------------------------------------------- |
| Checkout source code | `actions/checkout@v5`     | Checks out your repo so workflow can access it |
| Setup Python         | `actions/setup-python@v6` | Installs and configures a Python environment   |
| Setup Node.js        | `actions/setup-node@v4`   | Installs Node.js and npm for your project      |
| Setup Ruby           | `ruby/setup-ruby@v1`      | Sets up Ruby & Rails environment               |

---

### 🧪 Example 1 — Python Setup

```yml
steps:
  - uses: actions/checkout@v5
  
  - uses: actions/setup-python@v6
    with:
      python-version: '3.13'  # specify Python version
  
  - run: python my_script.py  # run your Python script
```

👉 This workflow:

* Checks out the code,
* Installs Python 3.13,
* Runs a Python script — all using GitHub’s hosted runner.

---

### 🧩 Example 2 — Node.js Setup

```yml
steps:
  - uses: actions/checkout@v5

  - name: Setup Node.js
    uses: Drafteame/node-cache-action@main
    with:
      node-version: '20' # Node.js version
      working-directory: cmd # Directory where npm install will run
      cache-key-suffix: suffix # Optional caching key suffix
```

This action:

* Installs Node.js 20,
* Runs npm install in the `cmd` folder,
* Enables caching to speed up builds.

---

### 🧱 Example 3 — Ruby & Rails Setup

```yml
steps:
  - uses: actions/checkout@v5

  - name: Setup Ruby
    uses: ruby/setup-ruby@v1
    with:
      ruby-version: '3.3'
      bundler-cache: true
```

This setup automatically installs Ruby, sets up Bundler, and caches dependencies.

---

## 🪄 Why Use Predefined Actions?

✅ **Consistency:** Setup remains uniform across all projects.
✅ **Simplicity:** You don’t need to write long installation scripts.
✅ **Maintenance:** If the action is updated, your projects automatically use the latest setup.
✅ **Reusability:** The same action can be used across multiple repositories.

---

## 🧭 Difference Between “GitHub Actions” and “GitHub Action”

| Term               | Description                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **GitHub Actions** | The entire CI/CD automation platform provided by GitHub (includes workflows, jobs, steps, triggers, and actions). |
| **GitHub Action**  | A single reusable component or command used inside a workflow (like `actions/checkout@v5`).                       |

---

### 📚 Summary

* **GitHub Actions** automate tasks like testing, building, and deploying applications.
* Workflows are defined in `.github/workflows/*.yml` files.
* **Predefined actions** (via `uses:`) simplify environment setup.
* You can mix **custom shell commands** and **GitHub Actions commands** in the same workflow.

---

**install testing liberary**

🧩 1️⃣ Install testing dependencies

Run these commands in your project root

* npm install --save-dev @testing-library/dom @testing-library/react @testing-library/jest-dom jsdom vitest

⚙️ 2️⃣ Update vite.config.js

Add the test configuration block at the end:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    exclude: ['node_modules', 'dist'],
  },
})
```

🧪 3️⃣ Create setup file

Create a new file:

```js
src/setupTests.js
import '@testing-library/jest-dom';
```

⚡ 4️⃣ Create your test file

Inside src/, create a new file:

```js
src/App.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App.jsx";



test("renders vite + react app", () => {
    render(<App />);
    const linkElement = screen.getByText(/Vite \+ React/i);
    expect(linkElement).toBeInTheDocument();
});

test("increment count button by one", () => {
    render(<App />);
    const buttonElement = screen.getByText("count is 0");
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 1");
});

```

▶️ 5️⃣ Add test script to package.json

Open your package.json and in the "scripts" section add:
```js
"test": "vitest"
```

* finally run ---> npm test/npm run test

