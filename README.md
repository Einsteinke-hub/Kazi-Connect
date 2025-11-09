# Kazi-Connect

**Kazi-Connect** is Kenya's premier job portal, designed to connect talented professionals with top employers across the country. This platform streamlines the job search and recruitment process, making it easier for both job seekers and employers.

---

## 🌐 Live Demo

Experience Kazi-Connect live:  
👉 [Visit the Live Site](https://einsteinke-hub.github.io/Kazi-Connect/)  


---

## ✨ Features & Functionality

- **Job Listings**: Browse and search for job opportunities across various industries and locations.
- **User Authentication**: Secure login and registration for job seekers and employers, managed by Supabase.
- **Profile Management**: Create and manage professional profiles, highlighting skills and experience.
- **Employer Portal**: Post job listings, manage applications, and connect with possible candidates.
- **Payment Integration**: Secure payment processing for job postings via Stripe (implemented as a Supabase Function).
- **Responsive Design**: Optimized for all device sizes.
- **Toasts**: Feedback with "sonner" and `@radix-ui/react-toast`.
- **UI Components**: Consistent, accessible elements via "shadcn/ui".

---

## 🛠️ Technology Stack

**Frontend**
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- lucide-react
- @tanstack/react-query
- sonner
- embla-carousel-react
- input-otp

**Backend & Database**
- Supabase (Authentication, Database)
- Supabase Functions (Stripe Integration)
- PostgreSQL

**Payment Processing**
- Stripe

---

## ⚡ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Vite](https://vitejs.dev/)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) *(Optional, for Supabase Functions)*
- Stripe account & API keys

Required environment variables:

- `VITE_SUPABASE_URL`: The URL of your Supabase project
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Public API key for Supabase
- `STRIPE_SECRET_KEY` *(for Supabase function)*: Your Stripe Secret API key

---

## 🚀 Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Einsteinke-hub/Kazi-Connect.git
    cd Kazi-Connect
    ```

2. **Install dependencies:**
    ```bash
    npm install # or yarn install
    ```

3. **Configure environment variables:**
    Create a `.env` file and add your keys:
    ```
    VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
    VITE_SUPABASE_PUBLISHABLE_KEY=<YOUR_SUPABASE_ANON_KEY>
    ```

4. **Initialize Supabase:**
    ```bash
    supabase init
    supabase link --project-ref <YOUR_PROJECT_REF>
    ```
    Replace `<YOUR_PROJECT_REF>` with your Supabase project reference ID.

5. **Deploy Supabase function (`create-payment`):**
    ```bash
    cd supabase/functions/create-payment
    supabase secrets set STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
    supabase functions deploy create-payment
    ```

6. **Start the development server:**
    ```bash
    npm run dev # or yarn dev
    ```
    App will be live at `http://localhost:5173`

---

## 📖 Usage Guide

1. **Access the application:**  
   Open your browser and navigate to `http://localhost:5173`.

2. **Register & Login:**  
   New users register as job seekers or employers. Existing users log in to access features.

3. **Search for Jobs:**  
   Use the homepage search bar or `/jobs` to find listings. Filter by keyword, location, job type, etc.

4. **Profile Management:**  
   - Job seekers manage professional profiles.
   - Employers manage company info.

5. **Post a Job (Employers):**  
   - Log in as employer.
   - Go to `/post-job`.
   - Fill out the posting form and submit.
   - Pay the $10 Stripe fee to activate the post.

---

## 🔌 API & Integrations

Kazi-Connect leverages Supabase for its backend, authentication, and database, with a Supabase Edge Function powering Stripe payments.

- [Supabase Docs](https://supabase.com/docs)
- [Stripe API Docs](https://stripe.com/docs/api)
- **Supabase Function `create-payment`:** Logic in `supabase/functions/create-payment/index.ts`

---

## 🤝 Contributing

We welcome contributions!  
Just follow these steps:

1. Fork this repo.
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:  
   ```bash
   git commit -m "Your descriptive commit message"
   ```
4. Push your branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request targeting `main`.

Please ensure code quality matches our existing standards with appropriate tests.

---

## 📜 License

This project does **not** have a specified license.  
All rights reserved by the copyright holders.

---

## 📬 Contact & Support

For questions, bug reports, or feature requests:

- **Email:** einstenmarto30@gmail.com
- **Phone:** +254 759 136 851
- **Address:** Nairobi, Kenya

---
