import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CoordinateYM, Direction} from './helpers/CoordinateYM';

enum Color {
  blue, red
}

interface CoordProps {
  coord: CoordinateYM
}

function Coord(props: CoordProps) {

  return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{color: '#0af', marginRight: 10}}>
          {props.coord.fullCoord()}
        </Text>
        <Text style={{color: '#d30'}}>
          {props.coord.decimalCoord()}
        </Text>
      </View>
    )
}

export default function App() {
  const c1 = new CoordinateYM();
  const c2 = new CoordinateYM(Direction.lat, 10, 5, 16);
  const c3 = new CoordinateYM(Direction.long, -18, 6);
  const c4 = new CoordinateYM(Direction.long, 40, 10, 5);
  const avgCoord = CoordinateYM.meanCoord(c3, c4)!;

  return (
    <View style={styles.container}>
        <View style={styles.text}>
            <Text>
                Default coordinate:
            </Text>
            <Coord coord={c1}/>
        </View>
        <View style={styles.text}>
            <Text>
                Coordinate1:
            </Text>
            <Coord coord={c2}/>
        </View>
        <View style={styles.text}>
            <Text>
                Coordinate2:
            </Text>
            <Coord coord={c3}/>
        </View>
        <View style={styles.text}>
            <Text>
                Coordinate3:
            </Text>
            <Coord coord={c4}/>
        </View>
        <View style={styles.text}>
            <Text>
                Between Coordinate2 and Coordinate3:
            </Text>
            <Coord coord={avgCoord}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        marginBottom: 20
    }
});
