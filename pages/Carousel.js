import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function Carousel({Video, CarouselImg, Url, Name, Softwares}){

    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay: (Math.floor(Math.random() * 4000) + 3000)})]);

    return(
        <div className="ProjectContainer" >  
                <div className="embla" ref={emblaRef}>             
                    <div className="ProjectImage Loader embla__container" style={{position: 'relative'}}>
                        {Video}
                        {CarouselImg}
                    </div>
                </div>
                <a className='ProjectLink' target="_blank" rel="noreferrer" href={Url}>
                    <div className="ProjectContent">
                        <div className="ProjectIcon Loader">
                            <Image width={36} height={36} alt="Lucas Pires" src="https://theme.lucasarts.fr/user.jpg" />
                        </div>
                        <div className='ProjectTexte'>                        
                            <h3>{Name}</h3>
                            <span>{Softwares?.join(' • ')}</span>
                        </div>
                    </div>                
                </a>
            </div>
    )
}