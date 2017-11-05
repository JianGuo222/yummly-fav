import React, {PureComponent} from "react";
import {Button, StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight, Dimensions} from "react-native";
import {ListItem, Left, Right, Body, Thumbnail, Text, Icon} from "native-base";

export default class FlatListGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const rowID = this.props.index;
        const rowData = this.props.item;

        const styles = {
          gridThumb: {
              alignSelf: 'center',
              width: this.props.itemWidth - 10,
              height: this.props.itemWidth - 10,
          },
          gridButton: {
              alignSelf: 'center',
              width: this.props.itemWidth - 10,
          },
        };

        return (
            <TouchableOpacity onPress={() => this.props.onPress('GridView', rowID, rowData)}>
                <View style={{margin: 0.5, width: this.props.itemWidth, paddingBottom: 15}}>
                    <Thumbnail 
                      square
                      source={{uri: 'https://lh3.googleusercontent.com/goNKDD8p2yoE6cpikvqdGJSBvfZvLWI7nTCdVK181hfMCPtSKZFpHTgxcBk-uvAhXSjfaM7BfmbeLaAf6JLTJg=s320-c-e365'}}
                      style={styles.gridThumb} />
                    <View style={styles.gridButton}>
                      <Button  title="Save to list" color="#444444" onPress={() => this.props.onPress('GridView', rowID, rowData)} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}