<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D Pixel Pattern Squares</title>
    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        canvas {
            background-color: black;
        }
    </style>
</head>
<body>
    <canvas id="canvas" width="600" height="400"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        let offset = 0; // Current separation between squares
        const maxOffset = 100;
        const minOffset = -50;
        const correctDirection = 'ArrowRight'; // Change based on your video

        const squareSize = 150;
        const pixelSize = 6;

        function drawPixelPattern(ctx, x, y, size, color, offsetX) {
            ctx.fillStyle = color;
            for (let i = 0; i < size; i += pixelSize) {
                for (let j = 0; j < size; j += pixelSize) {
                    // Create checkerboard pattern
                    if ((i / pixelSize + j / pixelSize) % 2 === 0) {
                        ctx.fillRect(x + i + offsetX, y + j, pixelSize, pixelSize);
                    }
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw Red square shifted left
            ctx.globalAlpha = 0.6;
            drawPixelPattern(ctx, centerX - squareSize / 2 - offset / 2, centerY - squareSize / 2, squareSize, 'red', 0);

            // Draw Blue square shifted right
            ctx.globalAlpha = 0.6;
            drawPixelPattern(ctx, centerX - squareSize / 2 + offset / 2, centerY - squareSize / 2, squareSize, 'blue', 0);

            ctx.globalAlpha = 1.0;
        }

        draw();

        window.addEventListener('keydown', (e) => {
            if (e.key === correctDirection) {
                offset += 10;
                if (offset > maxOffset) offset = maxOffset;
            } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                offset -= 10;
                if (offset < minOffset) offset = minOffset;
            }
            draw();
        });
    </script>
</body>
</html>
