import { getGames } from './api';

const gamesPrivate = document.querySelector('span#private-games') as HTMLSpanElement;
const gamesPublic = document.querySelector('span#public-games') as HTMLSpanElement;
const gamesPublicList = document.querySelector('tbody#public-games-list') as HTMLTableSectionElement;
const gameTemplate = document.querySelector('template#game') as HTMLTemplateElement;
const copyConfirmation = document.querySelector('div#copy-confirmation') as HTMLDivElement;

(async () => {
  const res = await getGames();
  if (res.ok && res.data) {
    gamesPrivate.textContent = String(res.data.private);
    gamesPublic.textContent = String(res.data.public.length);
    if (Object.keys(res.data.public).length > 0) {
      gamesPublicList.innerHTML = "";
      for (const game of res.data.public) {
        const clone = gameTemplate.content.cloneNode(true) as HTMLElement;
        (clone.querySelector('span.id') as HTMLSpanElement).textContent = game.id;
        (clone.querySelector('button.copy') as HTMLButtonElement).addEventListener('click', () => {
          navigator.clipboard.writeText(game.id);
          copyConfirmation.classList.remove('hidden');
          setTimeout(() => copyConfirmation.classList.add('hidden'), 2000);
        });
        (clone.querySelector('span.players') as HTMLSpanElement).textContent = String(game.players);
        (clone.querySelector('a.spectate') as HTMLAnchorElement).setAttribute('href', '/spectate?gameId=' + game.id);
        gamesPublicList.appendChild(clone);
      }
    }
  }
})();
