import * as React from 'react';
import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Listar filmes"
        onPress={() => navigation.navigate('Movies')}
      />
    </View>
  );
}

function MoviesScreen() {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <Text>{item.title} - {item.releaseYear}</Text>
          )}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
