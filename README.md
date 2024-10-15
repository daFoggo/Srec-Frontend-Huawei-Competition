VITE + REACT + TAILWIND + SHADCN PROJECT STRUCTRURE SETUP

# 1. PROJECT STRUCTRURE

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

# 2. WHAT IS INSIDE
- The project is build for Vite + ReactTS + Tailwind + Shadcn
- And it also contain some basic library for needs like :
    - react-router-dom
    - axios 
    - framer-motion ( if you want to make animation for components )
- I also provided some reuseable custom Shadcn components like :
    - CRUD Table
    - TimePicker
    - ParticleTS

# 3. INSTALLATION 
- Clone the project
- run "npm install"
- run "npm run dev" to check


