import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './EditBookmark.css';

class EditBookmark extends Component {
    static contextType = BookmarksContext;
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            url: '',
            description: '',
            rating: 1
        }
    }
    componentDidMount() {
        this.setState({ error: null });
        const { bookmarkId } = this.props.match.params;

        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    id: data.id,
                    title: data.title,
                    url: data.url,
                    description: data.description,
                    rating: data.rating
                })
            })
            .catch(error => this.setState(error))

    }
    updateTitle(title) {
        this.setState({ title: title })
    }
    updateUrl(url) {
        this.setState({ url: url })
    }
    updateDescription(description) {
        this.setState({ description: description })
    }
    updateRating(rating) {
        this.setState({ rating: rating })
    }
    handleSubmit(e) {
        e.preventDefault();
        const { bookmarkId } = this.props.match.params;
        const { id, title, url, description, rating } = this.state;
        const newBookmark = { id, title, url, description, rating };
        this.setState({ error: null });
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                this.resetFields(newBookmark);
                this.context.updateBookmark(newBookmark);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error: error })
            })
    }

    resetFields = newFields => {
        this.setState({
            id: newFields.id || '',
            title: newFields.title || '',
            url: newFields.url || '',
            description: newFields.description || '',
            rating: newFields.rating || '',
        })
    }
    handleClickCancel = () => {
        this.props.history.push('/')
    }
    render() {
        const { error, title, url, description, rating } = this.state;

        return (
            <section className='EditBookmark'>
                <h2>Edit bookmark</h2>
                <form
                    className='EditBookmark__form'
                    onSubmit={e => handleSubmit(e)}
                >
                    <div className='EditBookmark__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>

                    <label htmlFor='title'>
                        Title
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={e => updateTitle(e.target.value)}
                    />
                    <label htmlFor='url'>
                        URL
                    </label>
                    <input
                        type='url'
                        name='url'
                        id='url'
                        value={url}
                        onChange={e => updateUrl(e.target.value)}
                    />
                    <label htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChange={e => updateDescription(e.target.value)}
                    />
                    <label htmlFor='rating'>
                        Rating
                    </label>
                    <input
                        type='number'
                        name='rating'
                        id='rating'
                        min='1'
                        max='5'
                        value={rating}
                        onChange={e => updateRating(e.target.value)}
                    />
                    <div className='EditBookmark__buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button type='button'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default EditBookmark;