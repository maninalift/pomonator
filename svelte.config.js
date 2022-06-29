import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
            $components: path.resolve('./src/components')
            //$actions: path.resolve('./src/lib/actions'),
            //$common: path.resolve('./src/lib/common'),
            //$stores: path.resolve('./src/lib/stores'),
        },
	}
};

export default config;
