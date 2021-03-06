import React, { Component } from 'react';
import axios from 'axios';
import Results from '../components/Result/Results.js';
import MissingCompany from '../components/MissingCompany';


class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], fetching: false, error: null }
        this.loadResultsFromServer = this.loadResultsFromServer.bind(this);
        this.findDataForURL = this.findDataForURL.bind(this);
    }

    getInitialState() {
        return {
            data: null,
            fetching: false,
            error: null
        };
    }

    loadResultsFromServer() {
        axios.get(this.props.url).then(res => {
            let urlData = this.findDataForURL(res.data, this.props.site);
            this.setState({ data: urlData, fetching: false});
        }).catch(res => {
            this.setState({error: res.data, fetching: false});
        });
    }

    findDataForURL(data, url) {
        for(var elt of data) {
            if(elt.domain === url) {
                return elt;
            }
        }
    }

    render() {
        if (this.props.fetching) {
            return <div> Loading...</div>;
        }

        if (this.props.error) {
            return (
                <div className = 'error'>
                    {this.state.error.message}
                </div>
            );
        }

        if (this.state.data === undefined) {
            return <MissingCompany />
        }

        return (
            <Results data={ this.state.data } />
            )

    }

    componentDidMount() {
        this.setState({fetching: true});
        this.loadResultsFromServer();
        setInterval(this.loadResultsFromServer, this.props.pollInterval);
    }

}

export default ResultsContainer;