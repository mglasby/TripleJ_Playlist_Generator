async function getTopSongs() {
    const year = document.getElementById('year').value;
    const apiUrl = `https://music.abcradio.net.au/api/v1/plays/search.json?station=triplej&limit=100&from=${year}-01-01&to=${year}-12-31`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.items.length === 0) {
            alert('No songs found for this year. Try another year.');
            return;
        }

        displaySongs(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
    }
}

function displaySongs(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Clear previous results

    songs.forEach(song => {
        const listItem = document.createElement('li');
        listItem.textContent = `${song.recording.title} by ${song.recording.artists[0].name}`;
        songList.appendChild(listItem);
    });
}