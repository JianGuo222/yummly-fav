import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  ListView,
} from 'react-native';
import { WebBrowser } from 'expo';
import Search from 'react-native-search-box';
import UltimateListView from "react-native-ultimate-listview";
import LoadingSpinner from "../components/loadingSpinner";
import FlatListGrid from "../components/flatListGrid";
import fetchJson from '../redux/utils/fetchJson';
const { width, height } = Dimensions.get('window');

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };



  constructor(props) {
    super(props);

    this.state = {
      layout: 'grid-2',
      width: width,
      itemWidth: width / 2,
    };

    // const {actions} = this.props.screenProps;
    // actions.getList(12, 0);
  }

  onLayout(event) {
    const { width, height } = Dimensions.get('window');
    this.setState({
      layout: width > height ? 'grid-3' : 'grid-2',
      width: width,
      itemWidth: width / (width > height ? 3 : 2)
    });
  }

  sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      //This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 12;
      let skip = (page - 1) * pageLimit;

      const {actions} = this.props.screenProps;
      await actions.getList(pageLimit, skip);

      // //Generate dummy data
      // // const {actions} = this.props.screenProps;
      // // actions.getList(pageLimit, skip);
      // // let rowData = Array.from({ length: pageLimit }, (value, index) => `item -> ${index + skip}`);
      // const data = await fetchJson(`http://api.yummly.com/v1/api/recipes?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c&requirePictures=true&maxResult=${pageLimit}&start=${skip}`);
      // let rowData = data.matches;
      
      // for (let i=0; i<rowData.length; i++) {
      //   const itemDetails = await fetchJson(`http://api.yummly.com/v1/api/recipe/${rowData[i].id}?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c`);
      //   rowData[i].images = itemDetails.images;
      // }

      // // console.log(rowData);
      // //Simulate the end of the list if there is no more data returned from the server
      // if (page === 3) {
      //   rowData = [];
      // }

      // //Simulate the network loading in ES7 syntax (async/await)
      // // await this.sleep(2000);
      // // console.log(rowData);
      // // console.log(pageLimit);

      const {results} = this.props.screenProps;
      startFetch(results.newPageData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
      console.log(err);
    }
  };

  renderPaginationFetchingView = () => {
    return (
      <LoadingSpinner height={height * 0.2} width={this.state.width} text="loading..." />
    );
  };

  onPressItem = (type, index, item) => {
    const {actions} = this.props.screenProps;
    actions.saveItem(item);
    // Alert.alert('Save Item', `${item.recipeName}`);
    const {results} = this.props.screenProps;
    // console.log(results.savedItems.length);
    // this.listView.updateDataSource(results.rowData);
  };

  renderItem = (item, index, separator) => {
    return (
      <FlatListGrid item={item} saved={item.saved} index={index} onPress={this.onPressItem} itemWidth={this.state.itemWidth} />
    );
  };

  renderHeader = () => {
    const {results} = this.props.screenProps;
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
      <View>
        <View style={headerStyle}>
          <Text style={{ textAlign: 'center' }}>Total match: {results === [] ? '0' : results.total}</Text>
        </View>
      </View>
    );
  };

  onSearch = (event) => {
    // console.log(event);
    const {actions} = this.props.screenProps;
    actions.setSearch(event);
    this.listView.refresh();
  }
  onCancel = () => {
    const {actions} = this.props.screenProps;
    actions.setSearch('');
    this.listView.refresh();
  }

  render() {
    // console.log(this.props.screenProps);
    
    return (
      <View style={styles.container} onLayout={this.onLayout.bind(this)}>
        <Search
          ref="search_box"
          onSearch={this.onSearch}
          onCancel={this.onCancel}
        />
        <View style={styles.listContainer}>
          <UltimateListView
            ref={(ref) => this.listView = ref}
            key={'grid'}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `${index} - ${item}`}  //this is required when you are using FlatList
            refreshableMode="basic" //basic or advanced

            item={this.renderItem}  //this takes three params (item, index, separator)
            numColumns={this.state.layout === 'grid-2' ? 2 : 3} //to use grid layout, simply set gridColumn > 1

            //----Extra Config----
            displayDate
            header={this.renderHeader}
            paginationFetchingView={this.renderPaginationFetchingView}
            paginationWaitingView={this.renderPaginationFetchingView}
            //sectionHeaderView={this.renderSectionHeaderView}   //not supported on FlatList
            //paginationFetchingView={this.renderPaginationFetchingView}
            //paginationAllLoadedView={this.renderPaginationAllLoadedView}
            //paginationWaitingView={this.renderPaginationWaitingView}
            emptyView={this.renderPaginationFetchingView}
            //separator={this.renderSeparatorView}

            //new props on v3.2.0
            arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
            dateStyle={{ color: 'lightgray' }}
            refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}
            refreshViewHeight={80}
          />
        </View>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>
          </View>

        </ScrollView> */}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  listContainer: {
    paddingTop: 0,
    paddingBottom: 30,
  },
});
