import React, {PureComponent} from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight, Dimensions} from "react-native";
import {Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon} from "native-base";

export default class FlatListGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const rowID = this.props.index;
        const rowData = this.props.item;
        const saved = this.props.saved;

        const styles = {
          gridThumb: {
            alignSelf: 'center',
            width: this.props.itemWidth - 10,
            height: this.props.itemWidth - 10,
          },
          gridButton: {
            alignSelf: 'center',
            width: 200,
            backgroundColor: '#444',
            color: 'white',
            padding: 5,
            textAlign: 'center',
            width: this.props.itemWidth - 10,
            fontSize: 12,
          },
          gridButtonSaved: {
            alignSelf: 'center',
            width: 200,
            backgroundColor: '#aaa',
            color: 'white',
            padding: 5,
            textAlign: 'center',
            width: this.props.itemWidth - 10,
            fontSize: 12,
          },
        };

        return (
            <TouchableOpacity onPress={() => this.props.onPress('GridView', rowID, rowData)}>
                <View style={{margin: 0.5, width: this.props.itemWidth, paddingBottom: 15}}>
                    <Thumbnail 
                      square
                      source={{uri: rowData.images[0].hostedLargeUrl}}
                      style={styles.gridThumb} />
                    <Text style={saved ? styles.gridButtonSaved : styles.gridButton}> {saved ? 'Saved' : 'Save to list'} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}