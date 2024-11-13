# Audio-Responsive Visual Art with p5.js


## Project Overview

>This project visualizes audio input through dynamic and interactive animations. The visual elements change size, color, and movement based on audio frequency data, making it ideal for music visualization or interactive installations. With added adaptive features, the project adjusts to different screen sizes and incorporates stereo sound control based on user interaction, enhancing the immersive experience.


## Instructions

### 1.Interaction:

- Click on the canvas to start or stop audio playback.
- Shapes and colors will respond based on audio frequency data.
- Move the mouse left and right on the screen to change the position of the sound channel while the music is playing.
- Resize the browser window to see the canvas adjust automatically.

## Details of approach
>This project mainly uses audio to change the dynamics in the image.

Compared to my team members use of time changes to change colours; the generation of 3D stereoscopic particles that allow the user to control the viewpoint as they move through it; and the dynamic effects done with perlin noise, This project generates dynamic visual art that responds to audio input in real-time using p5.js. Visual elements, including shapes, colors, and transparency, dynamically react to audio frequencies, creating an immersive and interactive experience.


My individual approach to animating the group code focused on expanding interactivity, creating dynamic visuals in response to audio input, and enhancing adaptability. Below are the main elements of my approach:

1. Audio Integration with Dynamic Visuals

• Approach: I integrated an audio file and used the p5.js p5.FFT library to analyze the audio frequency data in real-time.
• Details: The audio’s frequency spectrum is broken down into low, mid, and high frequencies. These are mapped to various aspects of the visual elements, such as movement, color, and transparency. This allows specific frequency ranges to control different parts of the visual, making the animation highly responsive to sound.
• Purpose: This approach made the animation feel alive and synchronized with the audio, enhancing the immersive experience.

2. Adaptive Canvas and Window Resize Handling

• Approach: I modified the canvas dimensions to be responsive and set maximum size constraints.
• Details: I used windowResized() to detect when the browser window size changes, dynamically resizing the canvas while retaining proportional visual elements. This resizing feature ensured that the animation adapts seamlessly across different screen sizes.
• Purpose: It makes the animation adaptable to any screen, ensuring a consistent experience regardless of device or browser window size.

3. Enhanced Interaction Through Mouse Controls

• Approach: I implemented stereo sound control based on mouse position.
• Details: By mapping the horizontal mouse position to audio.pan(), I allowed users to control the stereo balance, creating an additional layer of interaction.
• Purpose: This adds depth to the user experience by allowing them to directly influence the sound environment of the animation, making it feel more personal and immersive.

4. Perlin Noise for Smooth, Organic Motion

• Approach: I used Perlin noise to generate smooth, continuous movement for various visual elements.
• Details: Perlin noise offsets for x and y coordinates created fluid, natural-looking motions for the sky and sea parts of the animation. It helped avoid the harshness of purely random movement, simulating organic flow and drift.
• Purpose: This approach provided a more lifelike, atmospheric quality to the visuals, complementing the audio-responsive effects.

5. Dynamic Color and Transparency Adjustments

• Approach: I mapped audio frequency data to color and transparency for different visual components.
• Details: Using map() to link audio frequencies to color and alpha values, I added dynamic changes in RGB and transparency levels, particularly in the sky and sea components. Higher frequencies introduced vibrant colors and reduced transparency, while lower frequencies produced subtler shades.
• Purpose: This allowed the visuals to shift in tone and depth based on the music, resulting in a visually engaging, rhythmically synchronized display.

6. Conditional Irregular Polygon Shapes for the Sky

• Approach: I created irregular polygons for sky components based on audio frequencies.
• Details: By mapping high-frequency data to an isSkyRandom condition, I selectively triggered the drawing of irregular polygons in the sky portion when high frequencies were detected.
• Purpose: This method introduced variation in shape based on audio input, creating a more dynamic and visually surprising animation for the sky.

These approaches transformed the group code into a highly interactive, audio-synchronized animation, with smooth motion, adaptive visuals, and immersive sound control, making it an engaging, multi-sensory experience.


### 2.Features

- Real-Time Audio Interaction: Visual elements respond to real-time audio frequency data.
- Adaptive Canvas Size: The canvas adjusts to fit screen size, ensuring consistent visuals across devices.
- Stereo Channel Control: Mouse movement adjusts audio panning for an immersive experience.
- Dynamic Transparency and Color: Shapes vary in color and transparency based on audio data, creating depth.
- Unique Shape Transformations: Irregular polygons are used to represent sky elements, adding a unique visual style.

## References

1. __Constructor__: The constructor of the Rect class initialises the x, y, colour values, transparency and noise offset of the rectangle, ensuring that each object is created with separate properties.
- [JavaScript Constructor Documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)

2. __beginShape() and endShape()__: Generate irregular polygons with beginShape() and endShape(CLOSE) in the drawRect() method of the Rect class to make the shape of the sky part more random and expressive.
- [beginShape() - p5.js](https://p5js.org/reference/p5/beginShape/), [endShape() - p5.js](https://p5js.org/reference/p5/endShape/)

3. __vertex()__: works with beginShape() and endShape() to draw the irregular outline of a polygon by specifying the position of each vertex.
- [vertex() - p5.js](https://p5js.org/reference/p5/vertex/)

## Technical Explanation
### AI Statement of Use
In completing this assignment, I used ChatGPT to assist me with code layout optimisation. At the same time, I used DeepL translation software to translate and output some of the elaborated content in order to ensure the accuracy of the language expression. In all cases, AI tools were only used to assist with formatting and translation, and the core content and code was done independently by me.
