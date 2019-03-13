import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ToastAndroid, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { usersFetch, setUpdateCategory } from '../actions';
import { ListItem, Header, Spinner } from '../components/common';
import ImageSVG from 'react-native-remote-svg';

import firebase from '@firebase/app';
import '@firebase/database'

const mapStateToProps = state => {
    const users = _.map(state.usersReducer.users, (val, uid) => {
        return {...val, uid}
    })
    return { 
        users,
        loading: state.usersReducer.loading,
        error: state.usersReducer.error,
        categoryFilter: state.getCategory.categoryFilter,
        updateCategoryStatus: state.getCategory.updateFilter
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        getUsers: (category) => dispatch(usersFetch(category)),
        changeFilterStatus: (bool) => dispatch(setUpdateCategory(bool))
    })
}
class MainPage extends Component{    
    constructor(){
        super();
        this.onEndReachedCalledDuringMomentum = true;
        this.state = state={
        showMenu: false,
        users: null,
        lastUser: null
        }
    }
    
    componentWillMount(){
        firebase.database().ref(`/users`).limitToFirst(8)
            .on('value', snapshot => {
                const users = Object.values(snapshot.val());
                this.setState({users, lastUser: Object.values(snapshot.val()).pop()})
            })
    }
    componentDidUpdate(){
        if(this.props.updateCategoryStatus){
            this.setState({users: null})
            firebase.database().ref(`/users`).limitToFirst(8)
            .on('value', snapshot => {
                const users = Object.values(snapshot.val())
                let filterdUsers = []
                if(this.props.categoryFilter === 'All users'){
                    this.setState({users})
                }
                else{
                    users.map(user=>{
                        if(user.categories === this.props.categoryFilter){
                            filterdUsers.push(user)
                        }
                    })
                    this.setState({users: filterdUsers})
                }
            })
            this.props.changeFilterStatus(false)
        }
    }
    renderRightHeaderElement = () => {
        return(
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 10}}>
                <ImageSVG style={{height: 40, width: 40}} source={require('../img/menu.svg')} />
            </View>
        )
    }
    renderItems = ({item}) => {
        return (
            <TouchableOpacity key={item.name} onPress={() => ToastAndroid.show(item.name, ToastAndroid.SHORT)}>
                <ListItem user={item}/>
            </TouchableOpacity>
        );
    }
    onEndReached = () => {
        firebase.database().ref(`/users`).limitToFirst(this.state.users.length+7)
            .on('value', snapshot => {
                const users = Object.values(snapshot.val());
                let filterdUsers = []
                if(this.props.categoryFilter === 'All users'){
                    if(users.length !== this.state.users.length){
                        this.setState({users})
                    }
                }
                else {
                    users.map(user=>{
                        if(user.categories === this.props.categoryFilter){
                            filterdUsers.push(user)
                        }
                    })
                    if(users.length !== this.state.users.length){
                        this.setState({users: filterdUsers})
                    }
                }
            })
    }
    render(){
        return (
                this.state.users===null ?
                <Spinner />
                :
                <View style={{flexDirection:'column', flex: 1}}>
                    <View style={{flex:1}}>
                        <Header title={this.props.categoryFilter.toUpperCase()} rightComponent={this.renderRightHeaderElement} type={'filter'} />
                    </View>
                    <View style={{flex:7}}>
                        {this.props.loading ?
                            <Spinner />
                            :
                                <FlatList
                                    data={this.state.users}
                                    keyExtractor={user=>user.name}
                                    renderItem={this.renderItems}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={0.000000000001}
                                />
                            }
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ListItem />
                    </View> 
                </View>        
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);