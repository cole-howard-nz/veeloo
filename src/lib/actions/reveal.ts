/** Adds `is-visible` the first time an element scrolls into view. Pairs with the `.reveal` CSS class. */
export function reveal(node: HTMLElement, options?: IntersectionObserverInit) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				observer.disconnect();
			}
		},
		{ threshold: 0.15, ...options }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
