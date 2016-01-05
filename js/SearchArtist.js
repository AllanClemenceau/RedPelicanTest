var $ = require('jquery');
var Item = require('./Item');
var TrackItem = require('./TrackItem');
var React = require('react');

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
                                        <Item list={this.state.artistList} loadDataFromServer={this.loadDataFromServer} setSelectedItem={this.setSelectedArtist} selectedItem={this.state.selectedArtist} type={"artist"} artistSearch={this.state.artistSearch} />
                                    </div>
                                </td>
                                <td>
                                    <div id="album-content">
                                        <Item list={this.state.albumList} loadDataFromServer={this.loadDataFromServer} setSelectedItem={this.setSelectedAlbum} selectedItem={this.state.selectedAlbum} type={"album"} />
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