import '../styles/credit.css'
import pokeapi from '../public/pokeapi.png'
import github from '../public/github-logo.png'

const Information = () => {
    return (
        <div className='container_credits overflow-hidden'>
            <div class="top-center-text font-extrabold">Credits</div>
            <div className='bg-[#fceea7] relative top-[150px] min-h-[185px] max-w-[325px] justify-self-center rounded-lg'>
            <div className='text-xl font-black flex text-center justify-center p-5'>
                Ramisha Chowdhury<br></br>
                Aaleia Fernado<br></br>
                Maya Jamaddar<br></br>
                Michelle Wen<br></br>
                Gavin Xiao<br></br>
            </div>

            </div>

            <a href='https://pokeapi.co' className='flex justify-center top-[600px] right-[75px] relative'>
                <img src={pokeapi} alt='pokeapi logo' className='w-[125px] h-[75px]' />
            </a>

            <a href='https://github.com/xiaogavin-dev/finalproject-csci39548' className='flex justify-center relative top-[525px] left-[75px]'>
                <img src={github} alt='github logo' className='w-[75px] h-[75px]' />
            </a>
        </div>
    );
}

export default Information;