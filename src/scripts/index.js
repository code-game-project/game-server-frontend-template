import { getGames } from './api';

const gamesPrivate = document.querySelector('span#private-games');
const gamesPublic = document.querySelector('span#public-games');
const gamesPublicList = document.querySelector('tbody#public-games-list');
const gameTemplate = document.querySelector('template#game');
const copyConfirmation = document.querySelector('div#copy-confirmation');

(async () => {
  const res = await getGames();
  if (res.ok && res.data) {
    gamesPrivate.textContent = String(res.data.private);
    gamesPublic.textContent = String(res.data.public.length);
    if (res.data.public.length > 0) {
      gamesPublicList.innerHTML = "";
      for (const game of res.data.public) {
        const clone = gameTemplate.content.cloneNode(true);
        clone.querySelector('span.id').textContent = game.id;
        clone.querySelector('button.copy').addEventListener('click', () => {
          navigator.clipboard.writeText(game.id);
          copyConfirmation.classList.remove('hidden');
          setTimeout(() => copyConfirmation.classList.add('hidden'), 2000);
        });
        clone.querySelector('span.players').textContent = game.players;
        clone.querySelector('a.spectate').setAttribute('href', '/spectate?gameId=' + game.id);
        gamesPublicList.appendChild(clone);
      }
    }
  }
})();
