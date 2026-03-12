import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
        preview: {
            port: 3002,
            host: '0.0.0.0',
            strictPort: true,
            allowedHosts: ['david-duhem.ovh'],
        }
});
