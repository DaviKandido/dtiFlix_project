/**
 * @file checkImageSrc.ts
 * @description Função utilitária para verificar se uma URL de imagem é válida
 * e retornar um fallback seguro caso contrário.
 */

import axios from "axios";

// Define o caminho para a imagem de fallback
const FALLBACK_IMAGE_PATH: string = "/404-img.jpg";

/**
 * Verifica se a string de origem (src) da imagem é válida.
 * * Verifica os seguintes casos de erro/ausência de dados:
 * 1. O valor é null ou undefined.
 * 2. O valor é uma string vazia ("").
 * 3. O valor é a string "N/A" (comumente usada em APIs de filmes).
 * 4. O valor não se parece minimamente com uma URL (ex: não contém 'http').
 *
 * @param src A string de origem da imagem (URL ou caminho).
 * @returns A URL de imagem validada ou o caminho do fallback.
 */
export function checkImageSrc(src: string | null | undefined): string {

  if (!src || src.trim() === "") {
    return FALLBACK_IMAGE_PATH;
  }


  const normalizedSrc = src.trim().toLowerCase();


  if (
    normalizedSrc === "n/a" ||
    normalizedSrc === "N/A" ||
    normalizedSrc === "na" ||
    normalizedSrc === "null"
  ) {
    return FALLBACK_IMAGE_PATH;
  }


  if (normalizedSrc.includes("http") || normalizedSrc.includes("https")) {
    return src;
  }else{
    return FALLBACK_IMAGE_PATH
  }

}
