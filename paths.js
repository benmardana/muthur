require('tsconfig-paths').register({
  baseUrl: require('./tsconfig.json').compilerOptions.outDir,
  paths: require('./tsconfig.json').compilerOptions.paths,
});
