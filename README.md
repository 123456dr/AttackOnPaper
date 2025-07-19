# AttackOnPaper 進擊的線稿 : <br>Real-World to Line Art Animation with Computer Vision

> Turn real-world videos into animated line drawings using edge detection and other py code!

## 💡 What is this project?

**Attack on Paper** is a video-to-animation converter that transforms real-world motion videos (like dancing or performance footage) into clean, hand-drawn-style black and white animations. It detects and tracks the main person in the scene and applies edge detection techniques to produce line-drawing-like frames. The final result is an animated sketch that follows the original motion .

## 🎯 Why I made this
As a long-time animation fan, I’ve always been fascinated by frame-by-frame animation. I once manually traced over 130+ frames for a 14-second dancing animation at 12 FPS—it was fun, but exhausting.

This project is born from that experience: I wanted to build a tool to help indie creators like myself speed up the animation process using AI and computer vision. Also, with the recent boom in AI-generated visuals (like Ghibli-style portraits), I wanted to explore similar creative possibilities for motion and video.


## 🛠️ How I built it

This is a full-stack project that includes both frontend and backend components:

- **Frontend (React)**:  
  A simple user interface allows users to upload images or videos and submit them for processing. I added a helpful **question mark button** 🆘 that explains possible backend delays using a typewriter-style animation.

- **Backend (FastAPI + Python)**:
  - Accepts uploaded videos
  - Uses OpenCV for **frame-by-frame edge detection**
  - Reconstructs the processed frames into a new video
  - Optionally saves line-art images as PNGs for further use

- **Computer Vision**:
  - Applies grayscale conversion and Canny edge detection
  - Uses techniques like **contrast stretching** to improve line clarity
  - Processes video into stylized black-on-white animations

## 🧩 What I struggled with & what I learned

- 🐢 **Backend delay**:  
  Early in development, I noticed a delay after submitting videos. It turns out FastAPI needed a few seconds to reload or initialize heavy processing. To help users, I added a **question mark button** that explains this via a typewriter message.

- 🎨 **Balancing clarity and simplicity**:  
  Edge detection sometimes made animations too noisy or too faint. I experimented with different thresholds, filters, and contrast techniques to make outlines pop without losing fidelity.


- 💡 **Lesson learned**:  
  Good UX matters even in technical projects. Little touches—like layout tweaks and helpful animations—make it much more pleasant to use.


## 📸 Demo
To be continued...


<br><br><br><br>
🙌 Thanks for checking it out! 👾  
If you like sketch-style AI animations or want to contribute, feel free to fork or reach out!


---

## Devlog
To be continued...
