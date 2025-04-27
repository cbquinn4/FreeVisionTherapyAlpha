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

    const pixelSize = 4;

    // To track pixel positions for blending
    let bluePixels = new Set();
    let redPixels = new Set();

    function drawPixelPattern(ctx, x, y, size, colorSet, label) {
        for (let i = 0; i < size; i += pixelSize) {
            for (let j = 0; j < size; j += pixelSize) {
                if (Math.random() > 0.5) {
                    let px = Math.floor(x + i);
                    let py = Math.floor(y + j);
                    let key = `${px},${py}`;
                    colorSet.add(key);
                    if (ctx) {
                        ctx.fillStyle = label;
                        ctx.fillRect(px, py, pixelSize, pixelSize);
                    }
                }
            }
        }
    }

    function drawBox(ctx, x, y, size, colorSet, color, inner = false) {
        drawPixelPattern(ctx, x, y, size, colorSet, color);
        if (inner) {
            let ix = x, iy = y;
            switch (innerBoxPosition) {
                case 'top': iy = y; ix = x + (size - innerBoxSize) / 2; break;
                case 'bottom': iy = y + size - innerBoxSize; ix = x + (size - innerBoxSize) / 2; break;
                case 'left': ix = x; iy = y + (size - innerBoxSize) / 2; break;
                case 'right': ix = x + size - innerBoxSize; iy = y + (size - innerBoxSize) / 2; break;
            }
            // Remove pixels from the set in the inner box region (make transparent)
            for (let i = 0; i < innerBoxSize; i += pixelSize) {
                for (let j = 0; j < innerBoxSize; j += pixelSize) {
                    let px = Math.floor(ix + i);
                    let py = Math.floor(iy + j);
                    let key = `${px},${py}`;
                    colorSet.delete(key);
                }
            }
            ctx.clearRect(ix, iy, innerBoxSize, innerBoxSize);
        }
    }

    const centerX = canvasSuper.width / 2;
    const centerY = canvasSuper.height / 2;

    // Draw both boxes separately into sets (no drawing yet for superimposed view)
    drawPixelPattern(null, centerX - boxSize / 2 + blueOffset, centerY - boxSize / 2, boxSize, bluePixels);
    drawPixelPattern(null, centerX - boxSize / 2 + redOffset, centerY - boxSize / 2, boxSize, redPixels);

    // Apply inner box transparency logic
    function clearInnerBox(set, x, y, size) {
        let ix = x, iy = y;
        switch (innerBoxPosition) {
            case 'top': iy = y; ix = x + (size - innerBoxSize) / 2; break;
            case 'bottom': iy = y + size - innerBoxSize; ix = x + (size - innerBoxSize) / 2; break;
            case 'left': ix = x; iy = y + (size - innerBoxSize) / 2; break;
