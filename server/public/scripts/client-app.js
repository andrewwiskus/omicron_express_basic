$(document).ready(function() {
    getSongs();
    var currentSongs = [];
    // respond to submit event on form
    $('#song-form').on('submit', function() {
        event.preventDefault();

        var song = {}; // we will store our song here
        var duplicate = false;
        var blank = false;
        // iterate over form fields
        // populate our song object with title and artist
        $.each($('#song-form').serializeArray(), function(i, field) {
            song[field.name] = field.value;
            var theDate = new Date();
            song.dateAdded = theDate;
            // duplicate = checkDuplicate(song.title, song.artist);
            // blank = checkBlank(song.title, song.artist);
        });

        $.ajax({
            type: 'POST',
            url: '/songs',
            data: song,

            success: function(response) {
                console.log('POST /songs works!');
                getSongs();
            },

            error: function(response) {
                console.log('Attempted POST /songs, did not work');
            }
        });
    });

    // function checkBlank(title, artist) {
    //     if (title === "") {
    //         return true;
    //     } else if (artist === "") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    //
    // function checkDuplicate(title, artist) {
    //     currentSongs.forEach(function(song, i) {
    //         if (song.title == title && song.artist == artist) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    function getSongs() {
        $.ajax({
            type: 'GET',
            url: '/songs',
            success: function(songs) {
                $('#song-list').empty();
                currentSongs = songs;
                console.log(currentSongs);
                songs.forEach(function(song) {
                    $('#song-list').append('<div>' + song.title + '-' + song.artist + '</div>');
                });
            },

            error: function() {
                console.log('GET /songs did not work');
            },
        });
    }
});
