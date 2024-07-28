import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../assets/scss/input.css'; // Import the CSS file
import TextDisplay from '../contents/TextDisplay'; // Import TextDisplay component
import { Spinner } from 'react-bootstrap'; // Import Spinner component from react-bootstrap

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            index: this.props.value,
            texts: [], // Added state to store fetched texts
            submitted: false, // Added state to track whether the form is submitted
            loading: false // Added state to track loading state
        };
        console.log(this.state.value);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { value, index } = this.state;

        // Set loading state to true when starting the fetch
        this.setState({ loading: true });

        let finalURL;
        if (index === '1') {
            finalURL = `http://127.0.0.1:5000/transcript?url=${value}`;
        } else if (index === '2') {
            finalURL = `http://127.0.0.1:5000/abstractive_summary?url=${value}`;
        } else {
            finalURL = `http://127.0.0.1:5000/extractive_summary?url=${value}`;
        }

        try {
            const response = await fetch(finalURL);
            const result = await response.json();
            let textTemp;
            if (index === '1') {
                textTemp = [result.data.original_trans, result.data.original_trans_hin, result.data.original_trans_guj];
            } else if (index === '2') {
                textTemp = [result.data.abstractive_data.eng_summary, result.data.abstractive_data.hind_summary, result.data.abstractive_data.guj_summary];
            } else {
                textTemp = [result.data.extractive_data.eng_summary, result.data.extractive_data.hind_summary, result.data.extractive_data.guj_summary];
            }

            this.setState({ texts: textTemp, submitted: true, loading: false });
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors here
            this.setState({ loading: false });
        }
    }

    render() {
        const { texts, submitted, loading } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label className="input-field">
                        <input type="text" value={this.state.value} onChange={this.handleChange} className="input-field" placeholder="Enter YouTube link" />
                    </label>
                    <button type="submit" className="submit-button" style={{ marginTop: '10px' }}>Generate</button>
                </form>
                {/* Conditionally render Spinner component based on the 'loading' state */}
                {loading && (
                    <div style={{ marginTop: '120px', textAlign: 'center', color: "#C85946" }}>
                        <Spinner animation="border" role="status" style={{ width: '100px', height: '100px' }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}
                {/* Conditionally render TextDisplay based on the 'submitted' state */}
                {submitted && !loading && <TextDisplay texts={texts} />}
            </div>
        );
    }
}

export default withRouter(InputField);
