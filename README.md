# 1. About the project
- New version of SREC platform built for Huawei Competition

# 2. Project structure
```
└── 📁srec-frontend
    └── 📁public
        └── vite.svg
            // main folder
    └── 📁src
        └── 📁assets // media files
            └── 📁fonts
            └── 📁images
            └── react.svg
        └── 📁components
            // self-created components
            └── 📁RootFooter
                └── RootFooter.tsx
            └── 📁RootNavBar
                └── RootNavBar.tsx
            ...
            // shadcn components ( you can modify it base on your needs)
            └── 📁ui
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
            └── 📁About
                └── About.tsx
            └── 📁Contact
                └── Contact.tsx
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
    └── README.md
    // add more theme variable for tailwind
    └── tailwind.config.js
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```
