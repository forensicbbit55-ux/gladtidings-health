'use client'

export default function ContactPage() {

  return (
    <main className="px-4 py-12">
      <div className="container mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-secondary font-semibold tracking-wide uppercase text-sm">
            Contact
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-serif text-primary">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed font-sans">
            Have a question, need prayer, or want to partner in the mission? Send us a
            note. We&apos;re here to support your healing journey.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white border border-primary/10 rounded-2xl p-8 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Share your thoughts, questions, or prayer needs..."
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg bg-secondary text-white px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-white text-primary px-6 py-3 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Request Prayer
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-gray-50 border border-primary/10 rounded-2xl p-6">
            <h2 className="text-2xl font-serif text-primary">Visit or Write</h2>
            <p className="mt-3 font-sans text-gray-700 leading-relaxed">
              Placeholder location and contact info. Add your ministry address, phone,
              and hours here.
            </p>
            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <p><span className="font-semibold text-primary">Email:</span> hello@example.com</p>
              <p><span className="font-semibold text-primary">Phone:</span> (555) 123-4567</p>
              <p><span className="font-semibold text-primary">Hours:</span> Mon–Fri, 9am–5pm</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

