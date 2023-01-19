import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login'
import Verify from './screens/Verify'
import CreateAccount from './screens/CreateAccount'
import ForgetPassword from './screens/ForgetPassword'
import ResetPassword from './screens/ResetPassword'
import CourseCatalog from './screens/CourseCatalog'
import ContainerPage from './screens/ContainerPage';
import Cart from './screens/Cart'
import Payment from './screens/Payment'
import NewCard from './screens/NewCard'
import Class from './screens/Class'
import ClassUsers from './screens/ClassUsers'
import Progress from './screens/Progress'
import Progress_RecentActivity from './screens/Progress_RecentActivity'
import Progress_Progress from './screens/Progress_Progress'
import Messages from './screens/Messages'
import Message from './screens/Message'
import Help from './screens/Help'
import Profile from './screens/Profile'
import Logout from './screens/Logout'
import NewUser from './screens/NewUser'
import TermAndCondition from './screens/TermAndCondition';
import User from './screens/User';

import { store } from './components/api connect/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [message_id, setMessageID] = useState('')
  const [chapter, setChapter] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [cartQuantity, setCartQuantity] = useState([])
  const [userRole, setUserRole] = useState()
  const [media, setMedia] = useState('')
  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" >
          {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Verify" >
          {(props) => <Verify {...props} setIsLoggedIn={setIsLoggedIn} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="CreateAccount" >
          {(props) => <CreateAccount {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="TermAndCondition" >
          {(props) => <TermAndCondition {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="ForgetPassword" >
          {(props) => <ForgetPassword {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="ResetPassword" >
          {(props) => <ResetPassword {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="CourseCatalog" >
          {(props) => <CourseCatalog {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setChapter={setChapter} setMedia={setMedia} setCartItems={setCartItems} cartItems={cartItems} setCartQuantity={setCartQuantity} cartQuantity={cartQuantity} setUserRole={setUserRole} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="ContainerPage" >
          {(props) => <ContainerPage {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} chapter={chapter} media={media} />}
        </Stack.Screen>
        <Stack.Screen name="Cart" >
          {(props) => <Cart {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartItems={cartItems} setCartItems={setCartItems} setCartQuantity={setCartQuantity} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Payment" >
          {(props) => <Payment {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartItems={cartItems} cartQuantity={cartQuantity} userRole={userRole} setCartItems={setCartItems} setCartQuantity={setCartQuantity} />}
        </Stack.Screen>
        <Stack.Screen name="NewCard" >
          {(props) => <NewCard {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartItems={cartItems} cartQuantity={cartQuantity} userRole={userRole} setCartItems={setCartItems} setCartQuantity={setCartQuantity} />}
        </Stack.Screen>
        <Stack.Screen name="Class" >
          {(props) => <Class {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="User" >
          {(props) => <User {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="ClassUsers" >
          {(props) => <ClassUsers {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Progress" >
          {(props) => <Progress {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Progress_RecentActivity" >
          {(props) => <Progress_RecentActivity {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Progress_Progress" >
          {(props) => <Progress_Progress {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Messages" >
          {(props) => <Messages {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setMessageID={setMessageID} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Message" >
          {(props) => <Message {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} message_id={message_id} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Help" >
          {(props) => <Help {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" >
          {(props) => <Profile {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="Logout" >
          {(props) => <Logout {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} userRole={userRole} />}
        </Stack.Screen>
        <Stack.Screen name="NewUser" >
          {(props) => <NewUser {...props} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} cartQuantity={cartQuantity} userRole={userRole} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )

}

export default App