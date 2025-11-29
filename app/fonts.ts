import localFont from "next/font/local";

export const futura = localFont({
  src: [
    {
      path: "./fonts/FUTURAMEDIUMBT.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/FUTURAMEDIUMITALICBT.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-futura",
  display: "swap",
});

export const righteous = localFont({
  src: "./fonts/RIGHTEOUS-REGULAR.otf",
  weight: "400",
  style: "normal",
  variable: "--font-righteous",
  display: "swap",
});
