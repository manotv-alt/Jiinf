import hand from '../assets/handball.png'

export function ResultTable() {

    const Team1 = {
        logo: hand,
        score: '0',
        name: 'meu pau',
    }

    const Team2 = {
        logo: hand,
        score: '0',
        name: 'piru',
    }

    const Jogo = {
        name: 'Handeball',
        category: 'Feminino',
        team1: Team1,
        team2: Team2,
        location: 've se nao grita',
        schedule:  '19:30',
        state: 'finalizado',
    }
        
    return (
        <div className="flex justify-center items-center px-4 bg-jiinf-primary w-10/12 h-[160px] border-white rounded-xl">
            <div className='flex flex-row w-1/4 h-1/3'>
                <img src={hand} alt="sport-icon"/>
                <div className='flex flex-col justify-center text-white font-semibold text-xl items-center'>
                    <h2>{Jogo.name}</h2>
                    <h2>{Jogo.category}</h2>
                </div>
            </div>

            <div className='flex flex-row justify-between'>
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <figure className='flex w-1/6 justify-center items-center rounded-full ring-2 ring-white'>
                        <img src={Jogo.team1.logo} alt="team1-logo" className='flex w-full h-full'/>
                    </figure>

                    <h3>{Jogo.team1.name}</h3>
                    <h3>{Jogo.team1.score}</h3>
                </div>

                <h2 className='flex justify-center items-center font-bold text-5xl'>VS</h2>

                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <figure className='flex w-1/6 justify-center items-center rounded-full ring-2 ring-white'>
                        <img src={Jogo.team1.logo} alt="team1-logo" className='flex w-full h-full'/>
                    </figure>

                    <h3>{Jogo.team1.name}</h3>
                    <h3>{Jogo.team1.score}</h3>
                </div>
            </div>

            <div className='flex flex-col justify-between h-full w-full'>
                 <h3>{Jogo.location}</h3>
                 <h3>{Jogo.schedule}</h3>
                 <h3 className='flex p-2 rounded-xl ring-1 ring-white'>{Jogo.state}</h3>
            </div>

        </div>
    )
}