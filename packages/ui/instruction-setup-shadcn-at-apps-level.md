step 1:

components.json at apps

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css", // important
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@lewora/ui/lib/utils", // important
    "ui": "@lewora/ui/components/ui" // important
  }
}
```

step 2:

tsconfig.json at apps

```json
{
  "compilerOptions": {
    "paths": {
      ...
      "@lewora/ui/*": ["../../packages/ui/src/*"] // important
    }
  }
}
```

step 3:
Now you can `pnpm dlx shadcn@latest add button` at apps/_ then the components will be added to the packages/ui/_ directory.
