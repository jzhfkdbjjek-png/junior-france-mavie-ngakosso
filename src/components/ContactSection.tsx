import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { MapPin, Mail, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { CinematicButton } from './CinematicButton';

export const ContactSection: React.FC = () => {
  const { t, language } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const defaultProjectType = formData.projectType || t('contact.form.opt1');

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-[#0e100f] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Information & Philosophy */}
          <div data-reveal="fade-up" className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t('contact.badge')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {t('contact.title')}{' '}
              <span className="font-serif italic font-normal text-brand-amber">
                {t('contact.titleAccent')}
              </span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {t('contact.desc')}
            </p>

            <div className="space-y-3 pt-2">
              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm card-premium-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-amber shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold block">
                    {t('contact.locationLabel')}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {t('contact.locationVal')}
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm card-premium-hover">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-amber shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold block">
                      {t('contact.emailLabel')}
                    </span>
                    <a
                      id="contact-email-link"
                      href="mailto:ngakossoj35@gmail.com"
                      className="text-xs sm:text-sm font-bold text-white hover:text-brand-amber transition-colors inline-flex items-center min-h-[40px] sm:min-h-0 break-all"
                    >
                      ngakossoj35@gmail.com
                    </a>
                  </div>
                </div>
                <CinematicButton
                  variant="ghost"
                  size="sm"
                  href="mailto:ngakossoj35@gmail.com"
                  className="shrink-0 text-[10px] uppercase tracking-wider hidden sm:inline-flex"
                >
                  {language === 'en' ? 'Write' : 'Écrire'}
                </CinematicButton>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm card-premium-hover">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.17-.48-.29z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold block">
                      {t('contact.whatsappLabel')}
                    </span>
                    <a
                      id="contact-whatsapp-link"
                      href="https://wa.me/242067613213"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#25D366] transition-colors inline-flex items-center min-h-[40px] sm:min-h-0 tracking-wide"
                    >
                      067613213
                    </a>
                  </div>
                </div>
                <CinematicButton
                  variant="ghost"
                  size="sm"
                  href="https://wa.me/242067613213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[10px] uppercase tracking-wider text-[#25D366] hover:text-[#25D366]"
                >
                  WhatsApp ↗
                </CinematicButton>
              </div>

              {/* Amazon Bookstore Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm card-premium-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-amber shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold block">
                    {t('contact.amazonLabel')}
                  </span>
                  <a
                    href="https://a.co/d/08g7FiVA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-brand-amber hover:underline block"
                  >
                    {t('contact.amazonLink')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form with pristine UX */}
          <div
            data-reveal="fade-up"
            className="delay-150 lg:col-span-7 bg-[#181b1a] border border-white/10 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl"
          >
            {submitted ? (
              <div className="p-6 sm:p-8 text-center space-y-4 bg-white/5 rounded-2xl border border-brand-gold/40 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-brand-gold/20 text-brand-amber flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  {t('contact.form.successTitle')}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {t('contact.form.successDesc', { type: defaultProjectType })}
                </p>
                <CinematicButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      projectType: '',
                      message: '',
                    });
                  }}
                >
                  {t('contact.form.sendAnother')}
                </CinematicButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-name-input"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5"
                    >
                      {t('contact.form.nameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company-input"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5"
                    >
                      {t('contact.form.companyLabel')}
                    </label>
                    <input
                      id="contact-company-input"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('contact.form.companyPlaceholder')}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-email-input"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5"
                    >
                      {t('contact.form.emailLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-project-select"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5"
                    >
                      {t('contact.form.projectTypeLabel')}
                    </label>
                    <select
                      id="contact-project-select"
                      value={formData.projectType || t('contact.form.opt1')}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all outline-none"
                    >
                      <option value={t('contact.form.opt1')} className="bg-[#181b1a] text-white">{t('contact.form.opt1')}</option>
                      <option value={t('contact.form.opt2')} className="bg-[#181b1a] text-white">{t('contact.form.opt2')}</option>
                      <option value={t('contact.form.opt3')} className="bg-[#181b1a] text-white">{t('contact.form.opt3')}</option>
                      <option value={t('contact.form.opt4')} className="bg-[#181b1a] text-white">{t('contact.form.opt4')}</option>
                      <option value={t('contact.form.opt5')} className="bg-[#181b1a] text-white">{t('contact.form.opt5')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message-textarea"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5"
                  >
                    {t('contact.form.messageLabel')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message-textarea"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all outline-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-stone-400 text-center sm:text-left">
                    {t('contact.form.confidentialityNotice')}
                  </span>
                  <CinematicButton
                    id="contact-form-submit-btn"
                    variant="primary"
                    size="lg"
                    type="submit"
                    loading={isSubmitting}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting
                      ? language === 'en'
                        ? 'Submitting...'
                        : 'Transmission...'
                      : t('contact.form.submitBtn')}
                  </CinematicButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
