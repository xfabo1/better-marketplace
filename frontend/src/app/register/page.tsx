"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

// Component that uses useRouter
function RegisterRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page with register form open
    router.push("/login?register=true");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-600">Přesměrování na registrační formulář...</p>
    </div>
  );
}

// Loading fallback for Suspense
function RegisterFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-gray-600 animate-pulse">Načítání...</div>
    </div>
  );
}

// Main component that uses Suspense
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterRedirect />
    </Suspense>
  );
} 