# Dynamic Audio-Responsive Visual Art with p5.js
produced by Yiez

## Project Overview

>This project generates dynamic, audio-responsive visual art using the p5.js library. The program analyzes audio frequencies and adapts animations in response to specific sound frequencies. Different shapes and colors in the sky and sea regions react to audio cues, creating an interactive visual experience.



## Contents

#### [Instructions](#instrations)

#### [Details of approach](#details-of-approach)

#### [References](#references)

#### [Technical Explanation](#technical-explanation)


## i.Instructions

### Interaction:

- Click on the canvas to start or stop audio playback.

- Shapes and colors will respond based on audio frequency data.

- Move the mouse left and right on the screen to change the position of the sound channel while the music is playing.

- Resize the browser window to see the canvas adjust automatically.

### Code Structure：

The project is structured as follows:
- preload(): Loads images and audio files.
- setup(): Sets up the canvas, initializes p5.FFT, and calls rectInit() to create rectangles based on image data.
- rectInit(): Creates rectangles from image pixels and stores them in arrays for each section.
- draw(): Calls specific drawing functions for each section (e.g., drawSky(), drawSea()).
- Rect Class: Manages rectangle properties, including move() for audio-driven motion and drawRect() for rendering.

## ii.Details of approach

1.Audio Frequency Analysis with p5.FFT

- Uses fft.analyze() to get real-time frequency data.

- High and low frequencies control different parts of the animation.

- Example: High frequencies impact sky shapes; low frequencies affect sea movement.

2.Smooth Animation with Perlin Noise

- Perlin noise offsets (noiseOffsetX and noiseOffsetY) ensure natural, smooth motion.

- Used to adjust the position and rotation of shapes, especially for fluid sea and sky effects.

3.Dynamic Alpha and Color Adjustments

- Alpha transparency and color are adjusted based on position and audio data.

- Adds depth and variation, especially in the sea section where transparency varies with the rectangle’s vertical position.

4.Unique Shape Transformations

- In high-frequency ranges, sky rectangles become irregular polygons.

- The drawRect() function conditions these changes based on audio playback and frequency presence, enhancing visual diversity.

### 2.Technologies Used

>This project uses the following technologies and libraries:

1. __p5.js__: Core library for graphics and interaction.

2. __p5.sound.js__: Provides p5.FFT for audio frequency analysis.

3. __Perlin Noise__: Generates smooth, natural variations in animation.

### 3.Features

- __Audio Interaction__: Shapes dynamically respond to audio frequency data, creating visually appealing changes based on sound.

- __Perlin Noise Animation__: Smooth, natural motion effects are generated using Perlin noise, making the shapes flow more organically.

- __Window Resizing Adaptability__: The canvas resizes automatically to match the browser window size.

- __Dynamic Transparency and Color__: The sky and sea colors vary based on position and audio frequency, adding depth and richness.

- __Unique Shape Generation__: The sky shapes shift to irregular polygons in response to high-frequency sounds, adding unexpected visual elements.

## iii.References

1.[p5.js Documentation]()

2.[p5.sound.js Documentation]()

3.[Perlin Noise]()



## iv.Technical Explanation

1.	p5.js Library:
- p5.js was used for creating the canvas, managing shapes, and adding interactivity.
- p5.sound.js was utilized specifically for p5.FFT to perform audio analysis.
2.	Perlin Noise for Smooth Animations:
- Perlin Noise Theory was applied to achieve realistic, smooth variations in movement, especially for simulating natural flow in the sea and sky sections.