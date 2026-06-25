# 🎯 IntelliResume - AI-Powered Resume Analyzer (Frontend Client)

[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> Transform raw resumes into recruiter-optimized portfolios. IntelliResume leverage state-of-the-art AI analysis to pinpoint skill gaps, score ATS compatibility, and deliver real-time career recommendations via a high-performance, single-page client.

---

## 📖 Overview

**IntelliResume Frontend** is a responsive, high-fidelity Single Page Application (SPA) designed to interface with the IntelliResume AI Analysis Engine. Built with **React 19**, **TypeScript**, and **Tailwind CSS v3**, it provides job seekers with a premium, dashboard-driven experience. 

By uploading a PDF or DOCX resume, users instantly receive:
- Comprehensive ATS compatibility scoring.
- Segmented breakdowns of key professional strengths and core weaknesses.
- Automated skill gap analysis displaying target areas for resume optimization.
- Career path recommendations matched dynamically to the profile.

The application features instant-sync local state, persistent session management, smooth animation loops, interactive modal cards, and responsive bento grids.

---

## ✨ Features

- **🔐 Premium Authentication Interface**
  - Seamless Register/Login onboarding.
  - Client-side data validation utilizing TypeScript and form states.
  - Automated state hydration and persistent sessions using JWT and custom stores.
- **📁 Interactive Drag & Drop File Upload**
  - Dedicated file drag/drop component with dynamic highlight rings.
  - Client-side validation for file formats (PDF, DOCX) and size restrictions.
  - Real-time file info display and clear trigger animations.
- **📊 Interactive Metrics Dashboard**
  - Beautiful metrics grids displaying total scanned history and average compatibility scores.
  - Interactive history tables summarizing historical scans, scores, and quick-view triggers.
  - Deep-dive details modals providing resume summaries and structural metadata.
- **🧠 Bento-Style AI Insights**
  - High-impact visual score wheels measuring ATS compliance and overall match.
  - Side-by-side bento layout highlighting Key Strengths, Suggested Improvements, and Career Recommendations.
  - Interactive "Skill Gaps" badge cloud detailing missing technologies.
- **🔄 Performance Loading States**
  - Captivating, dynamic pulsing circle loader during AI parsing transitions.
  - Ability to cancel in-flight API analysis requests mid-flight using abort mechanisms.
- **🛡️ Secure Route Guarding**
  - Dynamic token verification and state synchronization checking across routes.
  - Public routes (`/login`, `/register`) restricted once authenticated.
  - Protected dashboard routes `/dashboard`, `/upload`, `/analysing`, `/result` secured by React Router guards.
- **⚠️ High-Fidelity Exception Handling**
  - Styled `404 Not Found` pages with quick-home navigation links.
  - Graceful "Analysis Failed" page handling server downtime, CORS blocks, or format exceptions.
  - Work-in-progress page guards keeping incomplete segments secure.

---

## 📂 Folder Structure

The project follows a clean, module-based directory structure separating UI elements, state stores, styling modules, and page routes:

```
client/
├── public/                 # Static assets served directly (icons, favicons, illustrations)
├── src/
│   ├── assets/             # Raw media assets (images, vectors, and font definitions)
│   ├── components/         # Reusable UI component architecture
│   │   ├── dashboard/      # Dashboard panels, modals, and history listings
│   │   ├── layout/         # Persistent structures (Sidebar, Header, Footer)
│   │   └── ...             # Modular sections (Hero, Features, CTA, HowItWorks)
│   ├── pages/              # Router views and page-level container components
│   ├── store/              # Global state management stores (Zustand modules)
│   ├── styles/             # Modular CSS stylesheet systems corresponding to pages
│   ├── App.tsx             # Application router, guards, and root initialization
│   ├── main.tsx            # DOM entry point and React context initialization
│   └── index.css           # Global CSS variables, tailwind configuration rules
├── package.json            # Script definitions and dependency trees
├── tailwind.config.js      # Custom theme setup, colors, animations, and typography
├── postcss.config.js       # CSS preprocessor configuration
├── tsconfig.json           # Global compiler definitions
└── vite.config.ts          # Build bundling configuration
```

### Directory Details
- **`src/components/`**: House modular, reusable atoms and molecules. Layout elements (like navigation bars and persistent sidebars) and complex dashboard tables reside in subfolders to maintain codebase scalability.
- **`src/pages/`**: Full views loaded by the router. Contains logic orchestrating user interactions and dispatching store updates.
- **`src/store/`**: Centralized state management utilizing Zustand. Split logically into `userStore` (session and authentication lifecycle) and `analysisStore` (resume upload, abort control, and analysis result data).
- **`src/styles/`**: Custom page-specific stylesheets containing premium transition declarations, grid layouts, and custom scrollbar definitions.

---

## ⚙️ Installation & Setup

Follow these steps to run the development server locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/intelliresume.git
cd intelliresume/client
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Configure Local Environment File
Create a `.env` file in the root of the client directory:
```bash
cp .env.example .env
```

---

## 🌐 Environment Variables

The application relies on the following environment variables. Ensure these are defined before running production compilation.

| Variable Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| **`VITE_API_URL`** | String | `http://localhost:9000/api` | The base URL endpoint for your backend server. |
| **`VITE_APP_NAME`** | String | `IntelliResume` | The display name used across browser titles and headers. |
| **`VITE_NODE_ENV`** | Enum | `development` | Defines the environment target (`development` or `production`). |

---

## 🚀 Running the Project

Manage the local client lifecycle using the following NPM scripts:

### Development Mode
Runs the local Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
> [!NOTE]
> The server will start on [http://localhost:5173](http://localhost:5173) by default.

### Production Compiles
Compiles the TypeScript components and bundles files into optimized assets inside the `dist/` directory:
```bash
npm run build
```

### Production Preview
Locally serves the bundled production output for verification:
```bash
npm run preview
```

---

## 📄 Application Pages

The application is structured into the following nine views, each optimized for usability and speed:

1. **🏠 Landing Page (`LandingPage.tsx`)**
   - High-impact presentation with modern Hero headers, descriptive Feature cards, and call-to-actions.
2. **🔑 Register Page (`RegisterPage.tsx`)**
   - Streamlined authentication signup with built-in format checks and error notification popups.
3. **🔓 Login Page (`LoginPage.tsx`)**
   - Simple entry portal syncing credentials, setting persistent storage tokens, and routing users to the dashboard.
4. **📊 Dashboard Page (`Dashboard.tsx`)**
   - Personalized user workspace displaying metrics charts, scan history, and access triggers.
5. **📤 Upload Resume Page (`UploadResume.tsx`)**
   - Full drag-and-drop interface supporting instant validation checks on resume formats.
6. **⏳ Loading Screen (`AnalysingResume.tsx`)**
   - Visual waiting state showing process progression and parsing logs. Supports cancel requests.
7. **🎯 Analysis Result Page (`FinalResult.tsx`)**
   - Premium bento metrics showing overall scoring, strength/weakness listings, missing skills, and roles.
8. **💼 Career & Insights Section (`ScanHistory.tsx` / `ResumeDetailsModal.tsx`)**
   - Historical scan summaries and popups displaying granular data sheets of previously uploaded items.
9. **🛠️ Profile & In-Progress Segment (`WorkInProgress.tsx`)**
   - Interactive placeholder protecting components currently under active expansion.
10. **❌ Not Found Page (`NotFound.tsx`)**
    - Dynamic route mapping invalid page lookups to custom graphics and home redirection utilities.

---

## 🔌 API Integration

API communication is centralized through **Axios**, implementing a scalable architecture that guarantees security and ease of use:

```typescript
// App.tsx API Defaults configuration
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
axios.defaults.withCredentials = true; // Enables secure HTTP cookie transfers
```

### Key Architectural Configurations
- **🔒 Protected Requests & Credentials**: `withCredentials` is active globally, ensuring session cookies are sent back and forth securely across APIs.
- **🔄 Response Interceptors**: Configured globally in the entry root to catch any `401 Unauthorized` responses:
  ```typescript
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        useUserStore.getState().logout();
      }
      return Promise.reject(error);
    }
  );
  ```
- **⚙️ Request Abort Control**: Uses the native browser `AbortController` passed to the request signal inside `analysisStore.ts`, allowing users to cancels in-flight resume uploads instantly:
  ```typescript
  const controller = new AbortController();
  const response = await axios.post("/resume/analyze", formData, {
    signal: controller.signal
  });
  ```

---

## 💾 State Management

We use **Zustand** as the lightweight global state store, providing modular and reactive slices without the boilerplate of Redux:

### 👤 User Store (`userStore.ts`)
Tracks authentication status and hydrates profile details.
* **State fields**: `user` (Object or null), `isAuthenticated` (Boolean).
* **Actions**:
  - `login(user)`: Saves details to the state and flags validation toggles.
  - `logout()`: Clears memory, flushes `localStorage` keychains, and cleans authorization states.
  - `updateUser(fields)`: Patches active details dynamically.
* **Middlewares**: Wraps the state inside `persist` which syncs data structure keys straight into browser storage (`user-storage`).

### 📊 Analysis Store (`analysisStore.ts`)
Coordinates files, in-flight API states, cancellation tokens, and outputs.
* **State fields**: `isAnalyzing` (Boolean), `analysisResult` (Object), `analysisError` (String), `fileName` (String), `resumeId` (String), `abortController` (AbortController).
* **Actions**:
  - `startAnalysis(file)`: Initiates file forms, calls `/resume/analyze`, and processes response.
  - `abortAnalysis()`: Invokes abort controls and terminates current request threads.
  - `resetAnalysis()`: Flushes local analysis variables back to initial values.

---

## 🚦 Routing & Guards

Our routing architecture utilizes `react-router-dom` to enforce access controls:

* **🔓 Public Routes (`PublicRoute`)**: Blocks authenticated users from accessing login or registration forms, redirecting them back to `/dashboard` immediately if token validation tags exist.
* **🛡️ Protected Routes (`ProtectedRoute`)**: Validates that both the Zustand auth state and local storage keys exist. If missing, routes are rejected and redirected back to `/login` immediately.
* **🔄 Auth Synchronizer (`AuthSynchronizer`)**:
  - Automatically verifies tokens on every route transition.
  - Listens to system-wide storage updates. If a user manually deletes their authentication token in browser tools, the app triggers a `logout()` action immediately to protect pages.

---

## 🧩 UI Components

Our modular component architecture maximizes reusability:

- **`Navbar` / `TopNavBar` / `Sidebar`**: Standard layout elements adjusting to authorization states. The sidebar provides navigation inside dashboard panels.
- **`Features` / `Hero` / `HowItWorks` / `CTA`**: Landing modules styled with micro-animations and clean visual sections.
- **`DashboardOverview` / `ScanHistory`**: Component structures that map user metrics and historical table rows.
- **`ResumeDetailsModal`**: Visual slide-out drawer or overlay providing deep-dive details of individual items.
- **`UploadResume`**: Custom drag-and-drop landing areas utilizing drag events to trigger state updates.

---

## 📱 Responsive Design & Accessibility

- **📱 Breakpoint Strategy**: Uses Tailwind CSS utilities (`sm:`, `md:`, `lg:`, `xl:`) to provide responsive layout flows across smartphones, tablets, and wide screens.
- **🧱 Bento Grid Architecture**: The analysis page scales down from a multi-column bento system on desktop to simple single-column blocks on mobile without content loss.
- **⚡ Accessible Components**: 
  - Standard focus outlines are set on input fields and action targets.
  - WCAG-compliant high-contrast slate, indigo, and emerald text tokens.
  - Explicit `aria-label` declarations on critical interactive elements.

---

## ⚡ Performance Optimizations

- **📦 Vite Compilation Pipeline**: Generates highly compressed CSS and JS chunks using modern rollup strategies.
- **⚡ Reactive Render Cycles**: Zustand stores trigger page renders only when the specific variables being listened to change, avoiding global app refreshes.
- **💾 Abort Controllers**: Cancels backend network overhead immediately if a user leaves the loading screen or cancels manually.
- **🗜️ SVGs and Icon Assets**: Employs SVGs and lightweight vector icon assets via Lucide React to minimize asset bundle size.

---

## 📤 Deployment (Vercel)

The frontend is ready for Vercel deployment with minor configurations.

### 1. Build Specifications
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 2. Configure SPA Redirection (`vercel.json`)
Since this is a client-side routing application, configure Vercel to route all requests back to `index.html` to avoid 404 errors on page reloads:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. Setup Vercel Dashboard Environment
Add your environment variables under **Project Settings > Environment Variables**:
- `VITE_API_URL` = `https://your-backend-api.com/api`
- `VITE_APP_NAME` = `IntelliResume`
- `VITE_NODE_ENV` = `production`

---

## 🖼️ Screenshots & Mockups

Add the following assets in `public/screenshots/` (or host them externally) to complete the premium look of the repository:

1. **🏠 Landing Screen**  
   `![Landing Page Mockup](https://via.placeholder.com/1200x675.png?text=IntelliResume+-+Modern+Landing+Page)`  
   *Overview of Hero graphics, features grids, and call-to-actions.*

2. **📊 Dashboard Console**  
   `![Dashboard Workspace Mockup](https://via.placeholder.com/1200x675.png?text=User+Dashboard+-+Workspace)`  
   *Metrics summary cards, average score analytics, and resume history tables.*

3. **📤 File Drag & Drop**  
   `![Drag & Drop Upload Area](https://via.placeholder.com/1200x675.png?text=Upload+Resume+-+Drag+And+Drop+UI)`  
   *Interactive drag/drop dashboard zone for resume uploads.*

4. **🎯 Bento Analysis Insights**  
   `![AI Analysis Insights Result](https://via.placeholder.com/1200x675.png?text=AI+Analysis+Bento+Results)`  
   *The Bento-grid result page displaying ATS scoring, strengths, gaps, and recommendations.*

---

## 🔍 Troubleshooting

Here are common issues and solutions for local frontend development:

### ❌ API Connection Failure
- **Symptoms**: Console displays network timeout errors, and user login/upload triggers spin endlessly.
- **Solution**: Confirm that your backend server is running (default: port `9000`). Verify your `.env` contains the correct `VITE_API_URL` without a trailing slash.

### ❌ CORS Policies Blocking Requests
- **Symptoms**: Dev tools show `Access-Control-Allow-Origin` validation failures.
- **Solution**: Check your backend's CORS configuration. The backend must explicitly whitelist the client URL (e.g. `http://localhost:5173`) and configure `credentials: true`.

### ❌ Sessions Expiring Prematurely / Cookies Not Saving
- **Symptoms**: Page refresh redirects users to `/login` even though login succeeded.
- **Solution**: Ensure `withCredentials = true` is set on your Axios requests. Verify your browser is not blocking third-party cookies or run in a non-incognito window.

### ❌ Tailwind CSS Styles Missing
- **Symptoms**: Webpage renders unstyled HTML text.
- **Solution**: Check that `npm install` completed successfully. Verify that your postcss plugins are running, and run `npm run dev` to regenerate Tailwind assets.

---

## 🗺️ Roadmap & Future Improvements

- [ ] **📈 ATS Target Optimization**: Let users paste a target Job Description to compare compatibility against a specific role.
- [ ] **✍️ AI Resume Editor**: Provide in-app inline suggestions to rewrite low-scoring bullet points.
- [ ] **🌐 Multi-Language Parser**: Expand Gemini parsing support to analyze resumes written in French, Spanish, or German.
- [ ] **🌗 System-Wide Dark Mode**: Fully native dark/light theme switching with custom CSS variables.

---

## 🤝 Contributing

We welcome contributions to improve the IntelliResume client interface!

1. **Fork the Repository** to your GitHub account.
2. **Create a Feature Branch** (`git checkout -b feature/amazing-feature`).
3. **Commit Your Changes** (`git commit -m 'Add some amazing feature'`).
4. **Push to the Branch** (`git push origin feature/amazing-feature`).
5. **Open a Pull Request** describing your changes.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](file:///home/dumpling/Desktop/intelliresume - ai-resmue-analyser/client/LICENSE) for more information.

---

<p align="center">Made with ❤️ by the Aniket Jas</p>
