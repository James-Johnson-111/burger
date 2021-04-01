import React, { Component } from 'react';
import './Error404.css';
import {Link} from 'react-router-dom';

class Error404 extends Component {

    render() {

        return (
            <div className="text-center pt-5 error404">
                <h1 className="display-1 mt-5">404</h1>
                <h3>Page not found</h3>
                <p className="text-secondary">Unvalid URL enter by the user, this URL does not exists in this website.</p>
                <Link className="px-4" to="/">Go Home</Link>
            </div>
        );
    };
};

export default Error404;