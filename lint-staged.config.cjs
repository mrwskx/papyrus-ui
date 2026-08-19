module.exports = {
  '*.(js|ts|tsx)': ['pnpm lint:fix'],
  '*.(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',
};
