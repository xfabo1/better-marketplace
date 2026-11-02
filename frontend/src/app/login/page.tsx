"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

type ErrorType = "credentials" | "network" | "server" | "unknown";

interface FormattedError {
  type: ErrorType;
  message: string;
  details?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<FormattedError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!email) {
      setError({
        type: "unknown",
        message: t("email_required") || "E-mail is required",
        details: "",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (password) {
        await login(email, password);
        router.push(redirectUrl);
      } else {
        await login(email);
        router.push(redirectUrl);
      }
    } catch (caught: unknown) {
      const err = caught as Error & { status?: number; statusText?: string };
      console.error("Login error:", err);

      if (err.message === "invalid_credentials") {
        setError({
          type: "credentials",
          message: t("invalid_credentials") || "Invalid credentials",
          details: t("check_credentials") || "Please check your login credentials and try again.",
        });
      } else if (err.message?.includes("Network error")) {
        setError({
          type: "network",
          message: t("network_error") || "Network connection error",
          details:
            t("network_error_details") || "Check your internet connection or try again later.",
        });
      } else if ((err.status ?? 0) >= 500) {
        setError({
          type: "server",
          message: t("server_error") || "Server error",
          details: `Server returned error: ${err.status} ${err.statusText || ""}`,
        });
      } else {
        setError({
          type: "unknown",
          message: t("login_error") || "Login error",
          details: err.message || "Please try again later.",
        });
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
              {t("login_to_account") || "Přihlásit se k účtu"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("no_account") || "Nemáte účet?"}{" "}
              <Link href="/register" className="font-medium text-primary hover:text-primary-hover">
                {t("create_account") || "Vytvořit nový účet"}
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("email") || "E-mail"}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  placeholder={t("email_address") || "E-mailová adresa"}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("password") || "Heslo"}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  placeholder={t("password") || "Heslo"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
                    {error.details && (
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {t("remember_me") || "Zapamatovat si mě"}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary-hover"
                >
                  {t("forgot_password") || "Zapomenuté heslo?"}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("logging_in") || "Přihlašování..."}
                  </span>
                ) : (
                  <span>{t("login") || "Přihlásit"}</span>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
