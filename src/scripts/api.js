/**
 * @route GET `/info`
 * @returns `Promise` of possible API responses
 */
export async function getInfo(host) {
  try {
    const r = await fetch(`${host}/info`, { method: 'GET' });
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
export async function getGames(host) {
  try {
    const r = await fetch(`${host}/games`, { method: 'GET' });
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
