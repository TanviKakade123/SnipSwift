import React, { Component } from 'react';
import braille from 'braille';
import { 
    Container,
    Row,
    Col,
    DropdownButton,
    Dropdown,
    Button
} from 'react-bootstrap';

import TypewriterEffect from "react-typewriter-effect";
import AOS from 'aos';

import '../assets/scss/home.scss';

// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

class TextDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'English',
            displayText: props.texts[0], // Initialize displayText with the default text
            key: 1, // Key for triggering component rebuild
            isSpeaking: false // Flag to indicate whether text-to-speech is active
        };
        this.synth = window.speechSynthesis;
        this.synth.onvoiceschanged = this.populateVoices;
        this.voices = [];
    }

    componentDidMount() {
        AOS.init();
    }

    populateVoices = () => {
        this.voices = this.synth.getVoices();
    }

    handleLanguageChange = (language) => {
        let newText;
        if (language === 'English') {
            newText = this.props.texts[0];
        } else if (language === 'Hindi') {
            newText = this.props.texts[1];
        } else if (language === 'Gujarati') {
            newText = this.props.texts[2];
        } else if (language === 'Braille') {
            const brailleText = braille.toBraille(this.props.texts[0]);
            // Split Braille text into lines
            const lines = [];
            for (let i = 0; i < brailleText.length; i += 10) {
                lines.push(brailleText.substr(i, 10));
            }
            newText = lines.join('\n');
        }
        this.setState(prevState => ({
            selectedLanguage: language,
            displayText: newText,
            key: prevState.key + 1 // Incrementing key to trigger component rebuild
        }), () => {
            if (this.state.isSpeaking) {
                this.speakText(newText);
            }
        });
    }

    speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        // Set voice if available
        if (this.voices.length > 0) {
            utterance.voice = this.voices.find(voice => voice.lang === 'en-US'); // Adjust language as needed
        }
        this.synth.speak(utterance);
    }

    toggleTextToSpeech = () => {
        this.setState(prevState => ({
            isSpeaking: !prevState.isSpeaking
        }), () => {
            if (this.state.isSpeaking) {
                this.speakText(this.state.displayText);
            } else {
                this.synth.cancel();
            }
        });
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([this.state.displayText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
       
        if (this.state.selectedLanguage === 'English') {
            element.download = "English.txt";
        } else if (this.state.selectedLanguage === 'Hindi') {
            element.download = "Hindi.txt";
        } else if (this.state.selectedLanguage === 'Gujarati') {
            element.download = "Gujarati.txt";
        } else if (this.state.selectedLanguage === 'Braille') {
            element.download = "Braille.txt";
        }
        
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    }

    render() {
        const { selectedLanguage, displayText, key, isSpeaking } = this.state;

        const textStyle = { fontWeight: '400', fontSize: '1rem', marginBottom: '2rem' };

        return (
            <Container className='homepage'>
                <Row className='justify-content-center'>
                    <Col lg={12} className='order-2 order-sm-1'>
                        <div className='text-center' style={{ marginBottom: '20px',marginTop:'20px' }}>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedLanguage}
                                onSelect={this.handleLanguageChange}
                                variant='dark'
                            >
                                <Dropdown.Item eventKey="English">English</Dropdown.Item>
                                <Dropdown.Item eventKey="Hindi">Hindi</Dropdown.Item>
                                <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
                                <Dropdown.Item eventKey="Braille">Braille</Dropdown.Item>
                            </DropdownButton>
                            <Button onClick={this.toggleTextToSpeech} variant={isSpeaking ? 'success' : 'red'} style={{ marginLeft: '10px' }}>
                                <FontAwesomeIcon icon={isSpeaking ? faVolumeMute : faVolumeUp} />
                            </Button>
                            <Button onClick={this.downloadTxtFile} variant="dark" style={{ marginLeft: '10px' }}>
                                Download as .txt
                            </Button>
                        </div>
                        <div className='typewriter' key={key}>
                            <TypewriterEffect
                                textStyle={textStyle}
                                text={displayText}
                                cursorColor="black"
                                typeSpeed={1}
                                hideCursorAfterText={true}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TextDisplay;
