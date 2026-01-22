import Link from 'next/link'

export const metadata = {
  title: 'Devotional | Glad Tidings',
  description: 'Daily devotional reading and verse of the day.',
}

export default function DevotionalPage() {
  return (
    <main className="px-4 py-12">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="text-secondary font-semibold tracking-wide uppercase text-sm">
            Daily Devotional
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-primary">
            Draw Near
          </h1>
          <p className="mt-4 font-sans text-gray-700 leading-relaxed">
            Placeholder devotional content. This page will feature a short reading,
            reflection, and prayer to encourage faith and practical living.
          </p>
        </header>

        {/* Verse of the Day */}
        <section className="border-2 border-accent rounded-xl bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-serif text-2xl text-primary">Verse of the Day</h2>
            <span className="text-xs font-semibold text-primary/80 bg-accent/20 px-3 py-1 rounded-full">
              Psalm 46:10
            </span>
          </div>

          <blockquote className="mt-4 font-sans text-gray-800 leading-relaxed">
            “Be still, and know that I am God: I will be exalted among the heathen,
            I will be exalted in the earth.”
          </blockquote>

          <p className="mt-4 font-sans text-gray-600 leading-relaxed">
            Reflection (placeholder): In the quiet moments, God invites us to pause,
            breathe, and remember who He is. Stillness is not inactivity—it’s trust.
          </p>
        </section>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-secondary text-white px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors"
          >
            Yesterday&apos;s Devotional
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-white text-primary px-6 py-3 font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse Archive
          </Link>
        </div>
      </div>
    </main>
  )
}

