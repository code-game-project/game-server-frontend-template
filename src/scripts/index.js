import { getInfo, getGames } from './api';

const title = document.querySelector('h1#title');
const navRepository = document.querySelector('a#nav-repository');
const aboutDescription = document.querySelector('p#about-description');
const gamesPrivate = document.querySelector('span#private-games');
const gamesPublic = document.querySelector('span#public-games');
const gamesPublicList = document.querySelector('tbody#public-games-list');
const gameTemplate = document.querySelector('template#game');
const copyConfirmation = document.querySelector('div#copy-confirmation');

(async () => {
  const res = await getInfo('http://localhost:8080');
  if (res.ok && res.data) {
    const { name, display_name, description, version, repository_url } = res.data;
    title.textContent = (display_name || name) + (version ? ' v' + version : '');
    document.title = (display_name || name) + ' - CodeGame';
    repository_url ?
      navRepository.setAttribute('href', repository_url) :
      navRepository.setAttribute('display', 'none');
    description && (aboutDescription.textContent = description);
  }
})();

(async () => {
  const res = await getGames('http://localhost:8080');
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
