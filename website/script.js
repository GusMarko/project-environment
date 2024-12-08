async function searchArtist() {
  const artist = document.getElementById('artistInput').value;
  if (!artist) {
      alert('Please enter an artist name');
      return;
  }

  const apiUrl = 'https://m30z22iiwg.execute-api.eu-central-1.amazonaws.com/dev/search?artist=Drake'
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error: ${response.status} - ${response.statusText}');
    }
    const data = await response.json();
    displaySongs(data.songs);
} catch (error) {
  console.error('API call failed:', error);
  alert('Failed to retrrieve songs');
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
      songDiv.innerHTML = `<strong>${song}</strong>`;
      outputDiv.appendChild(songDiv);
  });
}
