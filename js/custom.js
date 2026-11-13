document.addEventListener('DOMContentLoaded', function () {
  const linkElement = document.querySelector('.post-copyright__type');
  if (linkElement) {
    linkElement.remove();
  }

  bindProjectTimelineCards();
});

document.addEventListener('pjax:complete', bindProjectTimelineCards);

function bindProjectTimelineCards() {
  const cards = document.querySelectorAll('.project-timeline figure.gallery-group');

  cards.forEach(function (card) {
    const link = card.querySelector('figcaption a[href], a[href]');
    const href = link ? link.getAttribute('href') : '';

    if (!href || card.dataset.projectCardBound === 'true') {
      return;
    }

    card.dataset.projectCardBound = 'true';
    card.dataset.projectHref = href;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.style.cursor = 'pointer';

    card.addEventListener('click', function (event) {
      const clickedLink = event.target.closest('a[href]');
      const targetHref = clickedLink ? clickedLink.getAttribute('href') : card.dataset.projectHref;

      if (!targetHref) {
        return;
      }

      event.preventDefault();
      window.location.href = targetHref;
    });

    card.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      window.location.href = card.dataset.projectHref;
    });
  });
}
