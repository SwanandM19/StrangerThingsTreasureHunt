import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Background – fixed layer so image is stable on all viewports */}
      <div
        className="page-bg"
        style={{ backgroundImage: "url('/homepage.png')" }}
        aria-hidden
      />

      {/* Centered content – scrolls on small screens if needed */}
      <div className="flex-1 min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-12 overflow-y-auto">
        <div className="w-full max-w-[900px] flex flex-col items-center text-center gap-6 sm:gap-8 md:gap-10">
          <div
            className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px] xl:w-[560px] flex-shrink-0"
          >
            <Image
              src="/fallofvecna.png"
              alt="Fall of Vecna"
              width={600}
              height={300}
              priority
              className="w-full h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight font-extrabold text-red-500 max-w-[85ch]"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6), 0 0 40px rgba(139,0,0,0.3)',
            }}
          >
            Step into the Upside Down for an immersive Stranger Things themed treasure hunt.
            Decode eerie clues, uncover hidden mysteries, and unite to stop Vecna before the
            gate tears open. This is Fall of Vecna—only the sharpest minds will survive.
          </p>
        </div>
      </div>
    </div>
  );
}
