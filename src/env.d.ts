/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EDAMAM_FOOD_APP_ID: string;
  readonly VITE_EDAMAM_FOOD_APP_KEY: string;
  readonly VITE_EDAMAM_NUTRITION_APP_ID: string;
  readonly VITE_EDAMAM_NUTRITION_APP_KEY: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
