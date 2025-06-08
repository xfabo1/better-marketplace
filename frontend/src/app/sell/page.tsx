"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { createItem } from "@/api/itemApi";
import { categories } from "@/data/categories";
import { conditions } from "@/data/conditions";

// Character limits
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 2000;
const PRICE_MAX_VALUE = 10000000; // 10 million Kč

// Component that uses useRouter
function SellForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    condition: "",
    price: "",
    currency: "czk", // Default to Czech Koruna
    description: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
    images: [] as File[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);

  // Set mounted to true when component mounts on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (mounted && !user) {
      router.push("/login?redirect=/sell");
    }
  }, [mounted, user, router]);

  // Update available subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      if (selectedCategory && selectedCategory.subcategories) {
        setAvailableSubcategories(selectedCategory.subcategories);
        // Reset subcategory when category changes
        setFormData(prev => ({ ...prev, subcategory: "" }));
      } else {
        setAvailableSubcategories([]);
      }
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array and append to existing images
      const newImages = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5), // Limit to 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t("fill_title");
    } else if (formData.title.length > TITLE_MAX_LENGTH) {
      newErrors.title = t("max_title_length").replace("{max}", TITLE_MAX_LENGTH.toString());
    }

    if (!formData.category) {
      newErrors.category = t("select_category_error");
    }

    if (formData.category && availableSubcategories.length > 0 && !formData.subcategory) {
      newErrors.subcategory = t("select_subcategory_error") || "Please select a subcategory";
    }

    if (!formData.condition) {
      newErrors.condition = t("select_condition_error");
    }

    if (!formData.price.trim()) {
      newErrors.price = t("enter_price");
    } else {
      const priceValue = Number(formData.price);
      if (isNaN(priceValue) || priceValue < 0) {
        newErrors.price = t("valid_price");
      } else if (priceValue > PRICE_MAX_VALUE) {
        newErrors.price = t("max_price").replace("{max}", PRICE_MAX_VALUE.toLocaleString());
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = t("fill_description");
    } else if (formData.description.length > DESCRIPTION_MAX_LENGTH) {
      newErrors.description = t("max_description_length").replace(
        "{max}",
        DESCRIPTION_MAX_LENGTH.toString()
      );
    }

    if (!formData.location.trim()) {
      newErrors.location = t("fill_location");
    }

    if (!formData.contactPhone.trim() && !formData.contactEmail.trim()) {
      newErrors.contactPhone = t("fill_contact");
      newErrors.contactEmail = t("fill_contact");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API to create the item
      const itemData = {
        name: formData.title,
        price: parseFloat(formData.price),
        currency: formData.currency.toUpperCase(),
        description: formData.description,
        imageUrl:
          formData.images.length > 0
            ? URL.createObjectURL(formData.images[0])
            : "https://placehold.co/800x600/e6f7ef/10b981/png?text=No+Image",
        locationId: 1, // Use a default locationId of 1
        email: formData.contactEmail || user?.email || "",
        phoneNumber: formData.contactPhone || user?.phone || "",
        // Include subcategory in the request
        category: formData.category,
        subcategory: formData.subcategory,
      };

      const itemId = await createItem(itemData);
      console.log("Created item with ID:", itemId);

      // Redirect to my listings page after successful submission
      router.push("/my-listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert(t("error_creating_listing"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show simplified view during server-side rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <main className="flex-grow py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-6">{t("create_listing")}</h1>
            {/* Simplified form skeleton during SSR */}
            <div className="space-y-6">
              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  {t("listing_title")} *
                </div>
                <div className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm"></div>
              </div>
              {/* Additional simplified form fields could be added here */}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">{t("create_listing")}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {t("listing_title")} *{" "}
                <span className="text-xs text-gray-500">
                  ({formData.title.length}/{TITLE_MAX_LENGTH})
                </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.title
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.title}
                onChange={handleChange}
                placeholder={
                  t("title_placeholder") || "E.g. iPhone 12 Pro Max, 256GB, Pacific Blue"
                }
                maxLength={TITLE_MAX_LENGTH}
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t("categories")} *
              </label>
              <select
                id="category"
                name="category"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.category
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">{t("select_category")}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {t(category.id)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Subcategory dropdown - only shown when a category is selected */}
            {formData.category && availableSubcategories.length > 0 && (
              <div className="mb-4">
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("subcategory") || "Podkategorie"} *
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.subcategory
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-primary"
                  } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">{t("select_subcategory") || "Vyberte podkategorii"}</option>
                  {availableSubcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {t(subcategory.id)}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className="mt-2 text-sm text-red-600">{errors.subcategory}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                {t("condition")} *
              </label>
              <select
                id="condition"
                name="condition"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.condition
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="">{t("select_condition")}</option>
                {conditions.map(condition => (
                  <option key={condition.id} value={condition.id}>
                    {t(condition.name)}
                  </option>
                ))}
              </select>
              {errors.condition && <p className="mt-2 text-sm text-red-600">{errors.condition}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("price")} *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.price
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-primary"
                  } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
                {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("currency") || "Měna"}
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  {user?.country === "CZ" ? (
                    <>
                      <option value="czk">{t("czech_koruna") || "Česká koruna (Kč)"}</option>
                      <option value="eur">{t("euro") || "Euro (€)"}</option>
                    </>
                  ) : (
                    <>
                      <option value="eur">{t("euro") || "Euro (€)"}</option>
                      <option value="czk">{t("czech_koruna") || "Česká koruna (Kč)"}</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                {t("description")} *{" "}
                <span className="text-xs text-gray-500">
                  ({formData.description.length}/{DESCRIPTION_MAX_LENGTH})
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.description
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.description}
                onChange={handleChange}
                placeholder={
                  t("description_placeholder") || "Detailed description of your listing..."
                }
                maxLength={DESCRIPTION_MAX_LENGTH}
              ></textarea>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                {t("location")} *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.location
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.location}
                onChange={handleChange}
                placeholder={t("location_placeholder") || "Prague, Brno, ..."}
              />
              {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
              <p className="mt-1 text-xs text-gray-500">{t("location_hint")}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t("images")} (max. 5)
              </label>
              <div className="flex flex-wrap gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                {formData.images.length < 5 && (
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="mt-1 text-xs text-gray-500">{t("add_image")}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/jpeg,image/png,image/webp"
                      />
                    </div>
                  </label>
                )}
              </div>
              <p className="mt-3 text-xs text-gray-500">{t("image_hint")}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t("contact_info")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className={`block w-full px-4 py-3 rounded-md border ${
                      errors.contactPhone
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-primary"
                    } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder={t("phone_placeholder") || "+420 123 456 789"}
                  />
                  {errors.contactPhone && (
                    <p className="mt-2 text-sm text-red-600">{errors.contactPhone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className={`block w-full px-4 py-3 rounded-md border ${
                      errors.contactEmail
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-primary"
                    } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder={t("email_placeholder") || "email@example.com"}
                  />
                  {errors.contactEmail && (
                    <p className="mt-2 text-sm text-red-600">{errors.contactEmail}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between">
              <Link
                href="/"
                className="py-3 px-6 text-sm font-medium text-gray-700 hover:text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {t("cancel")}
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? t("submitting") : t("create_listing")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

// Fallback component for Suspense
function SellFormFallback() {
  return (
    <main className="flex-grow py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SellPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<SellFormFallback />}>
        <SellForm />
      </Suspense>
    </div>
  );
}
