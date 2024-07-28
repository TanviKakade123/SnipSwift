import React, {Component} from 'react';

import { 
    Container,
    Row,
    Col
} from 'react-bootstrap';

import TypewriterEffect from "react-typewriter-effect";
import AOS from 'aos';




import '../assets/scss/home.scss';

class Home extends Component {
    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <Container className='homepage'>
                <Row>
                    <Col lg={9} className='order-2 order-sm-1'>
                        <div className='typewriter1'>
                            <TypewriterEffect
                                textStyle={
                                    { fontWeight: 'bold', fontSize: '5rem', marginBottom: '2rem', lineHeight: '1.2' }
                                }
                                startDelay={100}
                                cursorColor="black"
                                text="Hi there, I'm SnipSwift"
                                typeSpeed={50}
                                hideCursorAfterText={true}
                            />
                        </div>

                        <div className='typewriter2'>
                            <TypewriterEffect
                                textStyle={
                                    { fontWeight: '400', fontSize: '1.2rem', marginBottom: '2rem' }
                                }
                                startDelay={1000}
                                cursorColor="black"
                                text="Welcome to SnipSwift, your ultimate solution for summarizing YouTube transcripts effortlessly.

                                Are you tired of sifting through lengthy YouTube transcripts to extract key information? Say goodbye to hours of manual labor with SnipSwift. Our innovative platform condenses lengthy transcripts into concise summaries, saving you valuable time and effort.
                                                                
                                Experience the power of simplicity with SnipSwift today. Say hello to streamlined content consumption and goodbye to information overload. Join SnipSwift and unlock a world of efficiency in video content analysis."
                                typeSpeed={20}
                                hideCursorAfterText={true}
                            />
                        </div>
                        
                    </Col>
                    
                </Row>
                <Row>
                    
                </Row>
            </Container>
        );
    }
}

export default Home;