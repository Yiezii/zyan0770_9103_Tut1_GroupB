let audio, fft;
let sky, sea, reflection, main;
let size = 10; // Default size for other parts
let sizeSky = 50; // Size of rectangle for the sky part
let sizeSea = 50; // Size of rectangle for the sea part
let skyRects = []; // Store rectangles for the sky part
let seaRects = []; // Store rectangles for the sea part
let mainRects = []; // Store rectangles for the main part
let reflectionRects = []; // Store rectangles for the reflection part
let isAudioPlaying = false;
let isHaveHighFreq = false;
let isSkyRandom = false;
let curWidth,curHeight;

function preload() {
    // Preload images
    sky = loadImage('assets/img/sky.png');
    sea = loadImage('assets/img/sea.png');
    reflection = loadImage('assets/img/reflection.png');
    main = loadImage('assets/img/main.png');

    audio = loadSound('assets/audio/wave.mp3');
}

function setup() {
    // Set up canvas size and basic drawing parameters
    // Get the width and height of the window and limit the maximum value
    curWidth = min(windowWidth, 660);
    curHeight = min(windowHeight, 550);
    createCanvas(curWidth, curHeight);
    noFill();
    textAlign(CENTER, CENTER);
    angleMode(DEGREES); // Set angle mode to degrees
    rectMode(CENTER); // Set rectangle drawing mode to be centered
    noStroke(); // No border for rectangles

    fft = new p5.FFT(0.8, 64);

    // Initialize rectangles
    rectInit();
}

// Listen for window size changes
function windowResized() {
    // Get the width and height of the window and limit the maximum value
    curWidth = min(windowWidth, 660);
    curHeight = min(windowHeight, 550);

    // Update canvas size
    resizeCanvas(curWidth, curHeight);

    // Resizing objects
    sky.resize(curWidth, curHeight);
    sea.resize(curWidth, curHeight);
    reflection.resize(curWidth, curHeight);
    main.resize(curWidth, curHeight);

    // Reinitialize rectangle data
    rectInit();
}

// Handle mouse press to ensure audio starts on interaction
function mousePressed() {
    toggleAudio();
}

function toggleAudio() {
    if (isAudioPlaying) {
        audio.stop(); // Stop the audio if it's playing
        isAudioPlaying = false;
    } else {
        audio.play();  // Start audio if it's not playing yet
        isAudioPlaying = true;
    }
}

function rectInit() {

    skyRects = [];
    seaRects = [];
    reflectionRects = [];
    mainRects = [];

    // Initialize rectangles and extract data from images
    sky.resize(width, height);
    sea.resize(width, height);
    reflection.resize(width, height);
    main.resize(width, height);

    // Load pixel data for each image
    sky.loadPixels();
    sea.loadPixels();
    reflection.loadPixels();
    main.loadPixels();

    // Iterate over the entire canvas to create rectangles based on pixel data
    for (let x = 0; x < width; x += size / 2) {
        for (let y = 0; y < height; y += size / 2) {
            let index = (x + y * width) * 4; // Calculate the index in the pixel array

            // Sky Rectangles
            if (sky.pixels[index + 3] > 0) { // Check if the alpha value is greater than 0
                skyRects.push(new Rect(
                    x, y,
                    sky.pixels[index],
                    sky.pixels[index + 1],
                    sky.pixels[index + 2],
                    sky.pixels[index + 3],
                    "sky",
                    sizeSky
                ));
            }

            // Sea Rectangles (use larger size for sea)
            if (sea.pixels[index + 3] > 0) {
                seaRects.push(new Rect(
                    x, y,
                    sea.pixels[index],
                    sea.pixels[index + 1],
                    sea.pixels[index + 2],
                    sea.pixels[index + 3],
                    "sea",
                    sizeSea // Pass the new size for sea
                ));
            }

            // Reflection Rectangles
            if (reflection.pixels[index + 3] > 0) {
                reflectionRects.push(new Rect(
                    x, y,
                    reflection.pixels[index],
                    reflection.pixels[index + 1],
                    reflection.pixels[index + 2],
                    reflection.pixels[index + 3],
                    "reflection"
                ));
            }

            // Main Rectangles
            if (main.pixels[index + 3] > 0) {
                mainRects.push(new Rect(
                    x, y,
                    main.pixels[index],
                    main.pixels[index + 1],
                    main.pixels[index + 2],
                    main.pixels[index + 3],
                    "main"
                ));
            }
        }
    }
}

function draw() {
    background(255); // Set the background to white to avoid overlap

    // Left and right channel controls
    let panValue = map(mouseX, 0, width, -1, 1);
    audio.pan(panValue);

    // Draw all rectangles representing the sky part
    for (let i = 0; i < skyRects.length; i++) {
        skyRects[i].move(); // Implement rectangle movement logic (if needed)
        skyRects[i].drawRect(); // Draw the rectangle
    }

    // Draw all rectangles representing the sea part
    for (let i = 0; i < seaRects.length; i++) {
        seaRects[i].move();
        seaRects[i].drawRect();
    }

    // Draw all rectangles representing the reflection part
    for (let i = 0; i < reflectionRects.length; i++) {
        reflectionRects[i].move();
        reflectionRects[i].drawRect();
    }

    // Draw all rectangles representing the main part
    for (let i = 0; i < mainRects.length; i++) {
        mainRects[i].move();
        mainRects[i].drawRect();
    }

    // Print the total count of all rectangles
    print(skyRects.length + seaRects.length + reflectionRects.length + mainRects.length);
}

// Rectangle class, used to store data for each rectangle and implement drawing and movement logic
class Rect {
    constructor(x, y, r, g, b, a, part, size) {
        this.x = x; // x-coordinate of the rectangle
        this.y = y; // y-coordinate of the rectangle
        this.r = r; // Red value
        this.g = g; // Green value
        this.b = b; // Blue value
        this.a = a; // Alpha (transparency) value
        this.part = part; // Part of the image the rectangle belongs to
        this.size = size || 10; // Use the passed size or default to 10
        this.offsetX = 0;
        this.offsetY = 0;
        this.noiseOffsetX = random(1000); // Initialize the Perlin noise offset
        this.noiseOffsetY = random(2000); // Initialize the Perlin noise offset for Y-axis
    }

    move() {
        let spectrum = fft.analyze();

        if (isAudioPlaying) {
            if (this.part === "sky") {
                let highFreq = spectrum[40]; // Use a specific frequency range for sky

                if (highFreq != null) {
                    isHaveHighFreq = true;
                    // Adjust noise offsets for flowing effect based on high frequency
                    let speedX = map(highFreq, 0, 225, 0, 5);
                    this.noiseOffsetX += speedX;
                    this.offsetX = map(noise(this.noiseOffsetX), 0, 1, -400, 400);

                    // Color modulation based on spectrum (sky color)
                    this.colorR = map(spectrum[5], 0, 255, 0, 255);
                    this.colorG = map(spectrum[10], 0, 255, 0, 255);
                    this.colorB = map(spectrum[15], 0, 255, 100, 255);

                    // Smooth alpha for the sky
                    let smoothAlpha = map(noise(this.noiseOffsetX * 0.5), 0, 1, 120, 255);
                    this.color = color(this.colorR, this.colorG, this.colorB, smoothAlpha);

                    if (speedX != 0) {
                        isSkyRandom = true;
                    } else {
                        isSkyRandom = false;
                    }
                } else {
                    isHaveHighFreq = false;
                }
            }

            if (this.part === "sea") {
                let lowFreq = spectrum[10]; // Use a lower frequency band for sea

                if (lowFreq != null) {
                    // Adjust noise offsets for flowing effect based on low frequency
                    this.noiseOffsetY += map(lowFreq, 0, 255, 0, 0.5);  // Also vary vertical movement speed

                    // Apply Perlin noise to create smooth flowing motion
                    this.offsetY = map(noise(this.noiseOffsetY), 0, 1, -30, 30);  // Vertical offset for wave-like motion

                    // Color modulation based on spectrum (sea color)
                    this.colorR = map(spectrum[5], 0, 255, 0, 50);  // Darker greenish-blue for depth
                    this.colorG = map(spectrum[10], 0, 255, 100, 255);  // Brighter greenish tone
                    this.colorB = map(spectrum[15], 0, 255, 150, 255);  // Deeper blue

                    // Adding depth effect using noise and frequency values
                    let depthFactor = map(noise(this.noiseOffsetY * 0.5), 0, 1, 100, 200); // Depth effect
                    this.colorR = constrain(this.colorR + depthFactor, 0, 255); // Adjust for depth
                    this.colorG = constrain(this.colorG + depthFactor / 2, 0, 255);
                    this.colorB = constrain(this.colorB - depthFactor / 3, 0, 255);

                    // Smooth alpha to create the dynamic lighting effect on the water
                    let smoothAlpha = map(noise(this.noiseOffsetY * 0.5), 0, 1, 120, 255);
                    this.color = color(this.colorR, this.colorG, this.colorB, smoothAlpha);
                }
                // Spectrum to alpha
                let freqIndex = map(this.y, 0, height + 50, 0, spectrum.length - 1);
                let alphaValue = map(spectrum[int(freqIndex)], 0, 255, 80, 255);
                this.a = alphaValue;
            }
        }
    }

    // Method to draw irregular shapes instead of rectangles
    drawRect() {
        push(); // Save the current drawing settings
        translate(this.x + this.offsetX, this.y + this.offsetY); // Add offset based on noise

        // Set the fill color based on the part (sea has different color values)
        if (this.part === "sea" || this.part === "sky") {
            fill(this.r, this.g, this.b, this.a / 9);
        } else {
            fill(this.r, this.g, this.b, this.a / 2);
        }

        // For the sea part, use an irregular polygon to simulate waves
        if (isAudioPlaying && this.part === "sky" && isHaveHighFreq && isSkyRandom) {
            rotate(random(360));
            beginShape();
            let numVertices = int(random(5, 7));
            for (let i = 0; i < numVertices; i++) {
                let angle = map(i, 0, numVertices, 0, 360);
                let radius = random(this.size * 0.5, this.size);
                let xOffset = cos(angle) * radius;
                let yOffset = sin(angle) * radius;

                // Add a Perlin noise modifier to make the sea waves look more organic
                xOffset += noise(this.noiseOffsetX + i);
                yOffset += noise(this.noiseOffsetY + i);

                vertex(xOffset, yOffset); // Add a vertex at the calculated position
            }
            endShape(CLOSE);
        } else {
            // Default rectangle shape for other parts
            rect(0, 0, this.size, this.size); // Draw the rectangle with the dynamic size
        }
        pop(); // Restore the previous drawing settings
    }
}