

import Image from 'next/image';

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/homepage.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Title Image - Fixed */}
      <div
        className="w-[300px] sm:w-[420px] md:w-[520px] lg:w-[600px]"
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <Image
          src="/fallofvecna.png"
          alt="Fall of Vecna"
          width={600}
          height={300}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Content - Centered Vertically and Horizontally */}
      <div className="w-full max-w-[900px] text-center px-6">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold text-red-600">
          Step into the Upside Down for an immersive Stranger Things themed treasure hunt.
          Decode eerie clues, uncover hidden mysteries, and unite to stop Vecna before the
          gate tears open. This is Fall of Vecna—only the sharpest minds will survive.
        </p>
      </div>
    </div>
  );
}
