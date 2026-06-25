# 性癖倾向问卷

一个基于 React + Vite 的成年人自评问卷网站，结果以雷达图展示不同成人向偏好维度。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages 部署

仓库推送到 GitHub 后，在仓库设置中进入 `Settings > Pages`，将 `Build and deployment` 的 Source 设置为 `GitHub Actions`。

之后每次推送到 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并部署 `dist`。
