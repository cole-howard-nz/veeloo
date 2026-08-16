/** Click-and-drag horizontal scrolling for mouse pointers; touch keeps native momentum scroll. */
export function dragScroll(node: HTMLElement) {
	let dragging = false;
	let moved = false;
	let pointerId: number | null = null;
	let startX = 0;
	let startScrollLeft = 0;

	function onPointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button !== 0) return;
		dragging = true;
		moved = false;
		pointerId = e.pointerId;
		startX = e.clientX;
		startScrollLeft = node.scrollLeft;
		// Pointer capture is deferred to onPointerMove — capturing here would retarget the
		// browser's compatibility click event to `node` on every plain click, so links/buttons
		// inside never receive it and stop navigating.
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		const delta = e.clientX - startX;
		if (!moved && Math.abs(delta) > 4) {
			moved = true;
			node.classList.add('dragging');
			if (pointerId !== null) node.setPointerCapture(pointerId);
		}
		if (moved) {
			node.scrollLeft = startScrollLeft - delta;
		}
	}

	function endDrag() {
		if (!dragging) return;
		dragging = false;
		node.classList.remove('dragging');
		if (moved) {
			// A real drag happened — swallow the click it would otherwise fire on a link/button underneath.
			const suppressClick = (ev: MouseEvent) => {
				ev.preventDefault();
				ev.stopPropagation();
			};
			node.addEventListener('click', suppressClick, { capture: true, once: true });
		}
	}

	// Links and images are natively draggable in most browsers — that drag-and-drop gesture
	// hijacks the pointer sequence before our own handlers see the full movement. Block it
	// at the container regardless of what markup ends up inside.
	function onDragStart(e: DragEvent) {
		e.preventDefault();
	}

	node.addEventListener('pointerdown', onPointerDown);
	node.addEventListener('pointermove', onPointerMove);
	node.addEventListener('pointerup', endDrag);
	node.addEventListener('pointercancel', endDrag);
	node.addEventListener('pointerleave', endDrag);
	node.addEventListener('dragstart', onDragStart);

	return {
		destroy() {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerup', endDrag);
			node.removeEventListener('pointercancel', endDrag);
			node.removeEventListener('pointerleave', endDrag);
			node.removeEventListener('dragstart', onDragStart);
		}
	};
}
