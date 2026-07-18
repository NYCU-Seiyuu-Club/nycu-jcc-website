# 國立陽明交通大學 日本文化研究社

以 [Astro](https://astro.build) + [React](https://react.dev) 建構的社團網站，部署於 GitHub Pages。網站網址為 https://jcc.nycu.cc。

## 版本紀錄

| 項目 | 版本 |
| :--- | :--- |
| Node 版本管理工具 | fnm 1.38.1 |
| Node | v23.11.1 |
| 套件管理工具 | pnpm 11.13.1（透過 `corepack enable` + `corepack prepare pnpm@latest --activate` 啟用） |
| astro | 7.1.0 |
| react | 19.2.7 |
| react-dom | 19.2.7 |
| @astrojs/react | 6.0.1 |
| tailwindcss | 4.3.3 |
| framer-motion | 12.42.2 |
| lucide-react | 1.24.0 |

> 版本更新時請記得同步修改本表格，以及 `package.json` 的 `"packageManager"` 欄位。

## 專案結構

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml       # 推送到 main 分支時自動 build 並部署到 GitHub Pages
├── public/                   # 靜態資源（logo、favicon、CNAME、members 大頭照等）
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # 導覽列（全站共用，首頁為滾動淡入的 overlay 樣式，其他頁面固定顯示）
│   │   ├── icons/            # 共用 icon（SocialIcons 給多個頁面的社群連結用）
│   │   ├── home/              # 只給 pages/index.astro、pages/about.astro 用
│   │   ├── groups/             # 只給 pages/groups/** 用
│   │   ├── members/            # 只給 pages/members.astro 用
│   │   └── special-thanks/     # 只給 pages/special-thanks/** 用
│   ├── data/
│   │   ├── about.ts          # About 文案、標語儲存庫、分組介紹（含相簿、組長 slug）、社群連結
│   │   ├── activities.ts     # 首頁 Activities 區塊內容
│   │   ├── announcements.ts  # 公告列表
│   │   ├── honor_members.ts  # 歷屆幹部（含組別定義 MEMBER_GROUPS）與其詳細資料
│   │   └── members.ts        # 一般社員名單
│   ├── layouts/
│   │   └── BaseLayout.astro  # 共用版型，引入全域樣式與 Navbar
│   ├── lib/
│   │   ├── constants.ts        # 共用常數（如加入我們連結）
│   │   └── honorMembersView.ts # 把跨屆的幹部資料依 slug 合併成單一視圖
│   ├── pages/
│   │   ├── index.astro                     # Home
│   │   ├── about.astro                     # About（社團介紹＋標語）
│   │   ├── groups/index.astro              # Groups（預設顯示第一組）
│   │   ├── groups/[slug].astro             # Groups（指定組別，靜態產生四頁）
│   │   ├── members.astro                   # Members
│   │   ├── announce.astro, announce/[slug].astro   # Announce 列表與單篇
│   │   ├── special-thanks/**               # 歷屆幹部瀏覽器（依屆別／個人）
│   │   └── blog.astro                      # Blog
│   └── styles/
│       └── global.css        # Tailwind 進入點 + 霓虹文字等自訂 CSS
├── astro.config.mjs           # Astro 設定（含自訂網域用的 site）
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json              # TypeScript strict 設定
```

`components/` 底下的子資料夾對應到會用到它的頁面（例如 `components/groups/GroupsBrowser.tsx` 只有 `pages/groups/**` 會 import）；只有 `Navbar.tsx`（全站共用）跟 `icons/`（被多個頁面共用的 icon）留在根目錄。加新元件時，先看它只給哪個頁面用，就放進對應資料夾；如果之後被第二個頁面重用，再考慮搬到根目錄或抽成共用資料夾。

## 本機開發

```sh
pnpm install   # 安裝依賴
pnpm dev       # 啟動本機開發伺服器（預設 http://localhost:4321）
pnpm build     # 建置正式版靜態網站到 ./dist/
pnpm preview   # 在本機預覽 build 後的結果
```

## 部署

本專案使用官方的 [`withastro/action`](https://github.com/withastro/action)，推送到 `main` 分支時會自動建置並部署到 GitHub Pages（設定於 `.github/workflows/deploy.yml`），可以在 repo 的 **Actions** 頁籤查看部署進度與結果。

本站使用自訂網域 `jcc.nycu.cc`（DNS 指向 `nycu-seiyuu-club.github.io`），`astro.config.mjs` 的 `site` 設為 `https://jcc.nycu.cc`，自訂網域跑在網域根目錄所以不需要 `base`。`public/CNAME` 內容為 `jcc.nycu.cc`，build 時會一併輸出到 `dist/CNAME`，GitHub Pages 靠這個檔案辨識綁定的網域。
