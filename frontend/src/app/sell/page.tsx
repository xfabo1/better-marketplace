"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";

// Mock categories for the form
const categories = [
  { id: "elektronika", name: "Elektronika" },
  { id: "automobily", name: "Automobily" },
  { id: "nabytek", name: "Nábytek" },
  { id: "obleceni", name: "Oblečení" },
  { id: "sport", name: "Sport" },
  { id: "detske", name: "Dětské zboží" },
  { id: "nemovitosti", name: "Nemovitosti" },
  { id: "sluzby", name: "Služby" },
  { id: "ostatni", name: "Ostatní" }
];

// Condition options for the form
const conditions = [
  { id: "nove", name: "Nové" },
  { id: "jako_nove", name: "Použité - jako nové" },
  { id: "velmi_dobre", name: "Použité - velmi dobrý stav" },
  { id: "dobre", name: "Použité - dobrý stav" },
  { id: "horsi", name: "Použité - horší stav" }
];

// Character limits
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 2000;
const PRICE_MAX_VALUE = 10000000; // 10 million Kč

// Component that uses useRouter
function SellForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
    images: [] as File[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Vyplňte název inzerátu";
    } else if (formData.title.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Název může mít maximálně ${TITLE_MAX_LENGTH} znaků`;
    }
    
    if (!formData.category) {
      newErrors.category = "Vyberte kategorii";
    }
    
    if (!formData.condition) {
      newErrors.condition = "Vyberte stav";
    }
    
    if (!formData.price.trim()) {
      newErrors.price = "Vyplňte cenu";
    } else {
      const priceValue = Number(formData.price);
      if (isNaN(priceValue) || priceValue < 0) {
        newErrors.price = "Zadejte platnou cenu";
      } else if (priceValue > PRICE_MAX_VALUE) {
        newErrors.price = `Cena nemůže být vyšší než ${PRICE_MAX_VALUE.toLocaleString()} Kč`;
      }
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Vyplňte popis inzerátu";
    } else if (formData.description.length > DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Popis může mít maximálně ${DESCRIPTION_MAX_LENGTH} znaků`;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Vyplňte lokalitu";
    }
    
    if (!formData.contactPhone.trim() && !formData.contactEmail.trim()) {
      newErrors.contactPhone = "Vyplňte alespoň jeden kontaktní údaj";
      newErrors.contactEmail = "Vyplňte alespoň jeden kontaktní údaj";
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
      // Here you would call your API to create the listing
      console.log("Submitting listing:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to my listings page after successful submission
      router.push("/my-listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Došlo k chybě při vytváření inzerátu. Zkuste to prosím znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">
            Vytvořit nový inzerát
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Název inzerátu * <span className="text-xs text-gray-500">({formData.title.length}/{TITLE_MAX_LENGTH})</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.title 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Např. iPhone 12 Pro Max, 256GB, Pacific Blue"
                maxLength={TITLE_MAX_LENGTH}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Kategorie *
              </label>
              <select
                id="category"
                name="category"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.category 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Vyberte kategorii</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Stav *
              </label>
              <select
                id="condition"
                name="condition"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.condition 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="">Vyberte stav</option>
                {conditions.map(condition => (
                  <option key={condition.id} value={condition.id}>
                    {condition.name}
                  </option>
                ))}
              </select>
              {errors.condition && (
                <p className="mt-2 text-sm text-red-600">{errors.condition}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Cena (Kč) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.price 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.price}
                onChange={handleChange}
                placeholder="Např. 18500"
                min="0"
                max={PRICE_MAX_VALUE}
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Popis * <span className="text-xs text-gray-500">({formData.description.length}/{DESCRIPTION_MAX_LENGTH})</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.description 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Podrobný popis inzerátu..."
                maxLength={DESCRIPTION_MAX_LENGTH}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Lokalita *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.location 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                value={formData.location}
                onChange={handleChange}
                placeholder="Zadejte město nebo PSČ (např. Praha 5, 110 00)"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Zadejte název města nebo PSČ. V budoucí verzi bude k dispozici našeptávač.
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fotografie (max. 5)
              </label>
              <div className="flex flex-wrap gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-28 h-28 border rounded-md overflow-hidden shadow-sm">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Náhled ${index + 1}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 5 && (
                  <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-white">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="mt-1 text-xs text-gray-500">Přidat foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Nahrajte až 5 fotografií ve formátu JPG nebo PNG.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.contactPhone 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary'
                  } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+420 123 456 789"
                />
                {errors.contactPhone && (
                  <p className="mt-2 text-sm text-red-600">{errors.contactPhone}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.contactEmail 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary'
                  } shadow-sm text-gray-900 focus:outline-none sm:text-sm`}
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="vas@email.cz"
                />
                {errors.contactEmail && (
                  <p className="mt-2 text-sm text-red-600">{errors.contactEmail}</p>
                )}
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="py-3 px-6 text-sm font-medium text-gray-700 hover:text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Odesílání..." : "Vytvořit inzerát"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

// Loading fallback for Suspense
function SellFormFallback() {
  return (
    <main className="flex-grow py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
          <div className="h-8 bg-gray-200 rounded mb-6 w-1/2 animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse float-right"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Main component that uses Suspense
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