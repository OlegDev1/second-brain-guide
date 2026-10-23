import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { contentIndex } from './config/content-index.js';

export default defineConfig({
	plugins: [contentIndex(), sveltekit()]
});
