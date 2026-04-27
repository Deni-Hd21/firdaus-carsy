import { Suspense } from "react";
import Hero from "../components/Hero";
import TentangKami from "../components/TentangKami";
import Testimoni from "../components/Testimoni";
import FAQ from "../components/FAQ";
import Kontak from "../components/Kontak";
import Footer from "../components/Footer";
import { SkeletonTestimoni, SkeletonHero } from "../components/SkeletonCard";

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <section className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-24">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-4 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-48" />
                <div className="h-12 bg-slate-800 rounded w-full" />
                <div className="h-12 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-800 rounded w-4/5" />
                <div className="flex gap-4 mt-4">
                  <div className="h-12 bg-slate-800 rounded-full w-40" />
                  <div className="h-12 bg-slate-800 rounded-full w-40" />
                </div>
              </div>
              <div className="w-full md:flex-1">
                <SkeletonHero />
              </div>
            </div>
          </section>
        }
      >
        <Hero />
      </Suspense>

      <TentangKami />

      <Suspense
        fallback={
          <section className="bg-slate-950 py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="h-4 bg-slate-800 rounded w-32 mx-auto mb-3 animate-pulse" />
                <div className="h-8 bg-slate-800 rounded w-64 mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <SkeletonTestimoni key={i} />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <Testimoni />
      </Suspense>

      <FAQ />

      <Kontak />

      <Footer />
    </main>
  );
}
