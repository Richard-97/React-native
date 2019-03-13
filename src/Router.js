import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import MainPage from './containers/MainPage';
import CreateUser from './containers/CreateUser';
import EditUser from './containers/EditUser';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: 'white' }} titleStyle={{ color: 'rgba(0,0,0, .7)', fontWeight: '300' }} >
            <Stack key="root" hideTabBar headerLayoutPreset='center'>
            <Scene 
                    key="allusers"
                    hideNavBar
                    renderLeftButton={null}
                    component={MainPage}
                    title="All users"
                    rightTitle='Add'
                    rightTitleStyle={{color: 'rgba(0,0,0, .7)'}}
                    onRight={()=>Actions.newUser()}
                    rightButtonTextStyle={{right:0, color: 'rgba(0,0,0, .7)'}}
                />
                <Scene hideNavBar key="newUser" component={CreateUser} title="New users" />
                <Scene hideNavBar key="editUser" component={EditUser} title="Edit user" />
            </Stack>
        </Router>
    );
}

export default RouterComponent;