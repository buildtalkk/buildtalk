"use client";

import { NotionRenderer } from "react-notion-x";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Modal } from "react-notion-x/build/third-party/modal";
// const notion = new NotionAPI();

interface RendererProps {
  recordMap: any; // 임의로 any
  rootPageId: string;
}

// const pageId = '8346b5e103cf45079f8fd0e3e41b7ef5';

export const Renderer = ({ recordMap, rootPageId }: RendererProps) => {
  return (
    <div className="notion__container">
      {/* <Link href="/">헤더 뒤로가기</Link> */}
      <NotionRenderer
        disableHeader
        mapPageUrl={pageId => `/about/${pageId}`}
        components={{
          Collection,
          Modal,
        }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        previewImages
      />
    </div>
  );
};

// export async function getStaticPaths() {
//   const mapPageUrl = defaultMapPageUrl(process.env.NEXT_PUBLIC_NOTION_ID);
//   const pages = await getAllPagesInSpace(
//     process.env.NEXT_PUBLIC_NOTION_ID,
//     null,
//     notion.getPage,
//     {
//       traverseCollections: false,
//     }
//   );

//   const paths = Object.keys(pages)
//     .map((pageId) => mapPageUrl(pageId))
//     .filter((path) => path && path !== "/");

//   // fallback 설정을 true로 해줌으로써 혹시 전 단계에서 경로를 세팅하지 못했더라도 불러올수 있도록 설정
//   return {
//     paths,
//     fallback: true,
//   };
// }

export default Renderer;
