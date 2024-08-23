"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { Result } from "./result";

function ResultPage() {
  return (
    <ThemeProvider>
      <Navbar />
      <Suspense fallback="로딩스">
        <Result />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default ResultPage;
