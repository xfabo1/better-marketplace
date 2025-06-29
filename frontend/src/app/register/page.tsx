"use client";

import { registerUser } from "@/api/authApi";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("CZ");
  const [showCrossCountryListings, setShowCrossCountryListings] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validatePasswords = (pass: string, confirmPass: string) => {
    if (confirmPass && pass !== confirmPass) {
      setPasswordError(t('password_error') || "Hesla se neshodují");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    if (password !== confirmPassword) {
      setPasswordError(t('password_error') || "Hesla se neshodují");
      setIsSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError(t('password_too_short') || "Heslo musí mít alespoň 6 znaků");
      setIsSubmitting(false);
      return;
    }

    try {
      await registerUser({
        username: name,
        email,
        password,
        country: country,
        displayItemsFromOtherCountry: showCrossCountryListings
      } );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage === "email_used") {
        setError(t('email_already_used') || "This email is already in use");
      } else if (errorMessage === "username_used") {
        setError(t('username_already_used') || "This username is already in use");
      } else if (errorMessage.includes("Network error")) {
        setError(t('network_error') || "Network connection error");
      } else {
        setError(t('registration_error') || "Registration error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900">
              {t('create_account') || "Vytvořit nový účet"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('already_have_account') || "Již máte účet?"}{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-hover"
              >
                {t('login') || "Přihlaste se"}
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name') || "Jméno"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  placeholder={t('your_name') || "Vaše jméno a příjmení"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email') || "E-mail"}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  placeholder={t('email_address') || "E-mailová adresa"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password') || "Heslo"}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  placeholder={t('password') || "Heslo"}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('confirm_password') || "Potvrdit heslo"}
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full px-4 py-3 rounded-md border shadow-sm text-gray-900 focus:outline-none sm:text-sm ${
                    passwordError 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary'
                  }`}
                  placeholder={t('confirm_password') || "Potvrdit heslo"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{t(passwordError)}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('country') || "Země"}
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="CZ">{t('czech_republic') || "Česká republika"}</option>
                  <option value="SK">{t('slovakia') || "Slovensko"}</option>
                </select>
              </div>

              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="showCrossCountryListings"
                      name="showCrossCountryListings"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={showCrossCountryListings}
                      onChange={(e) => setShowCrossCountryListings(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 flex">
                    <label htmlFor="showCrossCountryListings" className="text-sm text-gray-700">
                      {country === 'CZ' 
                        ? (t('show_slovak_listings') || "Zobrazovat inzeráty ze Slovenska") 
                        : (t('show_czech_listings') || "Zobrazovat inzeráty z České republiky")}
                    </label>
                    <div className="relative ml-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        onMouseEnter={() => setTooltipVisible(true)}
                        onMouseLeave={() => setTooltipVisible(false)}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {tooltipVisible && (
                        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-left text-white bg-gray-900 rounded-lg shadow-sm -right-2 bottom-full mb-2">
                          {t('cross_country_listings_info') || "Toto nastavení můžete kdykoliv změnit v profilu. Ovlivňuje, zda uvidíte inzeráty z druhé země."}
                          <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 right-3"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting || passwordError !== "" || password !== confirmPassword}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('registering') || "Registrace..."}
                  </span>
                ) : (
                  <span>{t('register') || "Registrovat"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 