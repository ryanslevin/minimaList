import React from 'react'

import Particle from 'react-particles-js'
import Particles from 'react-particles-js'


const Background = () => {

    return (
        <div className="background-container">
        <Particles 
            className='particle'
            params={{
                "particles": {
                    "number": {
                        "value": 3,
                        "density": {
                            "enable": false
                        }
                    },
                    "shape": {
                        "polygon": {
                            "nb_sides": 6
                        },
                        "type": "polygon"
                    },
                    "size": {
                        "value": 100
                    },
                    "move": {
                        "direction": "none",
                        "out_mode": "out",
                        "speed": 2
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "opacity": {
                        "anim": {
                            "enable": false
                        },
                        "value": 0.0125
                    }
                },
                "interactivity": {
                    "events": {
                        "onclick": {
                            "enable": false,
                            "mode": "remove"
                        }
                    },
                    "modes": {
                        "remove": {
                            "particles_nb": 10
                        }
                    }
                }
            }} />
            </div>


    )

}

export default Background;