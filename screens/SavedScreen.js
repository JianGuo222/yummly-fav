import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, Modal, TouchableHighlight, TextInput } from 'react-native';
import UltimateListView from "react-native-ultimate-listview";
import FlatListItem from "../components/flatListItem";
import { Thumbnail } from "native-base";

const { width, height } = Dimensions.get('window');

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved',
  };

  constructor(props) {
    super(props);

    this.state = {
      width: width,
      modalVisible: false,
      modalItem: null,
      modalItemNotes: '',
    };
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      const { results } = this.props.screenProps;
      startFetch(results.savedItems);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
      console.log(err);
    }
  };

  onPressItem = (type, index, item) => {
    if (type === 'notes') {
      this.setState({ modalVisible: true, modalItem: item, modalItemNotes: item.notes });
    } else {
      const { actions } = this.props.screenProps;
      actions.saveItem(item);
    }
  };

  renderItem = (item, index, separator) => {
    return (
      <FlatListItem item={item} notes={item.notes} index={index} onPress={this.onPressItem} />
    );
  };

  onLayout(event) {
    const { width } = Dimensions.get('window');
    this.setState({
      width: width,
    });
  }

  renderHeader = () => {
    const { results } = this.props.screenProps;
    const headerStyle = {
      width: this.state.width,
      height: 40,
      padding: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'lightgray',
      backgroundColor: 'whitesmoke',
    };
    return (
      <View style={headerStyle}>
        <Text style={{ textAlign: 'center' }}>Total match: {results.savedItems.length ? results.savedItems.length : '0'}</Text>
      </View>
    );
  };

  saveNotes = () => {
    const { actions } = this.props.screenProps;
    actions.saveNotes(this.state.modalItem, this.state.modalItemNotes);
    this.setState({
      modalVisible: false,
      modalItem: null,
      modalItemNotes: ''
    });
  }

  render() {
    const { results } = this.props.screenProps;
    return (
      <View style={styles.container} onLayout={this.onLayout.bind(this)}>
        {this.state.modalItem !== null && <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log('Modal closed'); }}>
          <ScrollView>
            <View style={{ padding: 15 }}>
              <View>
                <Thumbnail square source={{ uri: this.state.modalItem.image }} style={styles.thumb} />
                <Text style={{ fontSize: 13, marginBottom: 10, marginTop: 15 }}>{this.state.modalItem.name}</Text>
                <Text style={{ fontSize: 12, color: '#555555', marginBottom: 15 }}>Ingredients: {this.state.modalItem.ingredients.toString()}</Text>
                <TextInput style={styles.textarea}
                  onChangeText={(text) => this.setState({ modalItemNotes: text })}
                  value={this.state.modalItemNotes}
                  multiline={true}
                />
                <TouchableHighlight onPress={this.saveNotes}>
                  <Text style={styles.saveButton}>Save notes</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </Modal>}
        <UltimateListView
          ref={(ref) => this.listView = ref}
          key={results.savedItems.length}
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${index} - ${item}`}  //this is required when you are using FlatList
          refreshable={true}
          item={this.renderItem}  //this takes three params (item, index, separator)
          pagination={false}
          header={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  saveButton: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#0187fa',
    color: 'white',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  textarea: {
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 3,
    height: 80,
    textAlignVertical: 'top',
  }
});
