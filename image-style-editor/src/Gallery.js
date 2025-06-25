import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import './Gallery.css';

export default function Gallery({ currentUser, type = 'private' }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'images'),
      type === 'private'
        ? where('owner', '==', currentUser.uid)
        : orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, snapshot => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [type, currentUser]);

  return (
    <div className="gallery-container">
      <h2>{type === 'private' ? 'My Gallery' : 'Public Gallery'}</h2>
      {images.length === 0 && <p>No images found.</p>}
      <div className="gallery-grid">
        {images.map(img => (
          <img key={img.id} src={img.url} alt="" />
        ))}
      </div>
    </div>
  );
}
