import React, { Component } from 'react';

import InputField from '../components/Input';
import TypewriterEffect from "react-typewriter-effect";

class Abstractive extends Component {
    render () {
       

        return (
            <div className="container">
                <TypewriterEffect
                                textStyle={
                                    { fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2',textAlign: 'center'}
                                }
                                startDelay={100}
                                cursorColor="black"
                                text="Abstractive Summary Generator"
                                typeSpeed={50}
                                hideCursorAfterText={true}
                            />
                   
                   <InputField value='2'></InputField>
                </div>
          
        );
    }
}

export default Abstractive;
