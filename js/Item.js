var $ = require('jquery');
var React = require('react');

var Item = React.createClass({

    itemChange: function(e){
        this.props.setSelectedItem(e.target.id);

        if (this.props.type == "artist") {
            var url = 'https://api.spotify.com/v1/artists/' + e.target.id + '/albums';
            var modele = 'album';
        } else {
            var url = 'https://api.spotify.com/v1/albums/' + e.target.id + '/tracks';
            var modele = 'tracks';
        }

        if (e.target.id == '') {
            url = '';
        }

        this.props.loadDataFromServer(url, modele);
    },

    render: function() {
        var rows = this.props.list.map(function(item) {
            var currentClass = "";
            if (this.props.selectedItem == item.id)
            {
                currentClass = "selected";
            }

            return (
                <ul className={currentClass}>
                    <li id={item.id} key={item.id} onClick={this.itemChange}>{item.name}</li>
                </ul>
            );
        }.bind(this));

        if (this.props.type == "artist") {
            if (rows.length == 0 && this.props.artistSearch != '') {
                rows = <ul className="no-result">
                    <li>Aucun artiste ne correspond à votre recherche</li>
                </ul>;
            }

            if (rows.length == 0) {
                rows = <ul className="no-result">
                    <li>Aucune recherche en cours</li>
                </ul>;
            }
        } else {
            if (rows.length == 0) {
                rows = <ul className="no-result"><li>Merci de sélectionner un artiste</li></ul>;
            }
        }

        return (
            <div>{rows}</div>
        );
    }
});

module.exports = Item;