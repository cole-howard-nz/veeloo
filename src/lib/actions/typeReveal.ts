/**
 * Wraps each visible character of `node`'s content in a span with a staggered
 * transition-delay, then reveals them left-to-right (typewriter-style) the first time
 * the element scrolls into view. Preserves nested inline markup (e.g. an accent-colored
 * `<span>` or a `<br>`) and keeps the original text available to screen readers via a
 * visually-hidden duplicate, since the per-character spans are marked `aria-hidden`.
 * Pairs with the `.type-reveal` CSS class.
 */
export function typeReveal(
	node: HTMLElement,
	options?: { stepMs?: number; startDelayMs?: number } & IntersectionObserverInit
) {
	const { stepMs = 22, startDelayMs = 0, threshold = 0.4, ...observerOptions } = options ?? {};

	const fullText = node.textContent ?? '';

	const visual = document.createElement('span');
	visual.setAttribute('aria-hidden', 'true');
	while (node.firstChild) visual.appendChild(node.firstChild);
	node.appendChild(visual);

	const srOnly = document.createElement('span');
	srOnly.className = 'sr-only';
	srOnly.textContent = fullText;
	node.appendChild(srOnly);

	let charIndex = 0;
	function wrap(child: ChildNode) {
		if (child.nodeType === Node.TEXT_NODE) {
			const text = child.textContent ?? '';
			const frag = document.createDocumentFragment();
			for (const ch of text) {
				if (/\s/.test(ch)) {
					frag.appendChild(document.createTextNode(ch));
					continue;
				}
				const span = document.createElement('span');
				span.className = 'type-char';
				span.style.setProperty('--type-delay', `${startDelayMs + charIndex * stepMs}ms`);
				span.textContent = ch;
				frag.appendChild(span);
				charIndex++;
			}
			child.replaceWith(frag);
		} else if (child.nodeType === Node.ELEMENT_NODE && child.childNodes.length) {
			Array.from(child.childNodes).forEach(wrap);
		}
	}
	Array.from(visual.childNodes).forEach(wrap);

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				observer.disconnect();
			}
		},
		{ threshold, ...observerOptions }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
