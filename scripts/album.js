 //function takes songNumber, songName, songLength as arguments and populates
 //the song row template accordingly 


 var setSong = function (songNumber){
     // prevent concurrent play back 
     // stop current song before we set a new one
     if (currentSoundFile) {
         currentSoundFile.stop();
     }

    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // #1 
    // assign new buzz object
    // pass in audio file 
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    // #2
    // audio file settings properties 
    // formats is array for acceptable audio formats 
        formats: [ 'mp3' ], 
    // want audio files to load as soon as the page loads
        preload: true
    });
    setVolume(currentVolume);
};
 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function (number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

 var createSongRow = function (songNumber, songName, songLength) {
     var template =
         '<tr class="album-view-song-item">'
         // HTML data attributes allow us to store information in an attribute on an HTML element: "data-song-number"
         // This allows us to access the data held in the attribute using DOM methods when the mouse 
         // leaves the table row, and the song number's table cell returns to its original state.
         +
         '  <td class="song-item-number" data-song-number="' + parseInt(songNumber) + '">' + parseInt(songNumber) + '</td>' +
         '  <td class="song-item-title">' + songName + '</td>' +
         '  <td class="song-item-duration">' + songLength + '</td>' +
         '</tr>';

     var $row = $(template);
     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong (songNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()){
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
        }
    };

     var onHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
     };
     var offHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberCell.html(parseInt(songNumber));
        }
     };

     // #1
     // find() is similar to to querySelector()
     $row.find('.song-item-number').click(clickHandler);
     // #2
     // combines the mouseover() & mouseleave()
     // mouseover() executs onHover, mouseleave() executes offHover
     $row.hover(onHover, offHover);
     // #3
     // $row is created with the event listeners attached 
     return $row;
 };


 // setCurrentAlbum function will be called when window loads 
 // takes one of the album objects as an argument and inject stored information
 // into the template 

 var setCurrentAlbum = function (album) {
     currentAlbum = album;
     // #1
     // select all of the HTML elements required to display on the album page: 
     // title, artist, release info, image, and song list.
     // replace with jQuery-related variable and jQuery selector to use CSS-style syntax
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

     // #2 
     // the firstChild property identifies the first child node of an element, 
     // and nodeValue returns or sets the value of a node. 
     //  albumTitle.firstChild.nodeValue = album.title;
     //  albumArtist.firstChild.nodeValue = album.artist;
     //  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     //  albumImage.setAttribute('src', album.albumArtUrl);

     //  text() method to replace the content of the text nodes instead of firstChild.nodeValue
     //  att() method to change the element attribute using the same arguments 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

     // #3 
     // setting parent container to an empty string 
     $albumSongList.empty();

     // #4 
     // loop through all the songs from thr specified album object
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    // currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    currentSoundFile.play();

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    // currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    currentSoundFile.play();

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

//  var getSongItem = function (element) {
//      switch (element.className) {
//          case 'album-song-button':
//          case 'ion-play':
//          case 'ion-pause':
//              return findParentByClassName(element, 'song-item-number');
//          case 'album-view-song-item':
//              return element.querySelector('.song-item-number');
//          case 'song-item-title':
//          case 'song-item-duration':
//              return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//          case 'song-item-number':
//              return element;
//          default:
//              return;
//      }
//  };

//  var clickHandler = function (targetElement) {

//      var songItem = getSongItem(targetElement);

//      if (currentlyPlayingSong === null) {
//          songItem.innerHTML = pauseButtonTemplate;
//          currentlyPlayingSong = songItem.getAttribute('data-song-number');
//      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//          songItem.innerHTML = playButtonTemplate;
//          currentlyPlayingSong = null;
//      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//          var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//          songItem.innerHTML = pauseButtonTemplate;
//          currentlyPlayingSong = songItem.getAttribute('data-song-number');
//      }
//  };

 // Creating a parent container that allows us to listen for an event on a parent element
 // but target the behavior of one of its children 
//  var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//  var songRows = document.getElementsByClassName('album-view-song-item');

 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 // no song is identified as playing until we click one
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 var $playPauseButton = $('.main-controls .play-pause');


 var updatePlayerBarSong = function (){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
 };

 
var togglePlayFromPlayerBar = function (){
    if (currentSoundFile.isPaused()){
        $().html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
    } else {
        $().html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
    }
};


//  window.onload = function () {
$(document).ready(function () {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playPauseButton.click(togglePlayFromPlayerBar);
     

    //  songListContainer.addEventListener('mouseover', function (event) {
         // event target property stores the DOM element where the event occured 
         // The target event property returns the element that triggered the event

         // console.log(event.target); - prints song-item-title or song-item-numbner 

         // we first select the parent element of all three elements using conditionals, 
         // and then select the song number's cell because we only want to replace song number with play button and nothing else 
         // use parentElement & className to makesure we only act on the table row
        //  if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
             //  event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    //          var songItem = getSongItem(event.target);

    //          if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
    //              songItem.innerHTML = playButtonTemplate;
    //          }
    //      }
    //  });


     // Revert the content back to the number

     // Loop to select every table row to add mouseleave event listener
    //  for (var i = 0; i < songRows.length; i++) {
        //  songRows[i].addEventListener('mouseleave', function (event) {
             // Selects first child element, which is the song-item-number element
             // getAttribute: takes single argument; a string with the name of the attribute whose value we want to retrieve 
             // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

             // #1
            //  var songItem = getSongItem(event.target);
            //  var songItemNumber = songItem.getAttribute('data-song-number');

             // #2

             // added the conditional that checks that the item the mouse is leaving is not the current song, 
             // and only change the content if it isn't
        //      if (songItemNumber !== currentlyPlayingSong) {
        //          songItem.innerHTML = songItemNumber;
        //      }

        //  });

//          songRows[i].addEventListener('click', function (event) {
//              // Event handler call
//              clickHandler(event.target);
//          });
//      }
 });


 // function that keeps traversing the DOM upward until a parent with a specified class name is found
//  var findParentByClassName = function (element, targetClass) {
//      if (element) {
//          var currentParent = element.parentElement;
//          while (currentParent.className !== targetClass && currentParent.className !== null) {
//              currentParent = currentParent.parentElement;
//          }
//          return currentParent;
//      }
//  };

