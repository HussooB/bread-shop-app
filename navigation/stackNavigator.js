import { createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function StackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
        </Stack.Navigator>
    )
}