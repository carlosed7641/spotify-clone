import { Pause, Play } from "@/icons/PlayerIcons"
import { usePlayerStore } from "@/store/playerStore"

interface CardPlayButtonProps {
    id: string
    size?: "small" | "large"
}


export const CardPlayButton = ({ id, size = "small" }: CardPlayButtonProps) => {

    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore()

    const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id

    const handleClick = () => {

        if(isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }

       fetch(`/api/get-info-playlist?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const { songs, playlist } = data
            setIsPlaying(true)
            setCurrentMusic({ playlist, song: songs[0], songs})
            
        })
    }

    const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5"

    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 
        hover:scale-105 transition hover:bg-green-400">
            {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
        </button>
    )
}