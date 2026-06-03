const esbuild = require('esbuild');

const isDev = process.argv.includes('--watch');

const common = {
  bundle: true,
  sourcemap: isDev,
  minify: !isDev,
  loader: {
    '.otf': 'file',
    '.woff2': 'file',
  },
};

async function build() {
  const cssCtx = await esbuild.context({
    ...common,
    entryPoints: [{ in: 'css/styles.css', out: 'jds' }],
    outdir: 'dist',
  });

  const jsCtx = await esbuild.context({
    ...common,
    entryPoints: [{ in: 'js/index.js', out: 'jds' }],
    outdir: 'dist',
  });

  if (isDev) {
    await Promise.all([cssCtx.watch(), jsCtx.watch()]);
    console.log('Watching for changes...');
  } else {
    await Promise.all([cssCtx.rebuild(), jsCtx.rebuild()]);
    await Promise.all([cssCtx.dispose(), jsCtx.dispose()]);
    console.log('Built dist/');
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
