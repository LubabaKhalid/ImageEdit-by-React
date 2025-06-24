import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './Editor.css'; // Custom CSS
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Editor({ user }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [styles, setStyles] = useState({
    blur: 0,
    brightness: 100,
    padding: 0,
    borderRadius: 0,
    width: 300,
    grayscale: 0,
  });

  const [darkMode, setDarkMode] = useState(false);
  const imageRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setStyles((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const downloadImage = async () => {
    if (!imageRef.current) return;
    const canvas = await html2canvas(imageRef.current);
    const link = document.createElement('a');
    link.download = 'styled-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`editor-container ${darkMode ? 'dark' : ''}`}>
      <header>
        <h2>🎨 Welcome, {user.email}</h2>
        <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {imageUrl && (
        <>
          <div className="preview-section">
            <div
              className="image-preview"
              ref={imageRef}
              style={{
                filter: `blur(${styles.blur}px) brightness(${styles.brightness}%) grayscale(${styles.grayscale}%)`,
                padding: `${styles.padding}px`,
                borderRadius: `${styles.borderRadius}px`,
                width: `${styles.width}px`,
              }}
            >
              <img src={imageUrl} alt="Uploaded" />
            </div>
          </div>

          <div className="controls">
            {['blur', 'brightness', 'padding', 'borderRadius', 'width', 'grayscale'].map((prop) => (
              <div className="slider" key={prop}>
                <label>{prop.charAt(0).toUpperCase() + prop.slice(1)}: {styles[prop]}</label>
                <input
                  type="range"
                  name={prop}
                  min={prop === 'brightness' ? 0 : 0}
                  max={prop === 'brightness' ? 200 : prop === 'grayscale' ? 100 : prop === 'width' ? 600 : 50}
                  value={styles[prop]}
                  onChange={handleSliderChange}
                />
              </div>
            ))}
          </div>

          <button className="download-btn" onClick={downloadImage}>📥 Download Image</button>
        </>
      )}
    </div>
  );
}
