var AudioPlayer = {
  init: function() {
    AudioPlayer.enabled = true;
    AudioPlayer.current = null;
    AudioPlayer.tracks = {};
  },

  loadTrack: function(filename) {
    var request = new XMLHttpRequest();
    request.open('GET', filename, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        if (AudioPlayer.enabled) { 
          track = { "filename": filename };
          Application.playlist.push(track);
          AudioPlayer.createSource(buffer, filename);
        }
      }, function(err) {
        throw new Error(err);
      });
    }

    request.send();
  },

  createSource: function(buffer, filename) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    var track = { "buffer": buffer, "source": source, "filename": filename};
    track.gainNode = context.createGain();
    source.connect(track.gainNode);
    track.gainNode.gain.value = 0.0;
    track.gainNode.connect(context.destination);
    AudioPlayer.tracks[filename] = track;
    track.source.start(0.0, offset, duration);    
    if (AudioPlayer.current != null)
    {
      AudioPlayer.crossFadeTracks(AudioPlayer.current, track);
    }
    else
    {
      AudioPlayer.fadeInTrack(track); 
    }
  },

  crossFadeTracks: function(trackOut, trackIn) {
    trackOut.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime);
    trackOut.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + fadeTime);

    trackIn.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
    trackIn.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime + fadeTime);

    AudioPlayer.current = trackIn;

  },

  fadeInTrack: function (track) {
    track.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
    track.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime + fadeTime);    

    AudioPlayer.current = track;
  }

}