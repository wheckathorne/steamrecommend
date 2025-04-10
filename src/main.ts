import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)
const SteamRecommendsPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}'
    }
  }
});

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: SteamRecommendsPreset,
    options: {
      darkModeSelector: 'none',
    }
  }
});
app.mount('#app')
