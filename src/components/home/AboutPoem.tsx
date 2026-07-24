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
    <div className="flex min-h-[calc(100vh_-_6rem)] items-center justify-center">
      <div className="neon-poem mx-auto w-full max-w-4xl space-y-2 [container-type:inline-size] text-center font-normal leading-relaxed tracking-[0.2em]">
        {lines.map((line, i) => (
          <p key={i} className="whitespace-nowrap text-[4cqi]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
