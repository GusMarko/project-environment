async function searchArtist() {
    const artist = document.getElementById('artistInput').value;
    if (!artist) {
      alert('Please enter an artist name');
      return;
    }
  
   
    const apiUrl = 'https://llkc6n21e3.execute-api.eu-central-1.amazonaws.com/dev/artist-songs?artistName=' + encodeURIComponent(artist);
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch artist songs');
      }
  
      const data = await response.json(); 
      displaySongs(data.songs); 
    } catch (error) {
      document.getElementById('output').innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  function displaySongs(songs) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 
  
    if (!songs || songs.length === 0) {
      outputDiv.innerHTML = '<p>No songs found for this artist.</p>';
      return;
    }
  
    songs.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.className = 'song';
      songDiv.innerHTML = `<strong>${song.title}</strong> by ${song.artist}`;
      outputDiv.appendChild(songDiv);
    });
  }
  