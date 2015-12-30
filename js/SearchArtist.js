var $ = require('jquery');
var ArtistItem = require('./ArtistItem');
var AlbumItem = require('./AlbumItem');
var React = require('react');

function TrackItem(props) {
    rows = [];
    {props.trackList.map(function(item) {
        rows.push(
            <ul>
                <li id={item.id} key={item.id}>{item.name}</li>
            </ul>
        )
    })}

    if (rows.length == 0) {
        rows = <ul className="no-result"><li>Merci de sélectionner un album</li></ul>;
    }

    return (
        <div>{rows}</div>
    );
}

var SearchArtist = React.createClass({
    loadDataFromServer: function(url, type) {
        if (url == '') {
            if (type == 'artist') {
                this.setState({
                    artistList: [],
                    albumList: [],
                    trackList: [],
                    selectedArtist: '',
                    selectedAlbum: ''
                });
            }

            if (type == 'album') {
                this.setState({
                    albumList: [],
                    trackList: [],
                    selectedAlbum: ''
                });
            }

            if (type == 'tracks') {
                this.setState({
                    trackList: []
                });
            }

            return false;
        }

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (type == 'artist') {
                    data = data.artists;
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
                        albumList: [],
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
        var url = 'https://api.spotify.com/v1/search?q=' + e.target.value + '&type=artist';
        if (e.target.value == '') {
            url = '';
        }

        this.setState({
            artistSearch: e.target.value
        }, this.loadDataFromServer(url, 'artist'));
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
        if (this.state.artistSearch == '') {

        }

        return (
            <div>
                <div id="search-artist" className="group">
                    <div className="group">
                        <input type="text" onChange={this.artistChange} placeholder="Artiste recherché" />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                    </div>
                </div>
                <div className="table-responsive-vertical shadow-z-1">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Artistes</th>
                                <th>Albums</th>
                                <th>Tracks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="artist-content">
                                        <ArtistItem artistList={this.state.artistList} loadDataFromServer={this.loadDataFromServer} setSelectedArtist={this.setSelectedArtist} selectedArtist={this.state.selectedArtist} artistSearch={this.state.artistSearch} />
                                    </div>
                                </td>
                                <td>
                                    <div id="album-content">
                                        <AlbumItem albumList={this.state.albumList} loadDataFromServer={this.loadDataFromServer} setSelectedAlbum={this.setSelectedAlbum} selectedAlbum={this.state.selectedAlbum} />
                                    </div>
                                </td>
                                <td>
                                    <div id="track-content">
                                        <TrackItem trackList={this.state.trackList} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

React.render(<SearchArtist />, $('#artists-data')[0]);