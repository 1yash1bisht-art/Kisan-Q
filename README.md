# किसान क्यू (KisanQ) — Smart Slot Booking & Mandi Queue Platform

> **Department of Consumer Affairs (DoCA) | Ministry of Consumer Affairs, Food & Public Distribution**  
> *Smart India Hackathon (SIH 2026) — Problem Statement ID 26032*

---

## Overview

**KisanQ** is a high-efficiency slot booking, automated tokenization, and live mandi queue tracking system designed specifically for farmers and Agricultural Produce Market Committee (APMC) officers across **Uttarakhand**.

It solves peak-harvest overcrowding, long wait times (often exceeding 18–36 hours), distress selling, and opaque weighing by introducing:
1. **Low-Data / 2G-Friendly Client**: Optimized for rural mountain areas with minimal network consumption.
2. **Interactive IVR Helpline (1800-180-1551)**: Telephonic voice response simulator with dual-tone multi-frequency (DTMF) sound feedback for farmers using basic keypad phones without active internet.
3. **Multilingual Support**: Switch seamlessly between **Hindi (हिन्दी)**, **English**, and **Garhwali (गढ़वाली)**.
4. **Uttarakhand Mandis Directory**: Live wait times, distance in km, daily capacities, and potato rates across Dehradun, Haldwani, Haridwar, Vikas Nagar, Kashipur, Rudrapur, Rishikesh, Kotdwar, Ramnagar, and Roorkee.
5. **Separate Portals**:
   - **Farmer Portal**: Aadhaar-linked login/registration, Potato slot booking, 5-stage live queue tracker, and printable digital token gate pass.
   - **Officer Dashboard**: Electronic weighbridge record, quality grading (A/B/C), DBT payment settlement, and dynamic slot rebalancing.
6. **Aadhaar Directory Search**: Instant 12-digit Aadhaar lookup for bookings and linked bank status.

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled output will be generated in `dist/`.

---

## 🚀 How to Fix "Blank White Page" on GitHub Pages

A blank white page occurs when GitHub Pages attempts to serve the root repository folder instead of the compiled `dist/` directory (where raw TypeScript `/src/main.tsx` cannot be executed by the browser).

We have configured two foolproof deployment options:

### Option 1: Automated GitHub Actions Deployment (Recommended)
This repository includes an automated workflow in `.github/workflows/deploy.yml`.
1. Push this repository to your GitHub account.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** (instead of "Deploy from a branch").
4. Go to the **Actions** tab on your repository; you will see the `Deploy KisanQ to GitHub Pages` workflow running.
5. Once green, click the generated URL. The app will load with all assets resolved.

### Option 2: Deploy via `gh-pages` (1-Command CLI)
If you prefer deploying directly from your local terminal:
1. In `package.json`, the `gh-pages` deploy script is already pre-configured.
2. Run:
```bash
npm run deploy
```
3. This command will build the project (`npm run build`) and push the `dist/` folder directly to a `gh-pages` branch on your GitHub repository.
4. Go to **Settings** > **Pages**, set **Source** to **Deploy from a branch**, choose branch **`gh-pages`** and folder **`/ (root)`**, then click **Save**.

---

## How to Export from Google AI Studio to GitHub

If you are using Google AI Studio Build:
1. Click on the **Settings** or **Share / Export** menu in the top-right corner.
2. Choose **Export to GitHub** or **Download ZIP**.
3. If exporting to GitHub, authorize your GitHub account and select your target repository.
4. If downloading as a ZIP, extract the files, open a terminal in the folder, and run `npm install && npm run dev`.

---

## Audio & IVR Troubleshooting
- Browsers require user interaction before playing audio or synthesized speech.
- Click the **"🔊 आवाज सुनें (Play Voice)"** button inside the IVR modal to activate audio playback if your browser restricts autoplay.
- Standard DTMF telephone touch tones will play whenever keypad buttons (1, 2, 3, etc.) are pressed.
