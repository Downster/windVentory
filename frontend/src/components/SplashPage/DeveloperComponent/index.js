import './developer.css'


const DeveloperComponent = () => {
    return (
        <div className='developer'>
            <div className='left-dev-div'>

                <a className='windVentory' target="_blank"
                    href='https://github.com/Downster/SoundClout'>
                    © 2022 | windVentory
                </a>
            </div>
            <div className='right-dev-div'>

                <p className='developed-by'>  Developed by Brendan Downing </p>
                <span>
                    <a target="_blank"
                        href='https://github.com/Downster'>
                        <i className='fab fa-github' />
                    </a>
                </span>
                <span>
                    <a target="_blank"
                        href='https://www.linkedin.com/in/brendan-downing-641672228/'>
                        <i className='fab fa-linkedin' />
                    </a>
                </span>
            </div>
        </div>
    )
}

export default DeveloperComponent