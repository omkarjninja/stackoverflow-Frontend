import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicSpace.css'
import Filter from 'bad-words';



function PublicSpace() {
  const [content, setContent] = useState({
    text: '',
    image: null,
    video: null,
    audio: null, 
    pdf: null, 
  });

  const [sharedContent, setSharedContent] = useState([]);

  const filter = new Filter();
  // Add offensive words you want to filter
  filter.addWords('Fuck', 'Chutiya', 'Dyke', 'Shit', 'Cunt', 'Bugger', 'Dick' , 'Bollocks', 'Bitch','Piss off','Son of a bitch','Asshole',
  'Bullshit','Hell', 'Piss','Bastard','Damn','Talking shit','Motherfucker','Bloody','Feck','Harami','Kutta','Suar ki aulad','Napoonsak',
  'Raand','Bhenchod','Madarchod','Madarjaat','Bhosdike','Sabka Bhosda','Tera Bhosda','Mera Bhosda','Haramkhor','Gaandu','Hijade','Maa ka bhosda','Teri Maa ki chuth');

  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'video' || name === 'audio' || name === 'pdf') {
      setContent((prevContent) => ({
        ...prevContent,
        [name]: files[0],
      }));
    } else {
      setContent((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };

  const checkForOffensiveContent = (content) => {
    const { text } = content;
  
    // Check if text is not empty or null
    if (text) {
      const cleanedText = filter.clean(text);
  
      if (cleanedText !== text) {
        alert('Your content contains offensive language, and it has been removed.');
      }
  
      return cleanedText;
    }
  
    // If text is empty or null, return it as is
    return text;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const cleanedText = checkForOffensiveContent(content);

    const formData = new FormData();
    formData.append('text', content.text);
    formData.append('image', content.image);
    formData.append('video', content.video);
    formData.append('audio', content.audio); 
    formData.append('pdf', content.pdf);

    try {
      const response = await axios.post('http://localhost:5000/api/share', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSharedContent((prevContent) => [...prevContent, response.data]);
      setContent({ text: '', image: null, video: null });
      
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch shared content from the server
  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content');
        setSharedContent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSharedContent();
  }, []);

  return (
    <div>
      <h1>Public Space</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            value={content.text}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video:</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleInputChange}
          />
        </div>
        <div>
  <label htmlFor="audio">Audio:</label>
  <input
    type="file"
    id="audio"
    name="audio"
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="pdf">PDF:</label>
  <input
    type="file"
    id="pdf"
    name="pdf"
    onChange={handleInputChange}
  />
</div>
        <button type="submit">Share</button>
      </form>
      <div>
        <h2>Shared Content</h2>
        {sharedContent.map((item, index) => (
  <div key={index}>
    {item.text && <p>{item.text}</p>}
    {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt="Shared" />}
    {item.video && <video src={`http://localhost:5000/uploads/${item.video}`} controls />}
    {item.audio && <audio src={`http://localhost:5000/uploads/${item.audio}`} controls />}
    {item.pdf && <a href={`http://localhost:5000/uploads/${item.pdf}`} target="_blank" rel="noopener noreferrer">View PDF</a>}
  </div>
))}
      </div>
    </div>
  );
}

export default PublicSpace;
