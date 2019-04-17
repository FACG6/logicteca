import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export class Search extends Component {
    state = {
        input: ' ',
    }
    render() {
        return (

            <div className='search'>
                <button className='search__btn' type="submit">
                    <FontAwesomeIcon className='search__icon' icon='search' />
                </button>
                <input className='search__input'  type="text" placeholder="  Search.." name="search" />
            </div>

        );
    }
}
