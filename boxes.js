function generate() {
    const blueOffset = parseInt(document.getElementById('blueOffset').value);
    const redOffset = parseInt(document.getElementById('redOffset').value);
    const boxSize = parseInt(document.getElementById('boxSize').value);

    const innerBoxSize = Math.floor(boxSize / 3);
    const innerBoxPosition = ['top', 'bottom', 'left', 'right'][Math.floor(Math.random() * 4)];

    const canvasSuper = document.getElementById('superimposedCanvas');
    const ctxSuper = canvasSuper.getContext('2d');

    const canvasSep = document.getElementById('separatedCanvas');
    const ctxSep = canvasSep.getContext('2d');

    ctxSuper.clearRect(0, 0, canvasSuper.width, canvasSuper.height);
    ctxSep.clearRect(0, 0, canvasSep.width, canvasSep.height);

    function drawBox(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
    }

    const centerX = canvasSuper.width / 2;
    const centerY = canvasSuper.height / 2;

    // Superimposed view: draw blue first
    ctxSuper.fillStyle = 'blue';
    ctxSuper.fillRect(centerX - boxSize / 2 + blueOffset, centerY - boxSize / 2, boxSize, boxSize);

    // Draw red and detect overlap
    const redX = centerX - boxSize / 2 + redOffset;
    const redY = centerY - boxSize / 2;
    const overlapX = Math.max(centerX - boxSize / 2 + blueOffset, redX);
    const overlapY = Math.max(centerY - boxSize / 2, redY);
    const overlapWidth = Math.min(centerX - boxSize / 2 + blueOffset + boxSize, redX + boxSize) - overlapX;
    const overlapHeight = Math.min(centerY - boxSize / 2 + boxSize, redY + boxSize) - overlapY;

    if (overlapWidth > 0 && overlapHeight > 0) {
        // Draw overlap as purple
        ctxSuper.fillStyle = 'purple';
        ctxSuper.fillRect(overlapX, overlapY, overlapWidth, overlapHeight);
    }

    // Draw red (non-overlapping)
    ctxSuper.fillStyle = 'red';
    ctxSuper.fillRect(redX, redY, boxSize, boxSize);

    // Separated view (side by side)
    const sepY = canvasSep.height / 2 - boxSize / 2;
    drawBox(ctxSep, canvasSep.width / 4 - boxSize / 2 + blueOffset, sepY, boxSize, 'blue');
    drawBox(ctxSep, 3 * canvasSep.width / 4 - boxSize / 2 + redOffset, sepY, boxSize, 'red');
}
