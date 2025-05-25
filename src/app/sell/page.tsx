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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">
            Vytvořit nový inzerát
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Název inzerátu *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.title 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Kategorie *
              </label>
              <select
                id="category"
                name="category"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.category 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
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
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Cena (Kč) *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.price 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Popis *
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.description 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Lokalita *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.location 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fotografie (max. 5)
              </label>
              <div className="mt-2 flex flex-wrap gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Náhled ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 5 && (
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-primary">
                    <span className="text-3xl text-gray-400">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Nahrajte až 5 fotografií ve formátu JPG nebo PNG.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.contactPhone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.contactEmail 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Odesílání..." : "Vytvořit inzerát"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 