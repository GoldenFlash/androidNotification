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

export default class NdMenu extends Component{
    // static propTypes = {
    //     onItemSelected: React.PropTypes.func.isRequired,
    // };// 注意这里有分号
    render(){
        return(
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <Text
                  onPress={() => this.props.onItemSelected('PM2.5') }
                  style={styles.item}>
                  PM2.5
                </Text>
                
                <Text
                  onPress={() => this.props.onItemSelected('PM10')}
                  style={styles.item}>
                  PM10
                </Text>


                <Text
                  onPress={() => this.props.onItemSelected('O₃')}
                  style={styles.item}>
                  O₃
                </Text>

    
                <Text
                  onPress={() => this.props.onItemSelected('NO₂')}
                  style={styles.item}>
                  NO₂
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('SO₂')}
                  style={styles.item}>
                  SO₂
                </Text>

                <Text
                  onPress={() => this.props.onItemSelected('CO')}
                  style={styles.item}>
                  CO
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