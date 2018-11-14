import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    Image,
    Platform,
    View,
} from 'react-native'
const topbarHeight = (Platform.OS === 'ios' ? 64 : 42)
const window = Dimensions.get('window');

export default class Menu extends Component{
    // static propTypes = {
    //     onItemSelected: React.PropTypes.func.isRequired,
    // };// 注意这里有分号
    render(){
        return(
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <Text
                  onPress={() => this.props.onItemSelected('PM2.5(1小时)') }
                  style={styles.item}>
                  PM2.5(1小时)
                </Text>
                
                <Text
                  onPress={() => this.props.onItemSelected('PM2.5(24小时)') }
                  style={styles.item}>
                  PM2.5(24小时)
                </Text>


                <Text
                  onPress={() => this.props.onItemSelected('PM10(1小时)')}
                  style={styles.item}>
                  PM10(1小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('PM10(24小时)')}
                  style={styles.item}>
                  PM10(24小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('O₃(1小时)')}
                  style={styles.item}>
                  O₃(1小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('O₃(8小时)')}
                  style={styles.item}>
                  O₃(8小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('NO₂(1小时)')}
                  style={styles.item}>
                  NO₂(1小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('SO₂(1小时)')}
                  style={styles.item}>
                  SO₂(1小时)
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('CO(1小时)')}
                  style={styles.item}>
                  CO(1小时)
                </Text>


      </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    marginTop:42,
    backgroundColor: '#333',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 16,
    color:'#fff',
    fontWeight: '300',
    paddingTop: 10,
  },
});