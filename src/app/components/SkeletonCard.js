export function SkeletonTestimoni() {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 animate-pulse">
      <div className="w-full aspect-square bg-slate-700" />
      <div className="p-5">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-slate-600 rounded" />
          ))}
        </div>
        <div className="h-3 bg-slate-600 rounded w-1/3 mb-2" />
        <div className="h-3 bg-slate-600 rounded w-full mb-1" />
        <div className="h-3 bg-slate-600 rounded w-4/5 mb-1" />
        <div className="h-3 bg-slate-600 rounded w-3/5" />
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-600" />
          <div>
            <div className="h-3 bg-slate-600 rounded w-24 mb-1" />
            <div className="h-2 bg-slate-700 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="w-full aspect-video rounded-2xl bg-slate-800 animate-pulse border border-slate-700" />
  );
}