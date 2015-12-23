var $ = require('jquery');
var React = require('react');

var TrackItem = React.createClass({
    render: function() {
        return (
            <ul>
                <li className="albumItem-titleLink" key={this.props.item.id} id={this.props.item.id}>{this.props.item.name}</li>
            </ul>
        );
    }
});

var AlbumItem = React.createClass({
    loadTracksFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({
                    trackList: data.items
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    trackChange: function(e){
        //console.log('https://api.spotify.com/v1/albums/' + e.target.id + '/tracks');
        this.setState({
            url: 'https://api.spotify.com/v1/albums/' + e.target.id + '/tracks'
        }, this.loadTracksFromServer);
    },

    getInitialState: function() {
        return {
            trackList: []
        };
    },

    render: function() {
        return (
            <ul>
                <li className="albumItem-titleLink" key={this.props.item.id} id={this.props.item.id} onClick={this.trackChange}>{this.props.item.name}</li>
                {this.state.trackList.map(function(item) {
                    return <TrackItem item={item} />;
                })}
            </ul>
        );
    }
});

var ArtistItem = React.createClass({
    loadAlbumsFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({
                    albumList: data.items
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    albumChange: function(e){
        //console.log('https://api.spotify.com/v1/artists/' + e.target.id + '/albums');
        this.setState({
            url: 'https://api.spotify.com/v1/artists/' + e.target.id + '/albums'
        }, this.loadAlbumsFromServer);
    },

    getInitialState: function() {
        return {
            albumList: []
        };
    },

    render: function() {
        return (
            <ul>
                <li className="artistItem-titleLink" key={this.props.item.id} id={this.props.item.id} onClick={this.albumChange}>{this.props.item.name}</li>
                {this.state.albumList.map(function(item) {
                    return <AlbumItem item={item} />;
                })}
            </ul>
        );
    }
});


var SearchArtist = React.createClass({
    loadArtistsFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({
                    artistList: data.artists.items
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    artistChange: function(e){
        if (e.target.value != "") {
            this.setState({
                url: 'https://api.spotify.com/v1/search?q=' + e.target.value + '&type=artist'
            }, this.loadArtistsFromServer);
        } else {
            this.setState({
                artistList: []
            });
        }
    },

    getInitialState: function() {
        return {
            artistList: []
        };
    },

    render: function() {
        return (
            <div className="artistContent">
                <input type="text" onChange={this.artistChange} placeholder="Type here" />
                {this.state.artistList.map(function(item) {
                    return <ArtistItem item={item} />;
                })}
            </div>
        );
    }
});


React.render(<SearchArtist />, $('#content')[0]);