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

* Before running the test and build we alos check lint, is there any code quality issue of any lint issue then it will not run the test and build command.


# 📦 **GitHub Actions Artifacts & Contexts**

GitHub Actions provides features like **Artifacts** and **Contexts** that make CI/CD pipelines powerful and flexible.

* **Artifacts** help you **store and share data** between jobs or workflows.
* **Contexts** provide **metadata and dynamic variables** about your workflow, environment, secrets, and repository.

Let’s break both concepts down step-by-step 👇

---

## 🧱 **1. Artifacts in GitHub Actions**

### 🧠 **What Are Artifacts?**

In CI/CD pipelines, **artifacts** are files or data generated during one part of a workflow that can be **stored and shared** with other jobs or workflows.

For example:

* When you build a React project, the **output folder (`dist` or `build`)** contains your production-ready files.
* You may want to pass those files to another job or a CD (Continuous Delivery) pipeline for deployment.

This **data-sharing mechanism** between jobs or workflows is achieved using **artifacts**.

---

### 📘 **Example Scenario**

Let’s say you have a **React project**:

* Developers write code in **JSX** files.
* During the **CI pipeline**, the JSX code is compiled (using `npm run build`) into JavaScript files — stored in a folder like `dist/` or `build/`.
* Now your **CD pipeline** (deployment phase) needs those compiled files to deploy to **Vercel**, **AWS**, or **DigitalOcean**.

Instead of rebuilding the code again in the CD pipeline, you can **upload the built files as artifacts** during CI, and **download them** later during CD.

That’s how we efficiently pass data across pipelines using **artifacts**.

---

### ⚙️ **Workflow Example – Uploading Artifacts**

Below is an example where we upload the production-ready `dist` folder as an artifact after building the project:

```yml
name: Build and Upload Artifact

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: npm run build

      - name: Upload production build
        uses: actions/upload-artifact@v4
        with:
          name: build             # name of artifact
          path: dist              # folder to upload
```

---

### 🧩 **Explanation:**

* The `actions/upload-artifact@v4` uploads the folder you specify (`dist`) as an artifact.
* After uploading, GitHub provides a **download link** in your workflow logs:

  > Example:
  > `Artifact download URL: https://github.com/username/repo/actions/runs/19100319411/artifacts/4473221391`
* This artifact can now be accessed in later jobs or workflows.

---

### ⚙️ **Downloading Artifacts in Another Job**

To use this artifact (e.g., in your **CD pipeline** for deployment):

```yml
- name: Download build artifact
  uses: actions/download-artifact@v4
  with:
    name: build                     # must match uploaded artifact name
    run-id: ${{ github.event.workflow_run.id }}
    github-token: ${{ github.token }}

- name: Deploy to Vercel
  run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }} --confirm --name=cicdpipeline-project
```

---

### 🧠 **Explanation**

* `actions/download-artifact@v4` downloads the uploaded `build` artifact.
* `run-id` specifies which workflow run to fetch the artifact from.
* `${{ github.token }}` authenticates the request securely.
* Once downloaded, your deployment tool (e.g., Vercel CLI) uses it to deploy your production build.

---

### 💡 **Why Use Artifacts?**

| Benefit                       | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| 💾 **Persist Build Data**     | Store build results, reports, or logs after a job finishes.            |
| 🔄 **Share Between Jobs**     | Pass files from one job to another within the same workflow.           |
| 🔗 **Cross-Workflow Sharing** | Access data between separate workflows (like CI → CD).                 |
| ⚡ **Save Time**               | Avoid rebuilding code multiple times — reuse generated artifacts.      |
| 📊 **Store Test Reports**     | Upload reports like coverage data, logs, or screenshots for debugging. |

---

### 🧰 **Common Use Cases**

* Sharing build artifacts (e.g., compiled frontend assets).
* Storing test reports or code coverage reports.
* Caching generated files or Docker images.
* Passing configuration files between CI and CD jobs.

---

## 🧭 **2. GitHub Contexts**

### 🧠 **What Are Contexts?**

**Contexts** in GitHub Actions are **dynamic variables** that store metadata about the workflow run, environment, repository, or GitHub user.
They allow you to **customize your pipeline dynamically** — based on event data or environment details.

In short:

> Contexts give you information **about “what’s happening” inside your workflow** — like who triggered it, which branch, what commit, etc.

---

### 🧩 **Popular GitHub Contexts**

| Context   | Description                                             | Example Usage                            |
| --------- | ------------------------------------------------------- | ---------------------------------------- |
| `github`  | Metadata about the workflow run, repository, and event. | `${{ github.repository }}` → `user/repo` |
| `env`     | Environment variables in your workflow.                 | `${{ env.NODE_ENV }}`                    |
| `job`     | Information about the current job.                      | `${{ job.status }}`                      |
| `steps`   | Access output values from previous steps.               | `${{ steps.build.outputs.version }}`     |
| `runner`  | Info about the machine running the job.                 | `${{ runner.os }}` → `Linux`             |
| `secrets` | Secure environment variables (like API keys).           | `${{ secrets.VERCEL_TOKEN }}`            |

---

### ⚙️ **Example – Using Contexts in Deployment**

```yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: build
          run-id: ${{ github.event.workflow_run.id }}
          github-token: ${{ github.token }}

      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }} --confirm --name=cicdpipeline-project
```

### 🔍 **Explanation**

* `${{ github.event.workflow_run.id }}` → gives the ID of the workflow that produced the artifact.
* `${{ github.token }}` → automatically generated token by GitHub to authenticate actions.
* `${{ secrets.VERCEL_TOKEN }}` → a secure secret stored in your repo settings (used for deployment).

---

## 🔐 **GitHub Secrets**

* **Secrets** are encrypted environment variables used to store sensitive information such as:

  * API keys
  * Database passwords
  * Access tokens
* These are stored in your repository under:
  `Settings → Secrets and variables → Actions`

> Example:
>
> ```yml
> run: vercel --token ${{ secrets.VERCEL_TOKEN }}
> ```
>
> Here, `VERCEL_TOKEN` is securely stored in your GitHub repo, never exposed in plain text.

---

## 🧩 **Example Use Case – Combine CI + CD with Artifacts and Contexts**

Let’s tie it all together 👇

```yml
name: React CI/CD Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - run: npm install
      - run: npm run build

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: react-build
          path: dist

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: react-build

      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }} --confirm
```

---

## 🧠 **Summary**

| Concept             | Purpose                                       | Example                                         |
| ------------------- | --------------------------------------------- | ----------------------------------------------- |
| **Artifact**        | Store and share files between jobs/workflows. | Upload `dist` folder from CI to use in CD.      |
| **Context**         | Provides metadata and workflow variables.     | `${{ github.actor }}`, `${{ secrets.API_KEY }}` |
| **Secret**          | Securely store sensitive credentials.         | `${{ secrets.VERCEL_TOKEN }}`                   |
| **Upload Action**   | Saves files as artifacts.                     | `actions/upload-artifact@v4`                    |
| **Download Action** | Retrieves previously saved artifacts.         | `actions/download-artifact@v4`                  |

---

### 💬 **In Simple Words**

* **Artifacts** = Your files that travel between jobs (like your `dist/` folder).
* **Contexts** = Information about your workflow (who ran it, on which branch, etc.).
* **Secrets** = Hidden credentials used securely in workflows.

---
