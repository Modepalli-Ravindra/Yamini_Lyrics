import React from 'react';
import { getCategories, getSongs } from '@/lib/d1';
import HomeClientView from '@/components/HomeClientView';

export const revalidate = 60;

export default async function HomePage() {
  const [categories, songs] = await Promise.all([
    getCategories(),
    getSongs({ limit: 12 }),
  ]);

  return <HomeClientView categories={categories} songs={songs} />;
}
