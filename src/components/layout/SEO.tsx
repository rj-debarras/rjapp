import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
}

/**
 * SEO component to dynamically update meta tags and JSON-LD 
 * from environment variables without hardcoding.
 */
export default function SEO({ title, description, canonicalPath }: SEOProps) {
  useEffect(() => {
    // 1. Dynamic Meta Tags
    const phone = import.meta.env.VITE_PHONE_NUMBER || "";
    const email = import.meta.env.VITE_CONTACT_EMAIL || "";
    const address = import.meta.env.VITE_POSTAL_ADDRESS || "";
    const siteUrl = "https://rjdebarras.com";
    const fullUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;

    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
    
    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", fullUrl);

    // Update OG Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute("property", "og:title"); document.head.appendChild(ogTitle); }
    ogTitle.setAttribute("content", title);
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute("property", "og:url"); document.head.appendChild(ogUrl); }
    ogUrl.setAttribute("content", fullUrl);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute("property", "og:description"); document.head.appendChild(ogDesc); }
    ogDesc.setAttribute("content", description);

    // 2. Dynamic JSON-LD Structured Data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "RJ Débarras",
      "description": "Service de débarras professionnel en Île-de-France. Maison, appartement, cave, succession, syndrome de Diogène.",
      "url": siteUrl,
      "telephone": phone,
      "email": email,
      "areaServed": {
        "@type": "State",
        "name": "Île-de-France"
      },
      "priceRange": "€€",
      "image": `${siteUrl}/og-image.png`,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR",
        "streetAddress": address
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00",
        "closes": "19:00"
      },
      "serviceType": ["Débarras maison", "Débarras appartement", "Débarras cave", "Débarras succession", "Syndrome de Diogène"]
    };

    // Find or Create JSON-LD Script tag
    let scriptTag = document.querySelector('script[id="dynamic-json-ld"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = "dynamic-json-ld";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

  }, [title, description, canonicalPath]);

  return null; // This component doesn't render anything UI-wise
}
