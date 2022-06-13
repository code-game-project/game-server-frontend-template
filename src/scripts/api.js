/**
 * @route GET `/info`
 * @returns `Promise` of possible API responses
 */
export async function getInfo() {
  try {
    const r = await fetch(`/info`, { method: 'GET' });
    try {
      return { ok: r.ok, data: await r.json() };
    } catch (e) {
      return { ok: r.ok };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, networkError: true };
  }
}

/**
 * @route GET `/games`
 * @returns `Promise` of possible API responses
 */
export async function getGames() {
  try {
    const r = await fetch(`/games`, { method: 'GET' });
    try {
      return { ok: r.ok, data: await r.json() };
    } catch (e) {
      return { ok: r.ok };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, networkError: true };
  }
}
