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

### 3. Build for Production / GitHub Pages
```bash
npm run build
```
The compiled output will be generated in `dist/`.

To test the production build locally:
```bash
npm run preview
```

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
