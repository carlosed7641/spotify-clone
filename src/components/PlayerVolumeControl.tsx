
import { useRef } from "react"
import { Slider } from "@/components/Slider"
import { VolumeMedium, VolumeSilenced } from "@/icons/VolumeIcons"
import { usePlayerStore } from "@/store/playerStore"

export const PlayerVolumeControl = () => {

    const { volume, setVolume } = usePlayerStore()
    const previousVolumeRef = useRef(volume)
    const isVolumeSilenced = volume < 0.1

    const handleClickVolume = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current)
        } else {
            previousVolumeRef.current = volume
            setVolume(0)
        }
    }

    return (
        <div className="flex justify-center gap-x-2">
            <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
                {isVolumeSilenced ? <VolumeSilenced /> : <VolumeMedium />}
            </button>
            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px]"
                onValueChange={(value) => {
                    const [newVolume] = value
                    const volumeValue = newVolume / 100;
                    setVolume(volumeValue)
                }}
            />
        </div>

    )
}