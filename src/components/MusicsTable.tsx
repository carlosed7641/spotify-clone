import { TimeIcon } from '@/icons/MusicsTableIcons'
import { type Song } from '@/lib/data'
import { usePlayerStore } from '@/store/playerStore'


const isCurrentSongFn = (song: Song) => {
    const {song: currentSong, playlist} = usePlayerStore(state => state.currentMusic)
    return currentSong?.id == song.id && playlist?.albumId == song.albumId
}

  
export const MusicsTable = ({ songs }: { songs: Song[] }) => {

    return (
        <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
            <thead className="">
                <tr className="text-zinc-400 text-sm font-light">
                    <th className="px-4 py-2 font-light">#</th>
                    <th className="px-4 py-2 font-light">Título</th>
                    <th className="px-4 py-2 font-light">Álbum</th>
                    <th className="px-4 py-2 font-light"><TimeIcon /></th>
                </tr>
            </thead>
            <tbody>
                <tr className="h-[16px]"></tr>
                {
                    songs.map((song, index) => {
                        const isCurrentSong = isCurrentSongFn(song)
                        return (
                            <tr className="text-gray-300 text-sm font-light cursor-pointer 
                        hover:bg-white/10 overflow-hidden transition duration-100">
                                <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-[5%]">{index + 1}</td>
                                <td className="px-4 py-2 flex gap-3">
                                    <picture className="">
                                        <img
                                            src={song.image}
                                            alt={song.title}
                                            className="w-11 h-11"
                                        />
                                    </picture>
                                    <div className="flex flex-col">
                                        <h3 className={
                                            `text-base font-normal
                                            ${isCurrentSong ? "text-green-400" : "text-White"}
                                            `
                                          }
                                        >{song.title}</h3>
                                        <span>{song.artists.join(", ")}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 w-[45%]">{song.album}</td>
                                <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}