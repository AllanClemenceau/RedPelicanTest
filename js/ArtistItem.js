var $ = require('jquery');
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
                this.props.onClickArtist(data.items);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    albumChange: function(e){
        this.state.selectedArtist = e.target.id;
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
        rows = [];
        {this.props.artistList.map(function(item) {
            currentClass = "";
            if (this.state.selectedArtist == item.id)
            {
                currentClass = "selected";
            }

            rows.push(
                <ul className={currentClass}>
                    <li id={item.id} key={item.id} onClick={this.albumChange}>{item.name}</li>
                </ul>
            )
        }.bind(this))}

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = ArtistItem;