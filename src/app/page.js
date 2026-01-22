import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Healing the Body, Restoring the Soul.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            We are dedicated to medical missionary work that combines natural healing remedies 
            with the transformative power of the Gospel, bringing wholeness to both physical 
            health and spiritual well-being.
          </p>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Our Mission
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Natural Remedies Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary text-center mb-4">
                Natural Remedies
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Discover the healing power of nature through proven herbal remedies, 
                nutritional guidance, and holistic approaches to wellness that support 
                the body's natural ability to heal.
              </p>
            </div>

            {/* Gospel Ministry Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary text-center mb-4">
                Gospel Ministry
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Experience the life-changing message of hope, grace, and redemption. 
                Through Bible study, worship, and community fellowship, we share the 
                love of Christ that transforms hearts and restores souls.
              </p>
            </div>

            {/* Lifestyle Education Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary text-center mb-4">
                Lifestyle Education
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Learn practical principles for healthy living through comprehensive 
                education on nutrition, exercise, stress management, and sustainable 
                lifestyle choices that promote long-term wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 bg-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            Whether you're seeking healing, want to serve, or need prayer support, 
            we welcome you to be part of this transformative journey. Together, we 
            can bring hope and restoration to communities near and far.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
            >
              Join the Mission
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
            >
              Request Prayer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
