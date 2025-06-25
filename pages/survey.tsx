'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SurveyPage() {
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender');
  const mbti = searchParams.get('mbti');

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadQuestions = async () => {
      const res = await fetch(`/data/${gender}_survey_questions.json`);
      const data = await res.json();
      setQuestions(data.questions);
    };

    if (gender) loadQuestions();
  }, [gender]);

  const handleAnswer = (tag: string) => {
    const updated = [...answers, tag];
    setAnswers(updated);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      router.push(`/result?mbti=${mbti}&gender=${gender}&tags=${JSON.stringify(updated)}`);
    }
  };

  if (!questions.length) return <div className="text-center mt-10">문항 불러오는 중...</div>;
  const q = questions[current];

  return (
    <div className="max-w-md mx-auto mt-10 p-4 text-center">
      <div className="text-gray-500 mb-2">Q {current + 1} / {questions.length}</div>
      <h2 className="text-xl font-semibold mb-6">{q.question}</h2>
      <div className="grid gap-4">
        <button onClick={() => handleAnswer(q.A.tag)} className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-xl">
          {q.A.label}
        </button>
        <button onClick={() => handleAnswer(q.B.tag)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl">
          {q.B.label}
        </button>
      </div>
    </div>
  );
}
