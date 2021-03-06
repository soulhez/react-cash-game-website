/**
 * Added animation to element
 * @param {array} allPoints
 * @param {number} time adds time to all animations (all-time divide on allPoints.length)
 * @param {func} onUpdate
 * @param {ref} element adds animation to element
 */
export default function customTween(allPoints, time, onUpdate, element) {
	TWEEN.autoPlay(true);
	onUpdate(allPoints[0]);
	element.hidden = false;

	let counterTwin = null;
	for (let i = 0; i < allPoints.length - 1; i++) {
		const twin = new TWEEN.Tween(allPoints[i]).to(allPoints[i + 1], time / (allPoints.length - 1)).on("update", onUpdate);

		if (!counterTwin) {
			counterTwin = twin;
		} else {
			counterTwin.on("complete", () => {
				twin.start();
			});
		}
	}
	counterTwin.start();
}
