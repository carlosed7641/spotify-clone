import type { Playlist, Song } from '@/lib/data'
import { create } from 'zustand'

export interface CurrentMusic {
    playlist: Playlist | null,
    song: Song | null,
    songs: Song[]
}

interface IPlayerStore {
    isPlaying: boolean,
    currentMusic: CurrentMusic,
    setIsPlaying: (isPlaying: boolean) => void,
    setCurrentMusic: (currentMusic: CurrentMusic) => void,
    volume: number
    setVolume: (volume: number) => void
}
 
export const usePlayerStore = create<IPlayerStore>()((set) => ({
    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    volume: 0.2,
    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ currentMusic })
}))

