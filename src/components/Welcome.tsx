import { useState } from 'react';

export default function Welcome() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>歡迎來到國立陽明交通大學 日本文化研究社！</p>
      <button onClick={() => setCount(count + 1)}>
        已點擊 {count} 次（React island 測試）
      </button>
    </div>
  );
}
