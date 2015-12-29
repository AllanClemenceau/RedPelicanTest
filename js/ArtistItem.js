var $ = require('jquery');
var AlbumItem = require('./AlbumItem');
var React = require('react');

var ArtistItem = React.createClass({
    loadAlbumsFromServer: function() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                data.items.sort(function(itemA, itemB) {
                    if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                        return 1;
                    }

                    if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });
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
        $('#artist-content > div > ul.selected').removeClass('selected');
        //console.log('https://api.spotify.com/v1/artists/' + e.target.id + '/albums');
        this.setState({
            url: 'https://api.spotify.com/v1/artists/' + e.target.id + '/albums'
        }, this.loadAlbumsFromServer);
        $(e.target).parent().addClass('selected');
    },

    getInitialState: function() {
        return {
            albumList: []
        };
    },

    render: function() {
        rows = [];
        {this.state.albumList.map(function(item) {
            rows.push(<AlbumItem item={item} />);
        })}
        if (rows.length == 0) {
            React.render(<div></div>, $('#album-content')[0]);
            React.render(<div></div>, $('#track-content')[0]);
        } else {
            React.render(<div>{rows}</div>, $('#album-content')[0]);
        }

        return (
            <ul>
                <li key={this.props.item.id} id={this.props.item.id} onClick={this.albumChange}>{this.props.item.name}</li>
            </ul>
        );
    }
});

module.exports = ArtistItem;