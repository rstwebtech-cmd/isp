# NetPulse — WiFi / ISP CRM (Frontend Dashboard)

Ye ek frontend dashboard hai (HTML + CSS + JS, alag files mein) jo ISP/WiFi CRM ke liye banaya gaya hai:
Dashboard, Sites, Packages, Subscribers, Finance, Payment Gateway, CRM/Quotation, Tickets, Monitoring,
Reports (daily/weekly/monthly usage + activity log), API Integrations, aur Roles & Employees.

## Folder Structure
```
netpulse-crm/
├── index.html      → main page (structure)
├── css/style.css   → sabhi styling
├── js/app.js       → navigation, charts, mock data, modals ka logic
├── server.js       → Render ke liye simple static server
├── package.json    → Node dependencies (Render deploy ke liye)
└── README.md
```

## GitHub par upload kaise karein
1. GitHub par ek naya repository banao (e.g. `netpulse-crm`).
2. Is poore folder ko us repo mein push karo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - NetPulse ISP CRM"
   git branch -M main
   git remote add origin https://github.com/<your-username>/netpulse-crm.git
   git push -u origin main
   ```
   (Ya GitHub website se "Add file → Upload files" karke sabhi files/folders directly upload kar sakte ho.)

## Render par deploy kaise karein
1. [render.com](https://render.com) par login karo → **New → Web Service**
2. Apna GitHub repo connect karo (`netpulse-crm`)
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Deploy dabao — Render aapko ek live URL dega (e.g. `https://netpulse-crm.onrender.com`)

> Agar sirf static hosting chahiye (Node server ke bina), to Render ka **"Static Site"** option bhi use kar sakte ho —
> usme Build Command khaali chhod do aur Publish Directory `.` (root) daal do. `server.js`/`package.json` ki zaroorat nahi padegi.

## Apni API keys kahan daalein
`index.html` ke andar **API Integrations** aur **Payment Gateway** page mein input fields already bane hain
(Razorpay, PhonePe, SMS/WhatsApp, RADIUS, Custom API). Abhi ye sirf UI hai — real backend se connect karne ke liye
`js/app.js` mein fetch/axios calls add karni hongi apne backend server ke API endpoints ke sath.

## Next Steps (jab backend banana ho)
- Ek backend (Node/Express, Django, ya jo bhi) banega jo:
  - Subscriber database maintain karega
  - Payment gateway webhook lega (auto-stop/auto-resume ke liye)
  - RADIUS/NAS se connect karke live speed/status control karega
- Ye frontend us backend ke REST API se data fetch karega (`fetch()` calls `js/app.js` mein add honge).
