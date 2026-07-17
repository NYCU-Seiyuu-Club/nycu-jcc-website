// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 自訂網域跑在網域根目錄，所以不設 base。
  // 一旦 Settings → Pages → Custom domain 設定並驗證 jcc.nycu.cc 成功，
  // GitHub Pages 會自動把 https://nycu-seiyuu-club.github.io/nycu-jcc-website/ 轉址過來，兩個網址都能用。
  site: 'https://jcc.nycu.cc',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});