import { useEffect, useState } from 'react';

type AboutPoemProps = {
  poems: string[][];
};

export default function AboutPoem({ poems }: AboutPoemProps) {
  const [lines, setLines] = useState(poems[0]);

  useEffect(() => {
    setLines(poems[Math.floor(Math.random() * poems.length)]);
  }, [poems]);

  return (
    <div className="neon-poem mx-auto mt-40 mb-16 max-w-4xl space-y-2 text-3xl font-normal leading-relaxed tracking-[0.2em] sm:text-4xl">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
