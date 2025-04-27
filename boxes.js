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

    function drawPixelPattern(ctx, x, y, size, color, opacity = 1.0) {
        ctx.globalAlpha = opacity;
        for (let i = 0; i < size; i += 4) {
            for (let j = 0; j < size; j += 4) {
                if (Math.random() > 0.5) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x + i, y + j, 4, 4);
                }
            }
        }
        ctx.globalAlpha = 1.0;
    }

    function drawBox(ctx, x, y, size, color, opacity = 1.0, inner = false) {
        drawPixelPattern(ctx, x, y, size, color, opacity);
        if (inner) {
            let ix = x, iy = y;
            switch (innerBoxPosition) {
                case 'top': iy = y; ix = x + (size - innerBoxSize) / 2; break;
                case 'bottom': iy = y + size - innerBoxSize; ix = x + (size - innerBoxSize) / 2; break;
                case 'left': ix = x; iy = y + (size - innerBoxSize) / 2; break;
                case 'right': ix = x + size - innerBoxSize; iy = y + (size - innerBoxSize) / 2; break;
            }
            ctx.clearRect(ix, iy, innerBoxSize, innerBoxSize);
        }
    }

    const centerX = canvasSuper.width / 2;
    const centerY = canvasSuper.height / 2;

    // Superimposed view: draw blue first, then red
    drawBox(ctxSuper, centerX - boxSize / 2 + blueOffset, centerY - boxSize / 2, boxSize, 'blue', 0.5);
    drawBox(ctxSuper, centerX - boxSize / 2 + redOffset, centerY - boxSize / 2, boxSize, 'red', 0.5, true);

    // Separated view (side by side)
    const sepY = canvasSep.height / 2 - boxSize / 2;
    drawBox(ctxSep, canvasSep.width / 4 - boxSize / 2 + blueOffset, sepY, boxSize, 'blue', 1.0);
    drawBox(ctxSep, 3 * canvasSep.width / 4 - boxSize / 2 + redOffset, sepY, boxSize, 'red', 1.0, true);
}

