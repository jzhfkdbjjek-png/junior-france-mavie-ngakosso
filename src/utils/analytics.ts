/**
 * Google Analytics 4 (GA4) Integration & Event Tracking
 * Compliant with Google Tag Manager / gtag.js standards & Consent Mode v2.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type ConsentStatus = 'granted' | 'denied' | 'pending';

const CONSENT_STORAGE_KEY = 'ga_consent_status_v1';
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || '';

/**
 * Get current user consent status
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (saved === 'granted' || saved === 'denied') {
    return saved;
  }
  return 'pending';
}

/**
 * Update user consent status and apply to Google Analytics
 */
export function setConsentStatus(status: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_STORAGE_KEY, status);

  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }

  if (status === 'granted') {
    initAnalytics();
    trackPageView(window.location.pathname, document.title);
  }
}

let isInitialized = false;

/**
 * Initialize GA4 script dynamically if measurement ID is present and consent is granted
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || isInitialized) return;
  if (!GA_MEASUREMENT_ID) {
    // GA Measurement ID is not provided yet in environment variables
    return;
  }

  const consent = getConsentStatus();
  if (consent === 'denied') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  };

  // Set default consent state
  window.gtag('consent', 'default', {
    analytics_storage: consent === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We handle page views explicitly for SPA routes
    anonymize_ip: true,
  });

  // Inject script asynchronously
  if (!document.getElementById('ga-script')) {
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
}

/**
 * Track SPA Page Views
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || getConsentStatus() !== 'granted') return;
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Generic Custom Event Tracker
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || getConsentStatus() !== 'granted') return;
  if (!window.gtag) return;

  window.gtag('event', eventName, params);
}

/**
 * Business & Editorial Event Helpers
 */
export const analyticsEvents = {
  // Opening modal or detail card for a book, movie or series
  viewWorkItem: (title: string, category: 'livre' | 'film' | 'serie') => {
    trackEvent('view_item', {
      item_name: title,
      item_category: category,
    });
  },

  // Downloading official Press Kit A4 PDF
  downloadPressKit: (language: string) => {
    trackEvent('file_download', {
      file_name: 'Junior-France-Mavie-Ngakosso-Press-Kit.pdf',
      file_extension: 'pdf',
      document_type: 'press_kit',
      language,
    });
  },

  // Clicking an external Amazon purchase link
  clickAmazon: (bookTitle: string) => {
    trackEvent('outbound_click', {
      destination: 'amazon',
      book_title: bookTitle,
    });
  },

  // Clicking a contact channel (Email, WhatsApp, Direct link)
  clickContact: (channel: 'email' | 'whatsapp' | 'form') => {
    trackEvent('contact_click', {
      contact_channel: channel,
    });
  },

  // Navigating to dedicated 'La Forêt Interdite' universe page
  openForetDedicatedPage: () => {
    trackEvent('select_content', {
      content_type: 'dedicated_page',
      item_id: 'foret-interdite',
    });
  },

  // Switching language
  switchLanguage: (newLang: string) => {
    trackEvent('select_language', {
      language: newLang,
    });
  },
};
