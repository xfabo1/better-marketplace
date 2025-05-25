"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

// Component that uses useRouter
function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      // Here you would call your API to send a password reset email
      console.log("Password reset requested for:", email);
      
      // For now, we'll just simulate a successful submission
      setIsSubmitted(true);
    } catch {
      setError("Došlo k chybě při odesílání požadavku. Zkuste to prosím znovu.");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-medium text-gray-900">
            Obnovení hesla
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Zadejte svou e-mailovou adresu a my vám zašleme odkaz pro obnovení hesla.
          </p>
        </div>
        
        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="E-mailová adresa"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Odeslat odkaz pro obnovení
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-primary hover:text-primary-hover"
              >
                Zpět na přihlášení
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    E-mail odeslán
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Pokud je e-mailová adresa {email} registrována v našem systému, obdržíte e-mail s pokyny k obnovení hesla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-primary hover:text-primary-hover"
              >
                Zpět na přihlášení
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function ForgotPasswordFormFallback() {
  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 mx-auto w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 mx-auto w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    </div>
  );
}

// Main component that uses Suspense
export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Suspense fallback={<ForgotPasswordFormFallback />}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
} 