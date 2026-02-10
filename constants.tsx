
import React from 'react';
import { Book, Users, Heart } from 'lucide-react';
import { FeatureCardData, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'Discipleship Paths', href: '#paths' },
  { label: 'Community Events', href: '#events' },
  { label: 'Service & Outreach', href: '#service' },
  { label: 'Resources', href: '#resources' },
];

export const FEATURES: FeatureCardData[] = [
  {
    title: 'Walk the Word',
    subtitle: 'Daily Devotionals & Bible Studies',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800',
    description: 'Nourish your spirit with our guided daily readings and collaborative deep-dives into Scripture.',
    icon: <Book className="w-6 h-6" />,
  },
  {
    title: 'Building Bridges',
    subtitle: 'Fellowship & Community Groups',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
    description: 'Find your people and grow together in intentional small groups designed for life-sharing.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: 'Serving Others',
    subtitle: 'Mission Trips & Local Outreach',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    description: 'Extend the journey of faith by being the hands and feet of Christ in our neighborhood and beyond.',
    icon: <Heart className="w-6 h-6" />,
  },
];

export const COLORS = {
  beige: '#FAF7F2',
  earth: '#3E2723',
  forest: '#4A5D23',
  gold: '#C5A059',
  softBrown: '#8B6B5D',
};
