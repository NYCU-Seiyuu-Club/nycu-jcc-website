// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // TODO: 換成你自己的 GitHub 帳號！這裡先放範例值 "your-github-username"。
  site: 'https://your-github-username.github.io',
  // 若此 repo 名稱就是 <你的GitHub帳號>.github.io（使用者/組織首頁站台），請刪除或註解掉下面這行 base 設定；
  // 若是一般專案 repo（例如 nycu-jcc），則保留並改成你的 repo 名稱。
  base: '/nycu-jcc',
  integrations: [react()]
});