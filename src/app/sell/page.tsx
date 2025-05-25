"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SellPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
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
    }
    
    if (!formData.category) {
      newErrors.category = "Vyberte kategorii";
    }
    
    if (!formData.price.trim()) {
      newErrors.price = "Vyplňte cenu";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = "Zadejte platnou cenu";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Vyplňte popis inzerátu";
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-6">
              Vytvořit nový inzerát
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Název inzerátu *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.title 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-gray-300 focus:ring-primary'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Např. iPhone 12 Pro Max, 256GB, Pacific Blue"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie *
                </label>
                <select
                  id="category"
                  name="category"
                  className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.category 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-gray-300 focus:ring-primary'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
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
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Cena (Kč) *
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.price 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-gray-300 focus:ring-primary'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Např. 18500"
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Popis *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.description 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-gray-300 focus:ring-primary'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Podrobný popis inzerátu..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Lokalita *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.location 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-gray-300 focus:ring-primary'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Např. Praha 5"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Fotografie (max. 5)
                </label>
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative w-28 h-28 border rounded-md overflow-hidden shadow-sm">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Náhled ${index + 1}`}
                        className="w-full h-full object-cover"
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
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.contactPhone 
                        ? 'ring-red-300 focus:ring-red-500' 
                        : 'ring-gray-300 focus:ring-primary'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+420 123 456 789"
                  />
                  {errors.contactPhone && (
                    <p className="mt-2 text-sm text-red-600">{errors.contactPhone}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className={`block w-full px-4 py-3 rounded-md bg-white border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.contactEmail 
                        ? 'ring-red-300 focus:ring-red-500' 
                        : 'ring-gray-300 focus:ring-primary'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm`}
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
    </div>
  );
} 