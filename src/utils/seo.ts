import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

export const SITE_DOMAIN = 'https://juniorfrancemavie-ngakosso.vercel.app';

const DEFAULT_TITLE = 'Junior France Mavie Ngakosso — Écrivain • Auteur • Scénariste • Créateur';
const DEFAULT_DESCRIPTION =
  'Portfolio officiel de Junior France Mavie Ngakosso — Écrivain, créateur et scénariste congolais. Romans (Le Cercueil aux Muscles, Le Pacte du Démon), série TV La Forêt Interdite et cinéma.';
const DEFAULT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCMA7LeAzMfMDJRE5BssNK18gc9qFlys4HuOJJ7J7U5DvThpmWrvE32AEP1afslKrSm-aJ1LE0sIwi3pDbkNmleieIJKpSOnSntRNznhSCEL7QJ7Mb19PxNa9ezuLUUSPR3HQzNGUP5NqYwi5ojY_8_3rP5kJ5Mb5g2Yv0Jmj02NWqZka4Y5B8uuzt2prXcNys40Uj7rMTZcAfbzTN0DyxQUIqb5kPnQg_H5I1LHWk6aro3Nq1IzqWx';

export function useSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
}: SEOProps = {}) {
  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title ? `${title} | Junior France Mavie Ngakosso` : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Update Meta Description
    const finalDesc = description || DEFAULT_DESCRIPTION;
    updateMeta('description', finalDesc);

    // 3. Update Meta Keywords
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // 4. Update Meta Robots (Strictly avoid accidental noindex on public pages)
    if (noindex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 5. Update Canonical Link
    const origin = typeof window !== 'undefined' && window.location.origin.includes('vercel.app')
      ? window.location.origin
      : SITE_DOMAIN;
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${origin}${cleanPath === '/' ? '' : cleanPath}`;
    
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl || `${SITE_DOMAIN}/`);

    // 6. Update OpenGraph Tags
    updateMetaProperty('og:title', finalTitle);
    updateMetaProperty('og:description', finalDesc);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:url', canonicalUrl || `${SITE_DOMAIN}/`);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:site_name', 'Junior France Mavie Ngakosso');
    updateMetaProperty('og:locale', 'fr_FR');

    // 7. Update Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDesc);
    updateMeta('twitter:image', ogImage);

    // 8. Google Search Console Verification Meta Tag (support env var if defined)
    const verificationCode = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)?.trim();
    if (verificationCode) {
      updateMeta('google-site-verification', verificationCode);
    }

    // 9. Inject / Update Schema.org JSON-LD structured data
    if (structuredData) {
      let script = document.getElementById('page-schema-structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'page-schema-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup custom page schema script when component unmounts
      const script = document.getElementById('page-schema-structured-data');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, noindex, structuredData]);
}

function updateMeta(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string): void {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
