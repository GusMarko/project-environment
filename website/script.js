async function searchArtist() {
  const artist = document.getElementById('artistInput').value;
  if (!artist) {
      alert('Please enter an artist name');
      return;
  }

  const apiUrl = 'https://llkc6n21e3.execute-api.eu-central-1.amazonaws.com/dev/search?artist=' + encodeURIComponent(artist);

  const response = await fetch(apiUrl);
  const data = await response.json();
  
  // Display the songs
  displaySongs(data.songs);
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
      songDiv.innerHTML = `<strong>${song}</strong>`;
      outputDiv.appendChild(songDiv);
  });
}
