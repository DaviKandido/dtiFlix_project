"use client";
import ColourfulText from "@/components/ui/colourful-text";
import { RippleButton } from "@/components/ui/ripple-button";
import Image from "next/image";
import Link from "next/link";;

export default function DtiFlixIntro() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      <Image
        src="/homeBackground.png"
        className="h-full w-full object-cover absolute inset-0 opacity-100 blur-sm pointer-events-none "
        width={1920} 
        height={1080}
        alt="Background cinematográfico"
        priority 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80 z-10"></div>
      <div className="flex flex-col items-center relative z-20 px-4">

        <h1
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl 
                     font-extrabold text-center text-white 
                     relative font-sans 
                     drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] 
                     tracking-tight 
                     "
        >
          Seu Próximo <ColourfulText text="Vício" />
          <br /> Começa Agora.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium text-center max-w-xl">
          A maior coleção de filmes e séries, com a qualidade de imagem que você
          merece.
        </p>

        <div className="mt-12">
          <Link href="/Home" passHref>
            <RippleButton
              className="
                bg-[#1D4ED8] hover:bg-[#1E40AF]
                text-white 
                py-4 px-10 
                rounded-full
                shadow-lg shadow-[#1D4ED8]/50 
                transition duration-300 ease-in-out
              "
              rippleColor="#FFFFFF" // Efeito ripple branco
              onClick={() => {}}
            >
              Começar a Maratona!
            </RippleButton>
          </Link>
        </div>
      </div>
    </div>
  );
}