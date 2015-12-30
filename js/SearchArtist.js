var $ = require('jquery');
var ArtistItem = require('./ArtistItem');
var AlbumItem = require('./AlbumItem');
var TrackItem = require('./TrackItem');
var React = require('react');

var SearchArtist = React.createClass({
    loadDataFromServer: function(url, type) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (type == 'artist') {
                    data = data.artists;
                    console.log(data);
                }

                data.items.sort(function (itemA, itemB) {
                    if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                        return 1;
                    }

                    if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });

                if (type == 'artist') {
                    this.setState({
                        artistList: data.items,
                        trackList: [],
                        selectedArtist: '',
                        selectedAlbum: ''
                    });
                }

                if (type == 'album') {
                    this.setState({
                        albumList: data.items,
                        trackList: [],
                        selectedAlbum: ''
                    });
                }

                if (type == 'tracks') {
                    this.setState({
                        trackList: data.items
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    artistChange: function(e){
        if (e.target.value != "") {
            this.setState({
                albumList: [],
                trackList: [],
                selectedAlbum: '',
                artistSearch: e.target.value
            }, this.loadDataFromServer('https://api.spotify.com/v1/search?q=' + e.target.value + '&type=artist', 'artist'));
        } else {
            this.setState({
                artistList: [],
                albumList: [],
                trackList: [],
                selectedArtist: '',
                selectedAlbum: '',
                artistSearch: ''
            });
        }
    },

    setSelectedArtist: function(e){
        this.setState({
            selectedArtist: e
        });
    },

    setSelectedAlbum: function(e){
        this.setState({
            selectedAlbum: e
        });
    },

    getInitialState: function() {
        return {
            artistList: [],
            albumList: [],
            trackList: [],
            selectedArtist: '',
            selectedAlbum: '',
            artistSearch: ''
        };
    },

    render: function() {
        React.render(<ArtistItem artistList={this.state.artistList} loadDataFromServer={this.loadDataFromServer} setSelectedArtist={this.setSelectedArtist} selectedArtist={this.state.selectedArtist} artistSearch={this.state.artistSearch} />, $('#artist-content')[0]);
        React.render(<AlbumItem albumList={this.state.albumList} loadDataFromServer={this.loadDataFromServer} setSelectedAlbum={this.setSelectedAlbum} selectedAlbum={this.state.selectedAlbum} />, $('#album-content')[0]);
        React.render(<TrackItem trackList={this.state.trackList} />, $('#track-content')[0]);
        return (
            <div className="group">
                <input type="text" onChange={this.artistChange} placeholder="Artiste recherché" />
                <span className="highlight"></span>
                <span className="bar"></span>
            </div>
        );
    }
});


React.render(<SearchArtist />, $('#search-artist')[0]);