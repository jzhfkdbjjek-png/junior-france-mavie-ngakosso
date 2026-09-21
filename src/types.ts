export interface BookItem {
  id: string;
  title: string;
  type: string;
  author: string;
  category: string;
  badge: string;
  subBadge?: string;
  image: string;
  universe: string;
  description: string;
  summary: string;
  amazonUrl: string;
  adaptationNote?: string;
  adaptationType?: 'film' | 'series';
  adaptationTargetId?: string;
  isSpotlight?: boolean;
}

export interface FilmItem {
  id: string;
  title: string;
  type: string;
  duration?: string;
  genre: string;
  location?: string;
  languages?: string;
  status: string;
  statusType?: 'script' | 'pitch' | 'dialogue' | 'continuity';
  role: string;
  logline: string;
  synopsis?: string;
  inspiration?: string;
  relatedBookId?: string;
  relatedBookTitle?: string;
}

export interface SeriesItem {
  id: string;
  title: string;
  type: string;
  format: string;
  genre: string;
  country?: string;
  location?: string;
  languages?: string;
  status: string;
  role: string;
  logline: string;
  synopsis?: string;
  concept?: string;
  isPrestige?: boolean;
  relatedBookId?: string;
  relatedBookTitle?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  bookReference: string;
}

export interface ContactFormSubmission {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}
