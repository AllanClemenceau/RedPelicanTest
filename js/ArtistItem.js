var $ = require('jquery');
var React = require('react');

var ArtistItem = React.createClass({

    albumChange: function(e){
        this.props.setSelectedArtist(e.target.id);

        var url = 'https://api.spotify.com/v1/artists/' + e.target.id + '/albums';
        if (e.target.id == '') {
            url = '';
        }

        this.props.loadDataFromServer(url, 'album');
    },

    render: function() {
        rows = [];
        {this.props.artistList.map(function(item) {
            currentClass = "";
            if (this.props.selectedArtist == item.id)
            {
                currentClass = "selected";
            }

            rows.push(
                <ul className={currentClass}>
                    <li id={item.id} key={item.id} onClick={this.albumChange}>{item.name}</li>
                </ul>
            )
        }.bind(this))}

        if (rows.length == 0 && this.props.artistSearch != '') {
            rows = <ul className="no-result"><li>Aucun artiste ne correspond à votre recherche</li></ul>;
        }

        if (rows.length == 0) {
            rows = <ul className="no-result"><li>Aucune recherche en cours</li></ul>;
        }

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = ArtistItem;