# 🏎️ Mercedes-Benz CI/CD Practice Guide

Welcome! This repository is engineered specifically to help you practice **Continuous Integration (CI)** and **Continuous Deployment (CD)** using modern dev tools (GitHub Actions, Vitest, ESLint, Vite, and Docker).

---

## 🌟 What is CI/CD?
- **Continuous Integration (CI)**: Automatically building, linting, and running test suites on every `git push` or `pull request` to ensure new code does not break the application.
- **Continuous Deployment (CD)**: Automatically packaging and deploying verified code to staging/production servers (e.g. GitHub Pages, Vercel, Netlify, or Docker containers).

---

## 🚀 Step-by-Step CI/CD Practice Labs

### Lab 1: Initializing Git & Pushing to GitHub
1. Open your terminal in this project folder:
   ```bash
   cd C:\Users\OMEN\.gemini\antigravity\scratch\mercedes-cicd-prototype
   ```
2. Initialize Git and commit all files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Mercedes CI/CD prototype app"
   ```
3. Create a new repository on GitHub (e.g., `mercedes-cicd-prototype`).
4. Link your local repo and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mercedes-cicd-prototype.git
   git push -u origin main
   ```
5. Go to the **Actions** tab in your GitHub repository. You will see the **Mercedes Prototype CI Pipeline** automatically trigger and run:
   - ✅ ESLint Code Quality Checks
   - ✅ Vitest Unit Test Suite
   - ✅ Production Build Verification
   - 📦 Artifact Upload (`dist-build`)

---

### Lab 2: Testing Local CI Commands
Before pushing code, developers run CI checks locally:

```bash
# 1. Run local dev server
npm run dev

# 2. Run automated Vitest unit tests
npm run test

# 3. Run ESLint code quality checks
npm run lint

# 4. Validate production bundle build
npm run build
```

---

### Lab 3: Practice Triggering a CI Failure (The Red Pipeline)
One of the best ways to learn CI/CD is to break a build and watch the pipeline block broken code!

1. Open `src/utils/configurator.js`.
2. Temporarily break the price calculation function:
   ```js
   // Intentionally wrong math for testing CI failure
   return base + colorPrice + wheelPrice + packagesPrice + 999999;
   ```
3. Create a new branch and push:
   ```bash
   git checkout -b fix/test-failure-demo
   git add .
   git commit -m "test: simulate broken pricing calculation"
   git push origin fix/test-failure-demo
   ```
4. Open a **Pull Request** on GitHub into `main`.
5. **Observe**: GitHub Actions will catch the failure in the `Vitest Unit Test Suite` step! The PR will show a ❌ **Red X** and block merging.

---

### Lab 4: Fixing the CI Build (The Green Pipeline)
1. Revert `src/utils/configurator.js` back to the correct logic:
   ```js
   return base + colorPrice + wheelPrice + packagesPrice;
   ```
2. Commit and push the fix:
   ```bash
   git add .
   git commit -m "fix: restore accurate price calculation math"
   git push origin fix/test-failure-demo
   ```
3. Watch GitHub Actions re-run automatically.
4. **Observe**: The pipeline turns ✅ **Green**! Merge your Pull Request into `main`.

---

### Lab 5: Containerized Deployment with Docker
You can also test container deployment locally:

```bash
# Build production Docker image
docker build -t mercedes-cicd-app .

# Run container on port 8080
docker run -d -p 8080:80 mercedes-cicd-app
```
Then visit `http://localhost:8080` in your browser!

---

## 🛠️ Summary of Included CI/CD Files
- `.github/workflows/ci.yml` - CI pipeline triggered on push & pull requests.
- `.github/workflows/cd.yml` - CD deployment pipeline triggered on main branch.
- `src/utils/configurator.test.js` - Automated Vitest test suite.
- `Dockerfile` & `nginx.conf` - Production containerization setup.
