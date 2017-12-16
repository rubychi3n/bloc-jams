 // Example Album
 var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// Assignment - Third Album
var albumStrangerThings = {
    title: 'Stranger Things',
    artist: 'Barb',
    label: 'ST',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/22.png',
    songs: [
        { title: 'Stranger Things', duration: '1:01' },
        { title: 'Nancy and Barb', duration: '5:01' },
        { title: 'Eleven', duration: '3:21'},
        { title: 'Castle Byers', duration: '3:14' },
        { title: 'The Upside Down', duration: '2:15'}
    ]
};

//function takes songNumber, songName, songLength as arguments and populates
//the song row template accordingly 

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    return template;
};

// setCurrentAlbum function will be called when window loads 
// takes one of the album objects as an argument and inject stored information
// into the template 

var setCurrentAlbum = function(album) {
    // #1
    // select all of the HTML elements required to display on the album page: 
    // title, artist, release info, image, and song list.
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // #2 
    // the firstChild property identifies the first child node of an element, 
    // and nodeValue returns or sets the value of a node. 
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3 
    // setting parent container to an empty string 
    albumSongList.innerHTML = '';

    // #4 
    // loop through all the songs from thr specified album object
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

window.onload = function() {
    setCurrentAlbum(albumPicasso);
};

function clickThrough(){
    for (var i = 0; i)
}

document.getElementsByTagName('img')[1].addEventListener('click', clickThrough);