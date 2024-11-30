async function searchArtist() {
    const artist = document.getElementById('artistInput').value;
    if (!artist) {
      alert('Please enter an artist name');
      return;
    }
  
    // Example fetch request to API Gateway (adjust URL as needed)
    const apiUrl = 'https://your-api-gateway-url/artist-songs?artist=' + encodeURIComponent(artist);
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch artist songs');
      }
  
      const data = await response.json(); // Assuming the Lambda returns JSON
      displaySongs(data.songs); // Assuming the response has a "songs" array
    } catch (error) {
      document.getElementById('output').innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  function displaySongs(songs) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output
  
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
  