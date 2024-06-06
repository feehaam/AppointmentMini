import React, { useEffect } from "react";

const FloatingImages = () => {
  const imageUrls = [
    process.env.PUBLIC_URL + "/floatingIcons/icon1.png",
    process.env.PUBLIC_URL + "/floatingIcons/icon2.png",
    process.env.PUBLIC_URL + "/floatingIcons/icon3.png",
    process.env.PUBLIC_URL + "/floatingIcons/icon4.png",
    process.env.PUBLIC_URL + "/floatingIcons/icon5.png",
  ];

  useEffect(() => {
    const createFloatingImages = () => {
      const container = document.getElementById("floating-container");
      const numCopies = 10;
      const minSize = 30;
      const maxSize = 100;

      for (let i = 0; i < numCopies * imageUrls.length; i++) {
        const imageUrl = imageUrls[i % imageUrls.length];
        const size =
          Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        const left = Math.random() * window.innerWidth;
        const top = Math.random() * window.innerHeight;
        const opacity = 0.4;

        const image = new Image();
        image.src = imageUrl;
        image.classList.add("floating-image");
        image.style.width = `${size}px`;
        image.style.height = `${size}px`;
        image.style.left = `${left}px`;
        image.style.top = `${top}px`;
        image.style.opacity = opacity;

        container.appendChild(image);
      }
    };

    createFloatingImages();
  }, []);

  const internalCSS = `
    .floating-container {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .floating-image {
      position: absolute;
      animation: floatAndRotate 10s linear infinite;
    }

    @keyframes floatAndRotate {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-100px) rotate(180deg);
      }
      100% {
        transform: translateY(0) rotate(360deg);
      }
    }
  `;

  return (
    <div
      id="floating-container"
      className="floating-container"
      style={{ backgroundColor: "your-color-here" }}
    >
      <style>{internalCSS}</style>
    </div>
  );
};

export default FloatingImages;
