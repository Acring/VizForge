'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function StorybookPage() {
  const searchParams = useSearchParams();
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    // 基础URL
    const baseUrl = 'http://localhost:3000/storybook-static/index.html';

    // 获取所有URL参数
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    // 构建完整URL
    const fullUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

    setIframeUrl(fullUrl);
  }, [searchParams]);

  return (
    <div className="w-full h-[100vh]">
      <Navbar currentPath="/storybook" />
      <iframe className="w-full h-full" src={iframeUrl}></iframe>
    </div>
  );
}
