function generate() {
    const blueOffset = parseInt(document.getElementById('blueOffset').value);
    const redOffset = parseInt(document.getElementById('redOffset').value);
    const boxSize = parseInt(document.getElementById('boxSize').value);

    const canvasSuper = document.getElementById('superimposedCanvas');
    const ctxSuper = canvasSuper.getContext('2d');

    const canvasSep = document.getElementById('separatedCanvas');
    const ctxSep = canvasSep.getContext('2d');

    ctxSuper.clearRect(0, 0, canvasSuper.width, canvasSuper.height);
    ctxSep.clearRect(0, 0, canvasSep.width, canvasSep.height);

    function drawPixelPattern(ctx, x, y, size, color) {
        for (let i = 0; i < size; i += 4) {
            for (let j = 0; j < size; j += 4) {
                if (Math.random() > 0.5) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x + i, y + j, 4, 4);
                }
            }
        }
    }

    const centerX = canvasSuper.width / 2;
    const centerY = canvasSuper.height / 2;

    // Draw blue pixels
    drawPixelPattern(ctxSuper, centerX - boxSize / 2 + blueOffset, centerY - boxSize / 2, boxSize, 'blue');

    // Draw red pixels
    drawPixelPattern(ctxSuper, centerX - boxSize / 2 + redOffset, centerY - boxSize / 2, boxSize, 'red');

    // Handle overlap and ensure 100% opacity
    const imageData = ctxSuper.getImageData(0, 0, canvasSuper.width, canvasSuper.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];     // Red channel
        const green = data[i+1]; // Green channel
        const blue = data[i+2];  // Blue channel
        const alpha = data[i+3]; // Alpha channel

        if (red > 0 && blue > 0) {
            // Overlapping red and blue -> make purple
            data[i] = 128;    // Set red

