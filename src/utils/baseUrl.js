// This one line only works when Vite builds the app - Jest can't parse
// `import.meta` at all. We isolate it here so Jest can swap in a safe
// fake version for this one file during tests (see jest.config.cjs).
export const BASE_URL = import.meta.env.BASE_URL;