"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { countries } from "@/data/countries";
import { useAuth } from "@/contexts/AuthContext";

// Component that uses useSearchParams
function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const { t } = useLanguage();
  const { user, updateUserSettings } = useAuth();

  // Set active tab based on URL parameter if present
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "security") {
      setActiveTab("security");
    } else {
      setActiveTab("profile");
    }
  }, [searchParams]);

  // Mock user data
  const [userData, setUserData] = useState({
    email: "jan.novak@example.com",
    phone: "+420 123 456 789",
    country: "CZ", // Default to Czech Republic
    showCrossCountryListings: true, // Default to showing cross-country listings
    currency: "CZK", // Default to Czech Koruna
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user settings using the AuthContext function
    updateUserSettings({
      country: userData.country as "CZ" | "SK",
      showCrossCountryListings: userData.showCrossCountryListings,
    });
    alert(t("profile_updated"));
  };

  // Load user data from auth context on component mount
  useEffect(() => {
    if (user) {
      setUserData(prevState => ({
        ...prevState,
        email: user.email || prevState.email,
        phone: user.phone || prevState.phone,
        country: user.country || prevState.country,
        showCrossCountryListings:
          user.showCrossCountryListings !== undefined
            ? user.showCrossCountryListings
            : prevState.showCrossCountryListings,
      }));
    }
  }, [user]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API to update the password
    alert(t("password_changed"));
  };

  return (
    <main className="flex-grow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-6">{t("account_settings")}</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === "profile"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {t("personal_info")}
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === "security"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {t("security")}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">{t("personal_info")}</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-2xl">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-500 bg-gray-100 sm:text-sm cursor-not-allowed"
                      value={userData.email}
                      disabled
                      readOnly
                    />
                    <p className="mt-1 text-xs text-gray-500">{t("email_cannot_change")}</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-500 bg-gray-100 sm:text-sm cursor-not-allowed"
                      value={userData.phone}
                      disabled
                      readOnly
                    />
                    <p className="mt-1 text-xs text-gray-500">{t("phone_cannot_change")}</p>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("country")}
                    </label>
                    <select
                      id="country"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                      value={userData.country}
                      onChange={e => setUserData({ ...userData, country: e.target.value })}
                    >
                      {countries.map(country => (
                        <option key={country.value} value={country.value}>
                          {t(country.label)}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">{t("location_restricted")}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="showCrossCountryListings"
                          name="showCrossCountryListings"
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={userData.showCrossCountryListings}
                          onChange={e =>
                            setUserData({ ...userData, showCrossCountryListings: e.target.checked })
                          }
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="showCrossCountryListings" className="text-sm text-gray-700">
                          {userData.country === "cz"
                            ? t("show_slovak_listings")
                            : t("show_czech_listings")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    >
                      {t("save_changes")}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">{t("security")}</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                  <div className="mb-4">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("current_password")}
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("new_password")}
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("confirm_password")}
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    >
                      {t("change_password")}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Loading fallback for Suspense
function SettingsContentFallback() {
  return (
    <main className="flex-grow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded mb-6 w-1/4 animate-pulse"></div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <div className="px-6 py-4 w-28 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="px-6 py-4 w-28 h-10 bg-gray-200 rounded animate-pulse ml-4"></div>
            </nav>
          </div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-6 w-1/3 animate-pulse"></div>
            <div className="space-y-6 max-w-2xl">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Main component that uses Suspense
export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<SettingsContentFallback />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
