function ProductPageSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl animate-pulse rounded-3xl bg-white p-8 shadow-soft">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="h-[420px] rounded-3xl bg-slate-200" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-12 w-3/4 rounded bg-slate-200" />
            <div className="h-8 w-32 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPageSkeleton;
