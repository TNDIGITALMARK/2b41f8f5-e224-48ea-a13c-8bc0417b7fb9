import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ZyloProvider } from "@/lib/zylo/provider";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "StepMax - Premium Sneaker Store",
    template: "%s | StepMax",
  },
  description: "Discover the latest and greatest in athletic and lifestyle footwear. Shop top brands and exclusive releases from Nike, Jordan, Adidas, and more.",
  keywords: ["sneakers", "athletic shoes", "basketball shoes", "running shoes", "lifestyle sneakers", "Nike", "Jordan", "Adidas"],
  openGraph: {
    title: "StepMax - Premium Sneaker Store",
    description: "Discover the latest and greatest in athletic and lifestyle footwear.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <QueryProvider>
          <ZyloProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <CartProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </CartProvider>
            </ThemeProvider>
          </ZyloProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
