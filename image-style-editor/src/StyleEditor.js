import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import './StyleEditor.css';

export default function StyleEditor() {
  const [image, setImage] = useState(null);
  const [styles, setStyles] = useState({
    width: 50,
    blur: 0,
    padding: 20,
    borderRadius: 15,
    grayscale: 0,
    brightness: 100,
    base: '#ffffff', 
  });
  const [darkMode, setDarkMode] = useState(false);
  const [gallery, setGallery] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prev) => ({ ...prev, [name]: name === 'base' ? value : parseInt(value) }));
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;
    const canvas = await html2canvas(imageRef.current);
    const link = document.createElement('a');
    link.download = 'styled-image.png';
    link.href = canvas.toDataURL();
    link.click();

   
    setGallery([...gallery, canvas.toDataURL()]);
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>Image Style Editor 🎨</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="controls">
        <label>Upload Image
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>
        <label>Base Color
          <input type="color" name="base" value={styles.base} onChange={handleChange} />
        </label>
        <label>Width
          <input type="range" name="width" min="10" max="100" value={styles.width} onChange={handleChange} />
        </label>
        <label>Border Radius
          <input type="range" name="borderRadius" min="0" max="100" value={styles.borderRadius} onChange={handleChange} />
        </label>
        <label>Padding
          <input type="range" name="padding" min="0" max="100" value={styles.padding} onChange={handleChange} />
        </label>
        <label>Blur
          <input type="range" name="blur" min="0" max="25" value={styles.blur} onChange={handleChange} />
        </label>
        <label>Grayscale
          <input type="range" name="grayscale" min="0" max="100" value={styles.grayscale} onChange={handleChange} />
        </label>
        <label>Brightness
          <input type="range" name="brightness" min="50" max="150" value={styles.brightness} onChange={handleChange} />
        </label>
      </div>

      {image && (
        <>
          <div
            className="preview"
            ref={imageRef}
            style={{
              backgroundColor: styles.base,
              width: `${styles.width}%`,
              padding: `${styles.padding}px`,
              borderRadius: `${styles.borderRadius}px`,
              filter: `blur(${styles.blur}px) grayscale(${styles.grayscale}%) brightness(${styles.brightness}%)`,
            }}
          >
            <img src={image} alt="Uploaded" />
          </div>

          <button onClick={handleDownload} className="download-btn">📥 Download Styled Image</button>
        </>
      )}

      {gallery.length > 0 && (
        <div className="gallery">
          <h2>🖼️ Gallery</h2>
          <div className="gallery-images">
            {gallery.map((img, idx) => (
              <img key={idx} src={img} alt={`Styled ${idx}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
