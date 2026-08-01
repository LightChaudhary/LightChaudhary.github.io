const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const revealItems = document.querySelectorAll('.reveal');

if (menuToggle && primaryNav) {
	const closeMenu = () => {
		document.body.classList.remove('menu-open');
		menuToggle.setAttribute('aria-expanded', 'false');
	};

	menuToggle.addEventListener('click', () => {
		const isOpen = document.body.classList.toggle('menu-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});

	primaryNav.addEventListener('click', (event) => {
		if (event.target instanceof HTMLAnchorElement) {
			closeMenu();
		}
	});

	document.addEventListener('click', (event) => {
		if (!document.body.classList.contains('menu-open')) {
			return;
		}

		const target = event.target;
		if (target instanceof Node && !menuToggle.contains(target) && !primaryNav.contains(target)) {
			closeMenu();
		}
	});
}

if ('IntersectionObserver' in window && revealItems.length > 0) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -8% 0px',
	});

	revealItems.forEach((item) => observer.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}
