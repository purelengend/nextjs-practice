import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";

// components
import { Footer, Header } from "@/components";

// Constants
import { DESTINATION, TOAST_COLORS } from "@/constants";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - School Course App",
    default: "Course List - School Course App ",
  },
  description: "The collection page of all available courses",
  metadataBase: new URL(
    `https://nextjs-practice-eosin-beta.vercel.app/${DESTINATION.PRODUCT}`,
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <div className="max-w-8xl mx-auto my-0 2xl:bg-mini-hero-block bg-no-repeat">
            <Header />

            <Toaster
              position="bottom-center"
              toastOptions={{
                success: {
                  style: {
                    background: TOAST_COLORS.SUCCESS,
                  },
                },
                error: {
                  style: {
                    background: TOAST_COLORS.ERROR,
                  },
                },
                style: {
                  color: "white",
                },
              }}
            />

            {children}

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
