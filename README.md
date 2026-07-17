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

> 版本更新時請記得同步修改本表格，以及 `package.json` 的 `"packageManager"` 欄位。

## 專案結構

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml     # 推送到 main 分支時自動 build 並部署到 GitHub Pages
├── public/                 # 靜態資源（圖片、favicon 等）
├── src/
│   └── pages/
│       └── index.astro     # 首頁，Astro 依 src/pages/ 內的檔案自動產生路由
├── astro.config.mjs         # Astro 設定（含 GitHub Pages 的 site / base）
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json            # TypeScript strict 設定
```

Astro / React / Vue / Svelte 元件習慣放在 `src/components/`（尚未建立，之後依需求新增）。

## 本機開發

```sh
pnpm install   # 安裝依賴
pnpm dev       # 啟動本機開發伺服器（預設 http://localhost:4321）
pnpm build     # 建置正式版靜態網站到 ./dist/
pnpm preview   # 在本機預覽 build 後的結果
```

## 部署到 GitHub Pages

本專案使用官方的 [`withastro/action`](https://github.com/withastro/action)，推送到 `main` 分支時會自動建置並部署到 GitHub Pages（設定於 `.github/workflows/deploy.yml`）。

部署前請務必完成以下設定：

1. **修改 `astro.config.mjs`**
   - 將 `site` 換成你自己的 GitHub Pages 網址，例如：`https://<你的GitHub帳號>.github.io`
   - 若這個 repo 的名稱就是 `<你的GitHub帳號>.github.io`（帳號/組織首頁站台），請把 `base: '/nycu-jcc'` 這行刪除或註解掉；若是一般專案 repo（例如目前的 `nycu-jcc`），請保留並確認 `base` 的值等於 repo 名稱。

2. **在 GitHub repo 開啟 Pages 部署來源**
   - 到 repo 的 **Settings → Pages**
   - 在 **Source** 選擇 **GitHub Actions**

3. **推送到 `main` 分支**
   - GitHub Actions 會自動觸發 `.github/workflows/deploy.yml`，安裝依賴、build，並部署到 GitHub Pages
   - 可以在 repo 的 **Actions** 頁籤查看部署進度與結果
