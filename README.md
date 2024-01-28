# my electron-vite-vue

🥳 Really simple `Electron` + `Vue` + `Vite` boilerplate.

## Quick Setup

更新： Geeker-Admin:
https://github.com/HalseySpicy/Geeker-Admin.git
更新: electron-vite-vue
https://github.com/electron-vite/electron-vite-vue.git

# enter the project directory
cd Geeker-Admin

# install dependency
pnpm install

# develop
pnpm dev
# build
pnpm build
```

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```
