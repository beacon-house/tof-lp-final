// Section F - Results section with navy background proven results area and comparison data
import React from 'react'
import { Section } from '../Section'

export const ResultsSection: React.FC = () => {
  const comparisonData = [
    {
      university: 'Harvard',
      otherStudents: 3,
      ourStudents: 15,
      multiplier: '4.3X'
    },
    {
      university: 'Oxford',
      otherStudents: 9,
      ourStudents: 29,
      multiplier: '3.2X'
    },
    {
      university: 'Cambridge',
      otherStudents: 11,
      ourStudents: 36,
      multiplier: '3.3X'
    },
    {
      university: 'MIT',
      otherStudents: 4,
      ourStudents: 21,
      multiplier: '5.4X'
    }
  ]

  const stats = [
    {
      number: '150+',
      description: 'Former Ivy League Admissions Officers as Counsellors',
      icon: (
        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      )
    },
    {
      number: '$4 Mn+',
      description: 'Scholarships Secured',
      icon: (
        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      number: '100%',
      description: 'Guaranteed Research & Internship Placements',
      icon: (
        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    },
    {
      number: '99%',
      description: 'Family Satisfaction Rate',
      icon: (
        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  return (
    <>
      {/* Navy Background Section - Proven Results */}
      <Section id="results" background="navy" className="relative py-8 md:py-12">
        {/* Main Heading */}
        <h2 className="font-serif text-lg md:text-3xl lg:text-4xl text-white mb-4 md:mb-5 leading-tight text-center font-semibold">
          Proven Results
        </h2>

        {/* Subheading */}
        <p className="font-serif text-base md:text-xl lg:text-2xl text-white/90 mb-4 md:mb-8 leading-relaxed text-center max-w-3xl mx-auto font-medium">
          When clarity and effort come together, great outcomes follow naturally.
        </p>

        {/* Stats Section with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-3 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 md:mb-5">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2">
                {stat.number}
              </div>
              <p className="text-sm md:text-base text-navy/70 leading-snug font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* White Background Section - Comparison Data */}
      <Section id="comparison" className="relative">
        {/* Main Heading */}
        <h2 className="font-serif text-lg md:text-3xl lg:text-4xl text-navy mb-3 md:mb-4 leading-tight text-center font-semibold">
          Your Odds Of Admission, <span className="relative inline-block px-3 py-1 bg-goldLight/30 rounded">Multiplied By 5x</span>
        </h2>

        {/* Subheading */}
        <p className="font-serif text-base md:text-lg lg:text-xl text-navy/70 mb-6 md:mb-8 leading-relaxed text-center max-w-3xl mx-auto">
          Here's a comparison of the university selection rates of other students vs our students
        </p>

        {/* Comparison Cards */}
        <div className="w-full mb-6 md:mb-8">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-4 w-full">
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gold/10 rounded-2xl p-5 md:p-4 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                {/* University Name */}
                <h3 className="text-xl md:text-lg font-bold text-navy mb-4 md:mb-3">
                  {item.university}
                </h3>

                {/* Other Students */}
                <div className="mb-4 md:mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xs text-navy/60 font-medium">Other Students</span>
                    <span className="text-sm md:text-xs font-semibold text-navy/70">
                      {item.otherStudents} out of 100
                    </span>
                  </div>
                  <div className="w-full bg-gray50 rounded-full h-2.5">
                    <div
                      className="bg-navy/40 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.otherStudents}%` }}
                    ></div>
                  </div>
                </div>

                {/* Our Students */}
                <div className="mb-4 md:mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xs text-navy/60 font-medium">Our Students</span>
                    <span className="text-sm md:text-xs font-semibold text-navy">
                      {item.ourStudents} out of 100
                    </span>
                  </div>
                  <div className="w-full bg-gray50 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-gold to-goldLight h-2.5 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${item.ourStudents}%` }}
                    ></div>
                  </div>
                </div>

                {/* Success Rate Badge */}
                <div className="flex justify-center mt-4 md:mt-3">
                  <span className="inline-block bg-navy/5 text-navy text-sm md:text-xs font-semibold px-4 py-1.5 md:py-1 rounded-full">
                    {item.multiplier} Higher
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cursive Closing Line */}
        <div className="text-center">
          <p className="text-base md:text-2xl lg:text-3xl text-navy font-serif font-medium">
            <span className="cursive-keyword">Clarity</span> → <span className="cursive-keyword">Direction</span> → <span className="cursive-keyword">Outcomes</span>.
          </p>
        </div>
      </Section>
    </>
  )
}
