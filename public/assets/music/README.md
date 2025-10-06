# Audio Assets

## Audio Optimization Guidelines

All audio files should be optimized for web streaming:

### Current Files
- `dial-up.mp3` - Dial-up modem sound effect
- `hip-hop-loop.mp3` - 90s Boom Bap Focus Mode playlist
- `jazz-fusion-loop.mp3` - Jazz Fusion Tokyo 1986 playlist
- `synthwave-loop.mp3` - City Pop Mix playlist

### Format Recommendations
- **Primary format**: MP3 (320kbps for music, 128kbps for effects)
- **Alternative**: AAC/M4A for better compression
- **Streaming**: Consider using HLS or DASH for longer tracks

### Optimization Steps

#### 1. Convert to optimized MP3
```bash
# Using ffmpeg
ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k -ar 44100 output.mp3
```

#### 2. Normalize audio levels
```bash
ffmpeg -i input.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 output.mp3
```

#### 3. Add fade in/out for loops
```bash
ffmpeg -i input.mp3 -af "afade=t=in:st=0:d=0.5,afade=t=out:st=58:d=2" output.mp3
```

### Quality Settings
- **Music loops**: 192-256kbps MP3
- **Sound effects**: 128kbps MP3
- **Sample rate**: 44.1kHz (standard)
- **Channels**: Stereo for music, mono for effects

### File Size Targets
- **Short loops (< 1 min)**: < 1MB
- **Medium tracks (1-3 min)**: < 3MB
- **Long tracks (> 3 min)**: Consider streaming

### Looping Guidelines
For seamless loops:
1. Ensure the waveform starts and ends at zero crossing
2. Add crossfade at loop point (0.5-1s)
3. Match tempo and key for playlist cohesion

### Tools
- **Audacity** (Free): https://www.audacityteam.org/
- **ffmpeg** (CLI): https://ffmpeg.org/
- **Adobe Audition** (Professional)
- **Logic Pro / Ableton** (DAW)

### Web Audio API
Audio files are loaded and played using:
- Native HTML5 Audio API
- Web Audio API for visualizations
- Tone.js for advanced audio features

### Performance Tips
- Preload only the first track
- Lazy load other tracks on demand
- Use audio sprites for sound effects
- Implement progressive loading for long tracks
- Cache audio files in service worker

## Playlist Structure

### City Pop Mix (synthwave-loop.mp3)
- Genre: City Pop, Synthwave
- BPM: ~110-120
- Duration: ~60s loop
- Mood: Nostalgic, upbeat

### Jazz Fusion Tokyo 1986 (jazz-fusion-loop.mp3)
- Genre: Jazz Fusion
- BPM: ~90-100
- Duration: ~60s loop
- Mood: Sophisticated, smooth

### 90s Boom Bap Focus Mode (hip-hop-loop.mp3)
- Genre: Hip-Hop, Boom Bap
- BPM: ~85-95
- Duration: ~60s loop
- Mood: Focused, rhythmic
