var $ = require('jquery');
var ArtistItem = require('./ArtistItem');
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
                url: 'https://api.spotify.com/v1/search?q=' + e.target.value + '&type=artist'
            }, this.loadArtistsFromServer);
        } else {
            React.render(<div><ul id="no-artist"><li>Aucune recherche en cours</li></ul></div>, $('#artist-content')[0]);
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
        rows = [];
        {(this.state.artistList || []).map(function(item) {
            rows.push(<ArtistItem item={item} />);
        })}
        if (rows.length == 0) {
            React.render(<div></div>, $('#album-content')[0]);
            React.render(<div></div>, $('#track-content')[0]);
        } else {
            React.render(<div>{rows}</div>, $('#artist-content')[0]);
        }
        $('#artist-content > div > ul.selected').removeClass('selected');
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