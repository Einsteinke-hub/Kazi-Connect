# Kazi-Connect

Kazi-Connect is Kenya's premier job portal, designed to connect talented professionals with top employers across the country. This platform aims to streamline the job search and recruitment process, making it easier for both job seekers and employers to find the right match.

## Features and Functionality

*   **Job Listings:** Browse and search for job opportunities across various industries and locations in Kenya.
*   **User Authentication:** Secure login and registration for job seekers and employers, managed by Supabase.
*   **Profile Management:** Create and manage professional profiles, highlighting skills and experience.
*   **Employer Portal:** Post job listings, manage applications, and connect with potential candidates.
*   **Payment Integration:** Secure payment processing for job postings via Stripe (implemented as a Supabase Function).
*   **Responsive Design:** Accessible and user-friendly on various devices.
*   **Toasts:** Provides user feedback using "sonner" and `@radix-ui/react-toast`.
*   **UI Components:** Leverages the "shadcn/ui" library for consistent and accessible UI elements.

## Technology Stack

*   **Frontend:**
    *   React
    *   TypeScript
    *   Vite
    *   React Router
    *   Tailwind CSS
    *   shadcn/ui
    *   lucide-react
    *   @tanstack/react-query
    *   sonner
    *   embla-carousel-react
    *   input-otp

*   **Backend & Database:**
    *   Supabase (Authentication, Database)
    *   Supabase Functions (Stripe Integration)
    *   PostgreSQL

*   **Payment Processing:**
    *   Stripe

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
*   [Vite](https://vitejs.dev/)
*   [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) (Optional, if developing Supabase Functions locally)
*   A Stripe account and API keys.

Also, ensure you have a Supabase project set up and the required environment variables configured. These variables include:

*   `VITE_SUPABASE_URL`: The URL of your Supabase project.
*   `VITE_SUPABASE_PUBLISHABLE_KEY`: The public API key for your Supabase project.
*   `STRIPE_SECRET_KEY`  (for Supabase function): Your Stripe Secret API key.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Einsteinke-hub/Kazi-Connect.git
    cd Kazi-Connect
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Configure environment variables:**

    Create a `.env` file in the root directory and add your Supabase and (optionally) Paystack keys:

    ```
    VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
    VITE_SUPABASE_PUBLISHABLE_KEY=<YOUR_SUPABASE_ANON_KEY>
    ```

    Alternatively, set the environment variables directly in your system.

4.  **Initialize Supabase:**

    If you haven't already, initialize your Supabase project and link it to your local development environment:

    ```bash
    supabase init
    supabase link --project-ref <YOUR_PROJECT_REF>
    ```

    Replace `<YOUR_PROJECT_REF>` with your Supabase project reference ID.

5. **Deploy Supabase function (create-payment):**

    Navigate to the `supabase/functions/create-payment` directory

    ```bash
    cd supabase/functions/create-payment
    ```

    Set the Stripe Secret Key (STRIPE_SECRET_KEY) as a secret in Supabase:

    ```bash
    supabase secrets set STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
    ```

    Deploy the function:

    ```bash
    supabase functions deploy create-payment
    ```

6.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the Vite development server, typically at `http://localhost:5173`.

## Usage Guide

1.  **Access the application:**

    Open your browser and navigate to the address provided by the development server (e.g., `http://localhost:5173`).

2.  **User Registration and Login:**

    *   New users can register as either a job seeker or an employer.
    *   Existing users can log in to access their profiles and features.

3.  **Job Searching:**

    *   Use the search bar on the homepage or the dedicated `/jobs` page to find job listings.
    *   Filter jobs by keyword, location, job type, and other criteria.

4.  **Profile Management:**

    *   Job seekers can create and manage their professional profiles.
    *   Employers can manage their company information.

5.  **Posting Jobs (Employers):**

    *   Log in with an employer account.
    *   Navigate to the `/post-job` page.
    *   Fill out the job posting form and submit.
    *   Pay the $10 listing fee via Stripe to activate the job posting.

## API Documentation

This project utilizes Supabase for its backend and database, and also makes use of a Supabase Edge Function for the creation of Stripe payment sessions. As such there is no traditional API to document. You can refer to the following resources for integration specifics:

*   **Supabase Documentation:** [https://supabase.com/docs](https://supabase.com/docs)
*   **Stripe API Documentation:** [https://stripe.com/docs/api](https://stripe.com/docs/api)
*   **Supabase Function `create-payment`:**  The `supabase/functions/create-payment/index.ts` file contains the logic for the stripe payment integration.

## Contributing Guidelines

Contributions are welcome! To contribute to Kazi-Connect, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -m "Add your descriptive commit message"`
4.  Push to your branch: `git push origin feature/your-feature-name`
5.  Create a pull request to the `main` branch.

Please ensure your code follows the existing style guidelines and includes appropriate tests.

## License Information

This project has no specified license.  All rights are reserved by the copyright holders.
## Contact/Support Information

For questions, bug reports, or feature requests, please contact:

*   Email: einstenmarto30@gmail.com
*   Phone: +254 759 136 851
*   Address: Nairobi, Kenya