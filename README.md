<div align="center">

  <img src="frontend/public/Skipli_logo.png" alt="Skipli Canvas Logo" width="120" />

  # Skipli Canvas
  ### Next-Generation Conversational AI Website Builder & Visual Canvas Editor

  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-22.x-339933.svg?logo=node.js)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.21-000000.svg?logo=express)](https://expressjs.com/)
  [![Stripe](https://img.shields.io/badge/Stripe-Checkout_%26_Webhooks-635BFF.svg?logo=stripe)](https://stripe.com/)
  [![Firebase](https://img.shields.io/badge/Firestore-NoSQL_DB-FFCA28.svg?logo=firebase)](https://firebase.google.com/)
  [![AWS S3](https://img.shields.io/badge/AWS_S3-MinIO_Storage-569A31.svg?logo=amazon-s3)](https://aws.amazon.com/s3/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  <p align="center">
    <strong>Turn natural language prompts into production-grade, interactive, and responsive websites in seconds.</strong><br />
    Featuring dual-pane synchronized workspace, direct on-canvas inline text editing, dynamic image replacement, section drag-and-drop reordering, time-machine version rollback, and an enterprise-grade credit & Stripe payment infrastructure.
  </p>

</div>

---

<!-- 📸 SCREENSHOT PLACEHOLDER 1: HERO_WORKSPACE -->
<img width="1914" height="908" alt="image" src="https://github.com/user-attachments/assets/cecf4273-2327-4e88-ad20-0a9476ff87ae" />


---

## 📑 Table of Contents
- [🌟 Product Highlights](#-product-highlights)
- [✨ Core Features](#-core-features)
  - [1. Conversational AI Web Builder](#1-conversational-ai-web-builder)
  - [2. No-Code Direct Visual Canvas (WYSIWYG)](#2-no-code-direct-visual-canvas-wysiwyg)
  - [3. Time-Machine Version History & Instant Rollback](#3-time-machine-version-history--instant-rollback)
  - [4. Enterprise Quota Engine & Stripe Payments](#4-enterprise-quota-engine--stripe-payments)
  - [5. Project Hub & S3 Storage Explorer](#5-project-hub--s3-storage-explorer)
  - [6. Bank-Grade Authentication & 2FA Security](#6-bank-grade-authentication--2fa-security)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🔐 Environment Configuration (.env)](#-environment-configuration-env)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🛡️ Production Readiness Checklist](#️-production-readiness-checklist)
- [📄 License](#-license)

---

## 🌟 Product Highlights

Skipli Canvas bridges the gap between raw AI code generation (like v0 or Lovable) and visual website design tools (like Webflow or Wix). Instead of forcing creators to either write code or battle rigid templates, Skipli Canvas combines:

1. **Conversational Prompting:** Tell the AI what you need in plain English or Vietnamese.
2. **Instant Live Rendering:** The website renders immediately in a secure sandboxed iframe with zero page reload.
3. **Direct Canvas Manipulation:** Click directly on any text to edit inline, click images to replace with curated assets, or drag-and-drop entire sections to restructure layout.
4. **Fair-Use Financial Quota:** Pay-as-you-go credit system backed by Stripe Hosted Checkout with an **automatic 100% refund guarantee** if generation is stopped or aborted.

---

## ✨ Core Features

### 1. Conversational AI Web Builder
- **Natural Language to Full-Stack HTML/Tailwind:** Generates clean, semantic HTML5 with Tailwind CSS styling, responsive breakpoints, and modern aesthetics.
- **Real-Time Streaming Feedback:** Live status indicators inform users of generation progress (`Skipli AI is processing and generating layout...`).
- **Iframe Sandboxing & Security Guard:** Embedded Inline Guard script isolates preview execution, prevents parent page hijacking, and preserves internal DOM event bubbling (tabs, accordions, modals, cart counters).
- **Responsive Device Emulation:** Preview created websites across Desktop, Tablet, and Mobile viewports with one click.
- **One-Click Code Inspection & Export:** View syntax-highlighted HTML source code or download standalone `.html` bundle instantly.

<!-- 📸 SCREENSHOT PLACEHOLDER 2: AI_GENERATION -->
<img width="1916" height="910" alt="image" src="https://github.com/user-attachments/assets/dcf830c1-b3d5-435e-9461-62a147082bbc" />


---

### 2. No-Code Direct Visual Canvas (WYSIWYG)
- **Inline Text Editing:** Click any heading, title, or paragraph inside the preview iframe to edit text directly with a floating toolbar.
- **Interactive Image Replacer:** Hover or click any image on the canvas to open the `ImageReplacerModal`. Replace visuals using custom URLs, high-resolution presets (Unsplash integration), or uploaded media.
- **Section Structure Navigator:** Open the `SectionNavigatorDrawer` to visualize the webpage outline. Reorder sections with Up/Down buttons or toggle visibility without editing raw HTML.
- **Bi-directional PostMessage Bridge:** Ultra-fast, zero-latency communication channel (`VisualBridge`) synchronizing DOM modifications between the React host and the iframe document.

<!-- 📸 SCREENSHOT PLACEHOLDER 3: VISUAL_EDITING -->
<img width="1533" height="864" alt="image" src="https://github.com/user-attachments/assets/dd7b93bf-3a53-4d94-8606-52621c21a8f0" />

<!-- 📸 SCREENSHOT PLACEHOLDER 4: SECTION_NAVIGATOR -->
<img width="1537" height="868" alt="image" src="https://github.com/user-attachments/assets/670fd2b7-b980-4d30-99f9-7ff3c970e93a" />


---

### 3. Time-Machine Version History & Instant Rollback
- **Dual-Track Milestone Tracking:** Automatically tracks both **AI Prompt Turns** and **Manual Visual Edits** as discrete timeline cards.
- **Zero-Loss Rollback Engine:** Revert to any past version with 1 click. The system restores both the preview canvas state and populates the previous prompt back into the input box.
- **Safety Confirmation:** Prevents accidental data overwrite with informative rollback warnings.

<!-- 📸 SCREENSHOT PLACEHOLDER 5: VERSION_ROLLBACK -->
<img width="677" height="419" alt="image" src="https://github.com/user-attachments/assets/5fd1a32b-3c07-4a12-aa78-60b226b44a80" />


---

### 4. Enterprise Quota Engine & Stripe Payments
- **Dynamic Pricing Catalog:** Fetches verified plans directly from Firestore DB with in-memory caching (`Creator Pack $9.99` / `Pro Studio $24.99`).
- **Hosted Stripe Checkout:** 2-step checkout flow generating secure, tamper-proof Stripe sessions (`checkoutUrl`).
- **HMAC SHA-256 Webhook Verification:** Endpoint `/api/webhooks/topup` authenticated via Stripe signature buffer (`rawBody`) and protected against replay attacks.
- **Idempotency & Race-Condition Defense:** Firestore transaction locks prevent duplicate credit fulfillment even with concurrent webhooks.
- **Optimistic Quota Hold (-1.0 Credit):** Immediately updates UI balance when generation begins, synchronized with backend audit tickets.
- **100% Refund Guarantee & Stop Confirmation Modal:** Clicking `Stop` or `New Project` during generation opens a safety modal that discards unfinished work and **guarantees 100% instant credit refund** to the user balance.
- **Immutable Financial Ledger:** The `CreditHistoryModal` provides a transparent, paginated transaction audit log with timestamps, transaction types (`TOPUP`, `AI_HOLD`, `AI_SETTLE`, `AI_REFUND`), and running balance.
- **Graceful Out-of-Credits Handling:** The `OutOfCreditsAlertModal` politely informs users when quota is depleted and offers direct one-click top-up.

<!-- 📸 SCREENSHOT PLACEHOLDER 6: PRICING_MODAL -->
<img width="925" height="830" alt="image" src="https://github.com/user-attachments/assets/1c667313-eb79-48ba-9650-13ecf0103450" />


<!-- 📸 SCREENSHOT PLACEHOLDER 7: PAYMENT_SUCCESS_HISTORY -->
<img width="696" height="746" alt="image" src="https://github.com/user-attachments/assets/9aef7460-be77-4e17-9088-2d8db1b02912" />
<img width="768" height="626" alt="image" src="https://github.com/user-attachments/assets/d971fd69-c786-4d49-8865-1273e2642142" />


<!-- 📸 SCREENSHOT PLACEHOLDER 8: STOP_CONFIRM_MODAL -->
<img width="625" height="574" alt="image" src="https://github.com/user-attachments/assets/5945a658-b2bc-431f-a1f0-0148e5269400" />


---

### 5. Project Hub & S3 Storage Explorer
- **Lovable/v0-Style Dashboard:** Centralized project manager displaying project cards with live preview thumbnails, prompt excerpts, active version pills, and quick action menus (Rename, Delete).
- **Grouped S3 Storage Explorer:** View generated HTML files grouped by project, inspect sub-versions, file sizes, and download files directly via MinIO/S3 Presigned URLs.
- **Adaptive Dark / Light Themes:** Fully integrated theme switcher with persistent localStorage state and fluid Tailwind CSS transitions.

<!-- 📸 SCREENSHOT PLACEHOLDER 9: DASHBOARD_STORAGE -->
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/ed817540-3559-4272-965e-72a678067abc" />
<img width="1913" height="909" alt="image" src="https://github.com/user-attachments/assets/e3d84960-62c8-41e6-bad3-9ae7e767a3e0" />



---

### 6. Bank-Grade Authentication & 2FA Security
- **3-Step Registration Pipeline:** Email validation -> Email OTP 6-digit verification -> Display name & argon2-hashed password onboarding.
- **2-Factor Authentication (2FA) Login:** Credentials check followed by instant time-limited OTP delivery via email.
- **Secure JWT Session Management:** Access token in memory/headers with automatic refresh token rotation.
- **Profile & Security Settings:** Update display name, manage security credentials, and view account balance directly.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend (React 18 + Vite + Tailwind)"]
        UI["Workspace & Dashboard UI"]
        CreditCtx["CreditContext (State & Ledger)"]
        VisualBridge["VisualBridge (PostMessage Channel)"]
        Iframe["Sandboxed Preview Iframe (Inline Guard)"]
    end

    subgraph Server["Backend API (Node.js + Express + TypeScript)"]
        ChatCtrl["Chat Controller (SSE Stream)"]
        CreditCtrl["Credit Controller & Webhook"]
        AuthCtrl["Auth & 2FA Controller"]
        StorageCtrl["Storage Controller (Presigned S3)"]
    end

    subgraph Services["Core Engines"]
        QuotaSvc["Quota Engine (Hold / Settle / Refund)"]
        PaymentSvc["Payment Service (Stripe Session)"]
        LLM["AI LLM Engine (Gemini / OpenAI)"]
    end

    subgraph Data["Cloud Infrastructure"]
        Firestore[("Google Firestore NoSQL")]
        S3[("AWS S3 / MinIO Object Storage")]
        StripeGateway["Stripe Hosted Checkout & Webhooks"]
    end

    UI --> CreditCtx
    UI --> VisualBridge
    VisualBridge <--> Iframe

    UI -->|REST / SSE| ChatCtrl
    UI -->|REST| CreditCtrl
    UI -->|REST| AuthCtrl
    UI -->|REST| StorageCtrl

    ChatCtrl --> QuotaSvc
    ChatCtrl --> LLM
    CreditCtrl --> PaymentSvc
    CreditCtrl <--> StripeGateway

    QuotaSvc <--> Firestore
    PaymentSvc <--> Firestore
    StorageCtrl <--> S3
    ChatCtrl -->|Delivery Proof| S3
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Declarative component UI architecture |
| **TypeScript** | `^5.7.3` | End-to-end type safety and maintainability |
| **Vite** | `^6.1.0` | Ultra-fast next-gen build tool & HMR server |
| **Tailwind CSS** | `^3.4.17` | Utility-first responsive design & custom dark/light theme |
| **Lucide React** | `^0.475.0` | Modern, lightweight, accessible icon bank |
| **React Router** | `^7.18.4` | Client-side routing (`/login`, `/register`, `/preview`) |
| **Axios** | `^1.20.0` | HTTP client with automatic JWT token interceptors |

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js & Express**| `^4.21.2` | REST API framework, SSE streaming, and middleware |
| **TypeScript** | `^5.7.3` | Strict backend typing and compilation |
| **Firebase Admin** | `^13.1.0` | Google Cloud Firestore NoSQL database integration |
| **AWS SDK S3** | `^3.1148.0`| S3 & MinIO object storage with presigned download URLs |
| **Stripe SDK** | `^23.1.0` | Hosted checkout session creation and webhook handling |
| **Zod** | `^4.6.5` | Strict request payload validation schemas |
| **Nodemailer** | `^10.2.1` | SMTP email transport for OTP and 2FA authentication |
| **Bcryptjs / Argon2**| `^3.0.3` | Cryptographic password hashing and verification |
| **JSONWebToken** | `^9.0.3` | Stateless access & refresh token generation |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js:** `>= 18.x` (Recommended: Node 20 or 22 LTS)
- **npm:** `>= 9.x`
- **Firebase Project:** Firestore database initialized in Test or Production mode.
- **S3 / MinIO:** Running S3-compatible bucket for HTML file delivery proof.
- **Stripe Account:** Stripe developer keys (`sk_test_...`) for payment testing.

---

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/ai-website-created-by-chatbot.git
cd ai-website-created-by-chatbot
```

---

### Step 2: Backend Setup
```bash
cd backend
npm install

# Setup environment variables (refer to .env section below)
cp .env.example .env

# Seed initial pricing plans into Firestore (Creator Pack & Pro Studio)
npm run seed:plans

# Start backend server in development mode (Port 5000)
npm run dev
```

---

### Step 3: Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install

# Start frontend development server (Port 5173)
npm run dev
```

---

### Step 4: Stripe Webhook Forwarding (Local Testing)
In a third terminal window:
```bash
# Using the pre-bundled Stripe CLI tool
./tools/stripe.exe listen --forward-to localhost:5000/api/webhooks/topup --events checkout.session.completed,checkout.session.expired
```
> Copy the output `whsec_...` and set it as `STRIPE_WEBHOOK_SECRET` in your `backend/.env`.

---

## 🔐 Environment Configuration (.env)

### Backend Configuration (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Firebase Firestore Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# S3 / MinIO Object Storage
S3_ENDPOINT=http://127.0.0.1:9000
S3_REGION=us-east-1
S3_BUCKET_NAME=skipli-canvas-storage
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_FORCE_PATH_STYLE=true

# Stripe Hosted Checkout & Webhooks
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_SUCCESS_URL=http://localhost:5173/preview?payment=success&session_id={CHECKOUT_SESSION_ID}
STRIPE_CANCEL_URL=http://localhost:5173/preview?payment=cancelled

# AI LLM Provider (Google Gemini / OpenAI)
GEMINI_API_KEY=AIzaSy...
LLM_MODEL=gemini-1.5-pro

# JWT & Authentication
JWT_ACCESS_SECRET=your_super_secret_jwt_access_key
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# SMTP Mailer (for OTP & 2FA)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Skipli Canvas <no-reply@skipli.com>"
```

---

## 📂 Project Directory Structure

```text
ai-website-created-by-chatbot/
├── backend/
│   ├── src/
│   │   ├── config/             # Firebase, S3, Stripe, Pricing system configs
│   │   ├── controllers/        # Express route controllers (Auth, Chat, Credit, Storage)
│   │   ├── dtos/               # Zod validation schemas
│   │   ├── middlewares/        # JWT auth, Stripe HMAC webhook verifier, error handler
│   │   ├── models/             # Domain TypeScript interfaces (CreditTransaction, Plan, User)
│   │   ├── repositories/       # Firestore data access layer (User, Plan, Ledger, Session)
│   │   ├── routes/             # API route definitions (/api/credits, /api/chat, /api/auth)
│   │   ├── scripts/            # Database seed CLI scripts (seed-pricing-plans.ts)
│   │   ├── services/           # Business logic (Quota Engine, Payment, LLM, Mailer)
│   │   ├── tests/              # Master automated audit test suite
│   │   ├── utils/              # Crypto, rounding, and HTTP error helpers
│   │   └── server.ts           # Application entry point & rawBody hook
│   └── package.json
├── frontend/
│   ├── public/                 # Static assets & Skipli logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── auth/       # LoginForm, RegisterForm, ProfileSettingsModal
│   │   │   │   ├── payment/    # CreditBadge, PricingModal, PaymentSuccessModal,
│   │   │   │   │               # OutOfCreditsAlertModal, CreditHistoryModal
│   │   │   │   ├── storage/    # GroupedStorageList, StoragePreviewModal
│   │   │   │   └── workspace/  # CanvasPreview, ChatSidebar, StopConfirmModal,
│   │   │   │                   # ImageReplacerModal, SectionNavigatorDrawer
│   │   │   ├── layout/         # WorkspaceHeader, AuthLayout
│   │   │   └── ui/             # ThemeToggle, Toast, FormattedChatMessage, Input, Button
│   │   ├── contexts/           # AuthContext, CreditContext (Single Source of Truth)
│   │   ├── hooks/              # useAuth, useCredit, useChatStream, useVisualBridge
│   │   ├── pages/              # WorkspacePreviewPage, LoginPage, RegisterPage
│   │   ├── services/           # api.ts, payment.api.ts, chat.service.ts, auth.api.ts
│   │   ├── types/              # payment.types.ts, chat.types.ts, auth.ts
│   │   ├── utils/              # dom-inspector, history-manager, image-replacer
│   │   └── App.tsx             # Root component wrapped with Providers
│   └── package.json
├── tools/                      # Pre-bundled developer binaries (stripe.exe)
├── docs/
│   └── images/                 # Screenshot image repository for README
└── README.md
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by Dang Tan Trong. Powering the future of AI-driven web creation.</sub>
</div>
