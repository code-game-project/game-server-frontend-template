import { getInfo } from './api';

const title = document.querySelector('h1#title') as HTMLHeadingElement;
const navRepository = document.querySelector('a#nav-repository') as HTMLAnchorElement;
// not really header but close enough
const aboutDescription = document.querySelector('p#about-description');

(async () => {
  const res = await getInfo();
  if (res.ok && res.data) {
    const { name, display_name, description, version, repository_url } = res.data;
    title.textContent = (display_name || name) + (version ? ' v' + version : '');
    document.title = (display_name || name) + ' - CodeGame';
    console.log(repository_url);
    repository_url ?
      navRepository.setAttribute('href', repository_url) :
      navRepository.setAttribute('style', 'display: none');
    aboutDescription && description && (aboutDescription.textContent = description);
  } else {
    navRepository.setAttribute('style', 'display: none');
  }
})();
