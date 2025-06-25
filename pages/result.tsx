'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const [result, setResult] = useState<any>(null);
  const searchParams = useSearchParams();
  const mbti = searchParams.get('mbti');
  const gender = searchParams.get('gender');
  const tags = JSON.parse(searchParams.get('tags') || '[]');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch('https://mbti-5b4i.onrender.com/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mbti, gender, tags }),
        });
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error('분석 에러:', error);
      }
    };

    fetchResult();
  }, []);

  if (!result) return <div className="text-center mt-10">분석 중...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow bg-white text-center">
      <h2 className="text-3xl font-bold text-pink-600">{result.title}</h2>
      <p className="mt-4 text-gray-700 whitespace-pre-line">{result.description}</p>
      <div className="mt-6">
        <strong className="text-gray-600">잘 맞는 MBTI:</strong>
        <div className="mt-1 text-lg">{result.match_mbti?.join(', ')}</div>
      </div>
      <div className="mt-6">
        <img
          src={`/images/${result.image}`}
          alt="결과 이미지"
          className="w-40 h-40 mx-auto rounded-full"
        />
      </div>
    </div>
  );
}
