import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  ogImage?: string;
  structuredData?: Record<string, any>;
}

const DEFAULT_TITLE = 'Junior France Mavie Ngakosso — Écrivain • Auteur • Scénariste • Créateur';
const DEFAULT_DESCRIPTION =
  'Portfolio et dossier artistique officiel de Junior France Mavie Ngakosso — Écrivain, scénariste et créateur congolais. Découvrez ses romans (Le Cercueil aux Muscles, La Forêt Interdite), ses projets cinématographiques et ses séries télévisées.';
const DEFAULT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCMA7LeAzMfMDJRE5BssNK18gc9qFlys4HuOJJ7J7U5DvThpmWrvE32AEP1afslKrSm-aJ1LE0sIwi3pDbkNmleieIJKpSOnSntRNznhSCEL7QJ7Mb19PxNa9ezuLUUSPR3HQzNGUP5NqYwi5ojY_8_3rP5kJ5Mb5g2Yv0Jmj02NWqZka4Y5B8uuzt2prXcNys40Uj7rMTZcAfbzTN0DyxQUIqb5kPnQg_H5I1LHWk6aro3Nq1IzqWx';

export function useSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
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

    // 4. Update Canonical Link
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ngakosso.com';
    const canonicalUrl = `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 5. Update OpenGraph Tags
    updateMetaProperty('og:title', finalTitle);
    updateMetaProperty('og:description', finalDesc);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:url', canonicalUrl);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:site_name', 'Junior France Mavie Ngakosso');
    updateMetaProperty('og:locale', 'fr_FR');

    // 6. Update Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDesc);
    updateMeta('twitter:image', ogImage);

    // 7. Inject / Update Schema.org JSON-LD structured data
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
  }, [title, description, keywords, canonicalPath, ogType, ogImage, structuredData]);
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
