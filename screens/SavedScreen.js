import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SavedItems from '../components/SavedItems';

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <SavedItems />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
