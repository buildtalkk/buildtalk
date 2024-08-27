"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Search } from "@/components/ui/search";
import { StateProvider } from "@/store/StateContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <StateProvider>
        <Navbar />
        <Suspense fallback="로딩스">
          <section
            id="howItWorks"
            className="container text-center py-12 sm:py-16"
          >
            <Breadcrumb />
            <div className="mb-10">
              <Search />
            </div>
            {children}
          </section>
        </Suspense>
        <Footer />
        <ScrollToTop />
      </StateProvider>
    </ThemeProvider>
  );
};

export default Layout;
