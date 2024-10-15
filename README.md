Another version of SREC platform building for Huawei Developer Competition 2024

# PROJECT STRUCTRURE

```
└── 📁srec-frontend
    └── 📁public
        └── vite.svg
    // main folder
    └── 📁src 
        └── 📁assets // media files
            └── react.svg
        └── 📁componens 
            // self-created components
            └── 📁Button
                └── Button.tsx
            // shadcn components ( you can modify it base on your needs)
            └── 📁ui
                └── button.tsx
                └── sonner.tsx
        // custom hooks
        └── 📁hooks
        // layouts for different types of pages
        └── 📁layouts
            └── 📁RootLayout
                └── RootLayout.tsx
        └── 📁lib
            └── utils.ts
        // types for components, table columns,...
        └── 📁models
            ├── Button
        // pages for router 
        └── 📁pages
            └── 📁Home
                └── Home.tsx
        // config react-router
        └── 📁router
            └── router.tsx
            └── routerConfig.ts
        // utility variable, function, ...
        └── 📁utils
            └── constant.ts
            └── data.ts
            └── ip.ts
        └── App.css
        // using router inside App, removed Strict mode for better development environment
        └── App.tsx
        // global css
        └── index.css
        └── main.tsx
        └── vite-env.d.ts
    └── .env
    └── .gitignore
    └── components.json
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── README
    └── README.md
    // add more theme variable for tailwind
    └── tailwind.config.js
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```
