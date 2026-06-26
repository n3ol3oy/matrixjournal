const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('styles.css','utf8');
const js=fs.readFileSync('app.js','utf8');
const bundled=html.replace('<link rel="stylesheet" href="styles.css" />',`<style>\n${css}\n</style>`).replace('<script src="app.js"></script>',`<script>\n${js}\n</script>`);
fs.mkdirSync('dist',{recursive:true});
fs.writeFileSync('dist/matrixjournal-single.html',bundled);
console.log('Wrote dist/matrixjournal-single.html');
