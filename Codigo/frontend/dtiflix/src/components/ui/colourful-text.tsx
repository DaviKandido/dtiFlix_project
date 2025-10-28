"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({ text }: { text: string }) {
  const colors = [
    "rgb(180, 215, 255)", // Azul muito claro (Quase pastel)
    "rgb(140, 190, 255)", // Azul Claro Suave
    "rgb(100, 165, 255)", // Azul Médio Claro
    "rgb(70, 135, 255)", // Azul Brilhante
    "rgb(40, 100, 255)", // Azul Vivo
    "rgb(0, 80, 255)", // Azul Primário
    "rgb(0, 60, 220)", // Azul Escuro Suave
    "rgb(0, 45, 180)", // Azul Profundo
    "rgb(0, 30, 140)", // Azul Marinho Claro
    "rgb(0, 15, 100)", // Azul Marinho Profundo
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre font-sans tracking-tight"
    >
      {char}
    </motion.span>
  ));
}
