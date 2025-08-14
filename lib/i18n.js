export async function getTranslation(lang, key) {
  let data = {};
  try {
    const module = await import(`../locales/${lang}/global.json`);
    data = module.default || module;
  } catch (err) {
    console.error('Cannot load translation', err);
  }
  return data[key] || {};
}
