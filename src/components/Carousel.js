import React from 'react';
import '../styles/components/carousel.scss';
import { useEffect } from 'react';
import { useState } from 'react';

function Carousel({teams}) {
    const teamRefs = new Map(teams.map((team, index) => [index, React.createRef()]));
    const carouselContainer = React.createRef();
    
    const [touchStart, setTouchStart] = useState(() => {
        return 0;
    });

    const [touchEnd, setTouchEnd] = useState(() => {
        return 0;
    });

    const [currentPosition, setCurrentPosition] = useState(() => {
        return 1;
    })
    useEffect(() => {
        if (touchEnd !== touchStart) {
            if (touchEnd < touchStart) {
                setCurrentPosition(Math.min(currentPosition + 1, teams.length-1));
            } else {
                setCurrentPosition(Math.max(currentPosition - 1, 0));
            }
        }
    }, [touchEnd])


    useEffect(() => {
        carouselContainer.current.scrollTo({
            top: 0, 
            left: teamRefs.get(currentPosition).current.offsetLeft - ((window.screen.width * 0.2)/2), 
            behavior: 'smooth'
        });
    }, [currentPosition])

    
    useEffect(() => {
        carouselContainer.current.addEventListener('touchstart', (event) => handleTouchStart(event))
        carouselContainer.current.addEventListener('touchend', handleTouchEnd)
    }, [])

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    }


    const handleTouchEnd = (e) => {
        setTouchEnd(e.changedTouches[0].clientX);
    }

   
    return(
        <div className="carousel-container" ref={carouselContainer}>
            {
                teams.map((team, _index) => {
                    return <div className="carousel-item" key={team.id} ref={teamRefs.get(_index)}>
                        <p>{team.name}</p>
                        {/* <img className="photo" src={image.image} alt={image.id} key={image.id} ref={imageRefs.get(_index)}></img> */}
                    </div>
                })
            }
        </div>
    );
}

export default Carousel;