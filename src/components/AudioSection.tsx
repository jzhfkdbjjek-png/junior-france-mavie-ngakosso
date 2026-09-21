import React, { useState, useEffect, useRef } from 'react';
import { getAudioTracks } from '../data/portfolioData';
import { useI18n } from '../i18n/I18nContext';
import { Play, Pause, SkipForward, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { CinematicButton } from './CinematicButton';

export const AudioSection: React.FC = () => {
  const { t, language } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(102); // initial preview position
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const audioTracks = getAudioTracks(language);
  const currentTrackData = audioTracks[currentTrackIndex] || audioTracks[0];

  // Web Audio Synth for authentic cinematic atmospheric audio experience
  const startSynth = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      const targetGain = isMuted ? 0.0001 : 0.12;
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(targetGain, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Cinematic drone chords (D minor atmospheric)
      const baseFreqs = [73.42, 110.0, 146.83, 220.0, 261.63, 329.63];
      const oscs: OscillatorNode[] = [];

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorRefs.current = oscs;
    } catch (e) {
      console.warn('Audio Context initialization note', e);
    }
  };

  const stopSynth = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.setValueAtTime(
          gainNodeRef.current.gain.value,
          audioCtxRef.current.currentTime
        );
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.6
        );
        setTimeout(() => {
          oscillatorRefs.current.forEach((o) => {
            try {
              o.stop();
            } catch {
              /* ignore */
            }
          });
          oscillatorRefs.current = [];
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 600);
      } catch {
        // ignore
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynth();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      startSynth();
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrackData.durationSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0.0001 : 0.12,
        audioCtxRef.current.currentTime
      );
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSynth();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % audioTracks.length);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = Math.floor(percentage * currentTrackData.durationSeconds);
    setCurrentTime(newTime);
  };

  const progressPercent = (currentTime / currentTrackData.durationSeconds) * 100;

  return (
    <section
      id="audio"
      className="py-16 sm:py-20 lg:py-24 bg-[#0b0d0c] text-white relative border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          data-reveal="fade-up"
          className="bg-gradient-to-r from-[#181b1a] to-[#121413] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden card-premium-hover"
        >
          <div className="absolute right-0 top-0 w-64 sm:w-96 h-64 sm:h-96 glow-sphere blur-3xl opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-amber">
                  {t('audio.badge')}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight">
                {t('audio.title')}
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-brand-gold">
                {t('audio.tagline')}
              </p>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {t('audio.desc')}
              </p>

              {/* Sample Selector Tabs */}
              <div className="pt-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 block mb-2">
                  {language === 'en' ? 'Available Audio Excerpts:' : 'Extraits Audio Disponibles :'}
                </span>
                <div className="flex flex-wrap gap-2" role="tablist">
                  {audioTracks.map((track, idx) => {
                    const isSelected = currentTrackIndex === idx;
                    return (
                      <CinematicButton
                        key={track.id}
                        variant="filter"
                        size="sm"
                        active={isSelected}
                        onClick={() => {
                          setCurrentTrackIndex(idx);
                          setCurrentTime(0);
                        }}
                        icon={
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-amber-300 shadow-[0_0_6px_#f59e0b]' : 'bg-brand-amber/60'
                            }`}
                          ></span>
                        }
                        iconPosition="left"
                        aria-label={`${t('audio.sample')} ${idx + 1} : ${track.bookReference}`}
                      >
                        {t('audio.sample')} {idx + 1} : {track.bookReference}
                      </CinematicButton>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dark & Design Audio Player */}
            <div
              data-reveal="scale-in"
              className="delay-150 lg:col-span-5 bg-black/85 backdrop-blur-xl border border-white/10 p-5 sm:p-7 rounded-2xl shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  id="audio-play-toggle-btn"
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
                  className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-gradient-to-r from-brand-amber to-brand-gold flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 translate-x-0.5 fill-current" />
                  )}
                </button>

                <div className="overflow-hidden flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {currentTrackData.title}
                  </p>
                  <p className="text-[11px] text-stone-400 truncate mt-0.5">
                    {currentTrackData.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {/* Mute Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? (language === 'en' ? 'Unmute' : 'Activer le son') : (language === 'en' ? 'Mute' : 'Couper le son')}
                    title={isMuted ? (language === 'en' ? 'Unmute' : 'Activer le son') : (language === 'en' ? 'Mute' : 'Couper le son')}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-400 hover:text-white active:scale-95 transition-colors rounded-lg cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Next Track Button */}
                  <button
                    type="button"
                    onClick={handleNextTrack}
                    title={t('audio.next')}
                    aria-label={t('audio.next')}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-400 hover:text-brand-amber active:scale-95 transition-colors rounded-lg cursor-pointer"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Scrubbing Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div
                  ref={progressBarRef}
                  onClick={handleSeek}
                  className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                  title={language === 'en' ? 'Click to navigate excerpt' : "Cliquer pour naviguer dans l'extrait"}
                  role="progressbar"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={currentTrackData.durationSeconds}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-amber to-brand-gold rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-[10px] uppercase tracking-wider text-brand-gold font-sans font-semibold">
                    {isPlaying ? t('audio.activeAmbiance') : t('audio.listeningPrivilege')}
                  </span>
                  <span>{currentTrackData.duration}</span>
                </div>
              </div>

              {/* Waveform Visualizer */}
              <div className="flex items-center justify-between gap-1.5 h-9 px-3 bg-white/5 rounded-xl overflow-hidden">
                {[
                  'bg-brand-amber',
                  'bg-brand-gold',
                  'bg-brand-amber',
                  'bg-white/40',
                  'bg-brand-gold',
                  'bg-brand-amber',
                  'bg-white/30',
                  'bg-brand-gold',
                  'bg-brand-amber',
                  'bg-white/50',
                  'bg-brand-gold',
                  'bg-brand-amber',
                ].map((colorClass, i) => (
                  <span
                    key={i}
                    className={`wave-bar w-1.5 ${colorClass} rounded-full transition-all duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-30 !h-1.5 !animate-none'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
