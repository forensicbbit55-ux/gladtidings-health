import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        {/* Enhanced Background with Semi-transparent Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/70 to-gold/60">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 sm:px-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-shadow bg-gradient-to-r from-white to-gold-light bg-clip-text text-transparent animate-fade-in-up">
            Healing the Body, Restoring the Soul.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed sm:leading-extra-relaxed drop-shadow-lg animate-fade-in-up animation-delay-200">
            We are dedicated to medical missionary work that combines natural healing remedies 
            with the transformative power of the Gospel, bringing wholeness to both physical 
            health and spiritual well-being.
          </p>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="py-16 px-4 bg-gray-50 animate-fade-in-up animation-delay-400">
        <div className="container mx-auto">
          <h2 className="text-4xl font-black text-center text-primary mb-12">
            Our Mission
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Natural Remedies Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-105 border border-gold/20 p-6 sm:p-8 group animate-fade-in-up card-hover-3d card-glow">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gold-gradient rounded-2xl flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary text-center mb-3 sm:mb-4">
                Natural Remedies
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed sm:leading-extra-relaxed">
                Discover the healing power of nature through proven herbal remedies, 
                nutritional guidance, and holistic approaches to wellness that support 
                the body's natural ability to heal.
              </p>
            </div>

            {/* Gospel Ministry Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-105 border border-gold/20 p-6 sm:p-8 group animate-fade-in-up card-hover-3d card-glow">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gold-gradient rounded-2xl flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary text-center mb-3 sm:mb-4">
                Gospel Ministry
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed sm:leading-extra-relaxed">
                Experience the life-changing message of hope, grace, and redemption. 
                Through Bible study, worship, and community fellowship, we share the 
                love of Christ that transforms hearts and restores souls.
              </p>
            </div>

            {/* Lifestyle Education Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-105 border border-gold/20 p-6 sm:p-8 group animate-fade-in-up card-hover-3d card-glow">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gold-gradient rounded-2xl flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary text-center mb-3 sm:mb-4">
                Lifestyle Education
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed sm:leading-extra-relaxed">
                Learn practical principles for healthy living through comprehensive 
                education on nutrition, exercise, stress management, and sustainable 
                lifestyle choices that promote long-term wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 bg-secondary text-white animate-fade-in-up animation-delay-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-gray-100 mb-8 leading-extra-relaxed">
            Whether you're seeking healing, want to serve, or need prayer support, 
            we welcome you to be part of this transformative journey. Together, we 
            can bring hope and restoration to communities near and far.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-6">
            <Link
              href="/contact"
              className="bg-gold hover:bg-gold-dark text-primary px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 ui-text w-full sm:w-auto btn-ripple"
            >
              Join the Mission
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-gold-light text-primary px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 border-2 border-gold hover:border-gold-dark ui-text w-full sm:w-auto btn-ripple"
            >
              Request Prayer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
