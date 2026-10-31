import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Gauge, 
  Repeat, 
  Sparkles,
  RefreshCw,
  AlertCircle,
  Headphones,
  Video,
  Radio
} from 'lucide-react';
import { YOUTUBE_VIDEO_ID, DEFAULT_START_TIME, SUBTITLES_DATA } from './data.ts';
import { soundManager } from './soundEffects.ts';

interface VideoPlayerProps {
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onSeekRequested?: (seconds: number) => void;
  repeatPhraseRange?: { start: number; end: number } | null;
  onClearRepeat?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentTime,
  onTimeUpdate,
  repeatPhraseRange,
  onClearRepeat
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMediaMode, setActiveMediaMode] = useState<'video' | 'audio'>('video');
  const [duration, setDuration] = useState(800); // ~13:20
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoopingPhrase, setIsLoopingPhrase] = useState(false);
  const [localTime, setLocalTime] = useState<number>(currentTime || DEFAULT_START_TIME);
  const [useNoCookie, setUseNoCookie] = useState(false);

  // Audio simulation state for speech synthesis mode
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to send postMessage commands to YouTube iframe
  const sendIframeCommand = useCallback((func: string, args: unknown[] = []) => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func,
            args
          }),
          '*'
        );
      }
    } catch {
      // Ignore cross-origin issues
    }
  }, []);

  // Listen for YouTube postMessage infoDelivery events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (!event.data) return;
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            const t = data.info.currentTime;
            setLocalTime(t);
            onTimeUpdate(t);

            // Repeat phrase check
            if (isLoopingPhrase && repeatPhraseRange && t >= repeatPhraseRange.end) {
              sendIframeCommand('seekTo', [repeatPhraseRange.start, true]);
              sendIframeCommand('playVideo');
              setLocalTime(repeatPhraseRange.start);
              onTimeUpdate(repeatPhraseRange.start);
            }
          }

          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }

          if (typeof data.info.playerState === 'number') {
            // 1 = playing, 2 = paused, 0 = ended
            if (data.info.playerState === 1) {
              setIsPlaying(true);
            } else if (data.info.playerState === 2 || data.info.playerState === 0) {
              setIsPlaying(false);
            }
          }
        }
      } catch {
        // Ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onTimeUpdate, isLoopingPhrase, repeatPhraseRange, sendIframeCommand]);

  // Sync external currentTime changes (like when clicking a subtitle line or chapter)
  useEffect(() => {
    if (Math.abs(currentTime - localTime) > 1.5) {
      setLocalTime(currentTime);
      sendIframeCommand('seekTo', [currentTime, true]);
    }
  }, [currentTime, sendIframeCommand, localTime]);

  // Active phrase currently matching playback time
  const currentSubtitleIndex = SUBTITLES_DATA.findIndex(
    (line) => localTime >= line.start - 0.5 && localTime <= line.end + 0.5
  );
  const currentSubtitle = currentSubtitleIndex !== -1 ? SUBTITLES_DATA[currentSubtitleIndex] : SUBTITLES_DATA[0];

  // Audio dialogue playback simulation
  useEffect(() => {
    if (activeMediaMode !== 'audio' || !isPlaying) {
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
      return;
    }

    // Speak initial phrase if starting
    if (currentSubtitle) {
      soundManager.speakSpanish(currentSubtitle.textEs);
    }

    const timer = setInterval(() => {
      setLocalTime((prev) => {
        const next = prev + 1;
        onTimeUpdate(next);

        // Check if crossed into a new subtitle
        const newSub = SUBTITLES_DATA.find(
          (line) => next >= line.start && next < line.start + 1.2
        );
        if (newSub) {
          soundManager.speakSpanish(newSub.textEs);
        }

        if (next >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return next;
      });
    }, 1000);

    speechTimerRef.current = timer;
    return () => clearInterval(timer);
  }, [activeMediaMode, isPlaying, duration, onTimeUpdate]);

  // Toggle play/pause
  const togglePlay = () => {
    soundManager.playClick();
    if (isPlaying) {
      setIsPlaying(false);
      sendIframeCommand('pauseVideo');
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } else {
      setIsPlaying(true);
      sendIframeCommand('playVideo');
      if (activeMediaMode === 'audio' && currentSubtitle) {
        soundManager.speakSpanish(currentSubtitle.textEs);
      }
    }
  };

  const handleSeek = (seconds: number) => {
    soundManager.playClick();
    const target = Math.max(0, Math.min(duration, seconds));
    setLocalTime(target);
    onTimeUpdate(target);
    sendIframeCommand('seekTo', [target, true]);

    if (activeMediaMode === 'audio' && isPlaying) {
      const match = SUBTITLES_DATA.find((s) => target >= s.start && target <= s.end);
      if (match) soundManager.speakSpanish(match.textEs);
    }
  };

  const handleJump = (offset: number) => {
    soundManager.playClick();
    handleSeek(localTime + offset);
  };

  const handleSpeedChange = (speed: number) => {
    soundManager.playClick();
    setPlaybackRate(speed);
    sendIframeCommand('setPlaybackRate', [speed]);
  };

  const toggleMute = () => {
    soundManager.playClick();
    if (isMuted) {
      sendIframeCommand('unMute');
      setIsMuted(false);
    } else {
      sendIframeCommand('mute');
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const domain = useNoCookie ? 'www.youtube-nocookie.com' : 'www.youtube.com';

  return (
    <div className="w-full bg-[#38061B] rounded-2xl border-2 border-[#990F32] overflow-hidden shadow-2xl flex flex-col">
      {/* Video Header bar with Mode Selector and Direct YouTube button */}
      <div className="px-4 py-2.5 bg-[#250311] border-b border-[#990F32] flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Media mode tabs */}
        <div className="flex items-center gap-1.5 bg-[#1a020b] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMediaMode('video');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMediaMode === 'video'
                ? 'bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#250311] shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video de YouTube</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMediaMode('audio');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMediaMode === 'audio'
                ? 'bg-[#E63946] text-white shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Audio & Diálogo (Ուղիղ ձայն)</span>
          </button>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          {/* Audio helper pronunciation */}
          <button
            onClick={() => {
              if (currentSubtitle) soundManager.speakSpanish(currentSubtitle.textEs);
            }}
            className="flex items-center gap-1 text-[#FFD166] hover:text-white bg-[#650D32] hover:bg-[#990F32] px-2.5 py-1.5 rounded-md border border-[#FFD166]/30 font-bold transition-colors cursor-pointer"
            title="Լսել այս պահի իսպաներեն արտասանությունը"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Լսել արտասանությունը</span>
          </button>

          {/* Direct link to original YouTube video */}
          <a
            href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=${Math.floor(localTime)}s`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#250311] bg-gradient-to-r from-[#FFD166] to-[#FF922B] hover:brightness-110 px-3 py-1.5 rounded-md font-black shadow-sm transition-all"
            title="Բացել YouTube-ում այս վայրկյանից (Watch on YouTube)"
          >
            <span>YouTube ▶</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Video / Audio Viewport */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {activeMediaMode === 'video' ? (
          /* Real YouTube Player Embed */
          <div className="relative w-full h-full">
            <iframe
              ref={iframeRef}
              key={`yt-player-${useNoCookie ? 'nocookie' : 'standard'}`}
              id="yt-player-frame"
              title="Natalia Oreiro - Entrevista en Cala"
              src={`https://${domain}/embed/${YOUTUBE_VIDEO_ID}?start=${Math.max(0, Math.floor(localTime || DEFAULT_START_TIME))}&controls=1&rel=0&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0 z-10"
            />
          </div>
        ) : (
          /* Interactive Audio Narrator Card */
          <div className="absolute inset-0 bg-gradient-to-br from-[#250311] via-[#650D32] to-[#38061B] p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFD166] to-[#FF922B] flex items-center justify-center shadow-2xl animate-pulse">
              <Radio className="w-8 h-8 text-[#250311]" />
            </div>

            <div className="space-y-1 max-w-md">
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase ${
                currentSubtitle.speaker.toLowerCase().includes('natalia')
                  ? 'bg-[#FFD166] text-[#650D32]'
                  : 'bg-[#FF922B] text-white'
              }`}>
                {currentSubtitle.speaker} • ⏱ {formatTime(localTime)}
              </span>
              <p className="text-base sm:text-lg font-bold text-white line-clamp-2">
                «{currentSubtitle.textEs}»
              </p>
              <p className="text-xs sm:text-sm text-[#FFD166] line-clamp-2 font-medium">
                {currentSubtitle.textHy}
              </p>
            </div>

            <button
              onClick={togglePlay}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#250311] font-black text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>ԴԱԴԱՐ (PAUSAR)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>ՆՎԱԳԱՐԿԵԼ ԱՈՒԴԻՈ (REPRODUCIR AUDIO)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Looping indicator badge */}
        {isLoopingPhrase && repeatPhraseRange && (
          <div className="absolute top-3 left-3 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 z-30 animate-pulse">
            <Repeat className="w-3.5 h-3.5" />
            <span>Repitiendo frase ({formatTime(repeatPhraseRange.start)} - {formatTime(repeatPhraseRange.end)})</span>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-[#250311] space-y-3">
        {/* Timeline Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#FFD166] min-w-[40px]">
            {formatTime(localTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 800}
            value={localTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#650D32] accent-[#FFD166]"
          />
          <span className="text-xs font-mono text-white/60 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Buttons and Speeds */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleJump(-5)}
              className="p-2 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white transition-colors cursor-pointer border border-white/10"
              title="Retroceder 5 segundos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FF922B] text-[#650D32] font-black text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSAR</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>REPRODUCIR</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleJump(5)}
              className="p-2 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white transition-colors cursor-pointer border border-white/10"
              title="Avanzar 5 segundos"
            >
              <span className="text-xs font-bold">+5s</span>
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-white transition-colors cursor-pointer border border-white/10 ml-1"
              title={isMuted ? 'Desactivar silencio' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#E63946]" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Repeat Phrase & Speed Selector */}
          <div className="flex items-center gap-2">
            {repeatPhraseRange && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsLoopingPhrase(!isLoopingPhrase);
                  if (isLoopingPhrase && onClearRepeat) onClearRepeat();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isLoopingPhrase
                    ? 'bg-[#E63946] text-white border-white/30 shadow-md'
                    : 'bg-[#650D32] text-[#FFD166] border-[#FFD166]/30 hover:bg-[#990F32]'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{isLoopingPhrase ? 'Repitiendo frase' : 'Repetir frase'}</span>
              </button>
            )}

            {/* Speed Selector */}
            <div className="flex items-center bg-[#650D32] p-1 rounded-xl border border-white/10">
              <Gauge className="w-3.5 h-3.5 text-white/50 ml-1.5 mr-1" />
              {[0.75, 1, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    playbackRate === speed
                      ? 'bg-[#FFD166] text-[#650D32]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Server toggle */}
            <button
              onClick={() => {
                soundManager.playClick();
                setUseNoCookie(!useNoCookie);
              }}
              className="px-2.5 py-1 rounded-xl bg-[#650D32] hover:bg-[#990F32] text-[11px] font-bold text-white/80 hover:text-[#FFD166] border border-white/10 transition-colors cursor-pointer"
              title="Փոխել YouTube սերվերը (youtube.com / youtube-nocookie.com)"
            >
              {useNoCookie ? 'Servidor 2' : 'Servidor 1'}
            </button>
          </div>
        </div>

        {/* Helpful fallback bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/70 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#FFD166] shrink-0" />
            <span>Եթե YouTube-ը բրաուզերում չի բացվում, սեղմեք վերևի «<strong>Audio & Diálogo</strong>» կամ «<strong>YouTube ▶</strong>»</span>
          </div>
          <span className="font-mono text-[#FFD166]">⏱ 00:15 - 13:20</span>
        </div>
      </div>
    </div>
  );
};
