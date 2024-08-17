import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import NotionPage from '@/components/notion/notionPages';
import { ThemeProvider } from '@/components/theme-provider';
import { NotionAPI } from 'notion-client';
import { Suspense } from 'react';


const pageId = 'a1ebd71e01404b13aea9bdd7efb91271';
export const notion = new NotionAPI();



const Home = async () => {
  if (pageId) {
    try {
      const recordMap = await notion.getPage(pageId); // 2. 최상단 페이지 데이터 가져오기

      return (
           <ThemeProvider>
      <Navbar />
      <Suspense>
      <NotionPage recordMap={recordMap} />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>

      );
    } catch (error) {
      return console.error(error);
    }
  } else return <div>error</div>
};

export default Home;
