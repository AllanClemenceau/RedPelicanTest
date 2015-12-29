var $ = require('jquery');
var ArtistItem = require('./ArtistItem');
var AlbumItem = require('./AlbumItem');
var TrackItem = require('./TrackItem');
var React = require('react');

var SearchArtist = React.createClass({
    loadArtistsFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                data.artists.items.sort(function(itemA, itemB) {
                    if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                        return 1;
                    }

                    if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });
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
            React.render(<div><ul id="no-artist"><li>Aucun artiste ne correspond à votre recherche</li></ul></div>, $('#artist-content')[0]);
            this.setState({
                url: 'https://api.spotify.com/v1/search?q=' + e.target.value + '&type=artist',
                albumList: [],
                trackList: [],
                selectedAlbum: ''
            }, this.loadArtistsFromServer);
        } else {
            React.render(<div><ul id="no-artist"><li>Aucune recherche en cours</li></ul></div>, $('#artist-content')[0]);
            this.setState({
                artistList: [],
                albumList: [],
                trackList: [],
                selectedArtist: '',
                selectedAlbum: ''
            });
        }
    },

    onClickArtist: function(albumList){
        this.setState({
            albumList: albumList,
            trackList: [],
            selectedAlbum: ''
        });
    },

    onClickAlbum: function(trackList){
        this.setState({
            trackList: trackList
        });
    },

    getInitialState: function() {
        return {
            artistList: [],
            albumList: [],
            trackList: [],
            selectedArtist: '',
            selectedAlbum: ''
        };
    },

    render: function() {
        /*
        $('#artist-content > div > ul.selected').removeClass('selected');
        */
        React.render(<ArtistItem artistList={this.state.artistList} onClickArtist={this.onClickArtist} selectedArtist={this.state.selectedArtist} />, $('#artist-content')[0]);
        React.render(<AlbumItem artistList={this.state.albumList} onClickAlbum={this.onClickAlbum} selectedAlbum={this.state.selectedAlbum} />, $('#album-content')[0]);
        React.render(<TrackItem artistList={this.state.trackList} />, $('#track-content')[0]);
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