'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (gender && mbti) {
      router.push(`/survey?gender=${gender}&mbti=${mbti}`);
    } else {
      alert('성별과 MBTI를 모두 선택해주세요.');
    }
  };

  const mbtiList = [
    'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
    'INFP', 'INFJ', 'INTP', 'INTJ',
    'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
    'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 text-center bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">나의 MBTI 연애유형 찾기</h2>

      <div className="mb-4">
        <p className="mb-2 font-semibold">성별을 선택하세요</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-2 rounded-xl ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
          >여자</button>
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-2 rounded-xl ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >남자</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold">MBTI를 선택하세요</p>
        <select
          value={mbti}
          onChange={(e) => setMbti(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300"
        >
          <option value="">-- 선택 --</option>
          {mbtiList.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStart}
        className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl"
      >
        테스트 시작하기
      </button>
    </div>
  );
}
