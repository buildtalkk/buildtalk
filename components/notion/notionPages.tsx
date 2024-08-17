'use client'; // CSR

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
  const Code = dynamic(
    () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
    {
      ssr: false,
    },
  );
  const Collection = dynamic(
    () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
    {
      ssr: false,
    },
  );
  const Equation = dynamic(
    () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
    {
      ssr: false,
    },
  );
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
      ssr: false,
    },
  );

  // fullPage는 노션의 헤더와 위계별 링크 기능까지 다 포함된 기능이다.
  return (<div>
      {/* <Link href="/">뒤로가기</Link> */}
      {/* <div>header</div> */}

    <NotionRenderer
    disableHeader
      recordMap={recordMap}
      fullPage
      mapPageUrl={(pageId) => `/change/${pageId}`} // 중첩 포스트 컬렉션들 클릭시 해당 url로 이동 되도록 설정
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        nextImage: Image,
        nextLink: Link
      }}
    />
    </div>
  );
}
