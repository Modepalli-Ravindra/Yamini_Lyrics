import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSongs, getCategories } from '@/lib/d1';
import CategoryClientView from '@/components/CategoryClientView';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const songs = await getSongs({ categorySlug: slug });

  return <CategoryClientView category={category} songs={songs} />;
}
