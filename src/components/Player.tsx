
import { Pause, Play } from '@/icons/PlayerIcons';
import { usePlayerStore } from '@/store/playerStore';
import { useEffect, useRef, useState } from  'react'
import { PlayerVolumeControl } from './PlayerVolumeControl';
import { Slider } from './Slider';

interface CurrentSongProps {
  image: string,
  title: string
  artists: string[]
}

interface SongControlProps {
  audio: React.RefObject<HTMLAudioElement>
}


const SongControl = ({ audio }: SongControlProps) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
      audio?.current?.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
          audio.current?.removeEventListener('timeupdate', handleTimeUpdate)
      }
  }, [])

  const handleTimeUpdate = () => {
      setCurrentTime(audio.current!.currentTime)
  }

  const formatTime = (time: number) => {
    if (!time) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  const duration = audio?.current?.duration ?? 0

  return (
      <div className="flex gap-x-3 text-xs pt-2">
          <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>
          <Slider
              defaultValue={[0]}
              min={0}
              max={audio?.current?.duration ?? 0}
              value={[currentTime]}
              className="w-[450px]"
              onValueChange={(value) => {
                if (audio.current) {
                  audio.current.currentTime = value[0]
                }
              }}
          />
          <span className="opacity-50 w-12">{formatTime(duration)}</span>
      </div>
  )
}

const CurrentSong = ({ image, title, artists }: CurrentSongProps) => {
  return (
    <div className={`
      flex items-center gap-5 relative
      overflow-hidden
    `}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
          <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">
          {title}
        </h3>
        <span className="text-xs opacity-80">
          {artists.join(', ')}
        </span>
      </div>

    </div>
  )
}

export const Player = () => {

  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying 
      ? audioRef.current?.play()
      : audioRef.current?.pause()
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current!.src = src;
      audioRef.current!.volume = volume
      audioRef.current?.play();
    }

  }, [currentMusic]);


  const handleClick = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div>
          <CurrentSong 
            image={currentMusic.song?.image || ''} 
            title={currentMusic.song?.title || ''} 
            artists={currentMusic.song?.artists || []}
          />
      </div>

      <div className="grid place-content-center gap-4 flex-1 pt-2">
       <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
       </div>
      </div>

      <div className="grid place-content-center">
        <PlayerVolumeControl />
      </div>
    </div>
  )
}
