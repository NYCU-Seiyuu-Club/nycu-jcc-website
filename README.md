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
├── public/                   # 靜態資源（logo、favicon、CNAME 等）
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # 導覽列（首頁為滾動淡入的 overlay 樣式，其他頁面為固定顯示）
│   │   └── Hero.tsx          # 首頁滿版背景區塊
│   ├── layouts/
│   │   └── BaseLayout.astro  # 共用版型，引入全域樣式與 Navbar
│   ├── pages/
│   │   ├── index.astro       # Home
│   │   ├── members.astro     # Members
│   │   ├── about.astro       # About
│   │   ├── blog.astro        # Blog
│   │   └── announce.astro    # Announce
│   └── styles/
│       └── global.css        # Tailwind 進入點
├── astro.config.mjs           # Astro 設定（含自訂網域用的 site）
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json              # TypeScript strict 設定
```

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
