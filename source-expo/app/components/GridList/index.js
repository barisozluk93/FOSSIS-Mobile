import { useMemo } from 'react';
import { View } from 'react-native';
import styles from './styles';

const GridList = ({ data, renderItem, columns = 2, contentContainerStyle = {} }) => {
  const dataCustom = useMemo(() => {
    if (Array.isArray(data)) {
      const dataOutput = [];
      let item = [];
      for (let index = 0; index < data.length; index++) {
        const no = index + 1;
        item.push(data[index]);
        if (no % columns === 0) {
          dataOutput.push(item);
          item = [];
        }
        if (no === data.length) {
          if (item.length < columns) {
            [...Array(columns - item.length).keys()].forEach((_) => item.push(null));
          }
          dataOutput.push(item);
          item = [];
        }
      }
      return dataOutput;
    }
    return [];
  }, [data, columns]);

  return (
    <View style={contentContainerStyle}>
      {dataCustom.map((items, indexRow) => (
        <View key={indexRow.toString()} style={styles.row}>
          {items.map((item, index) => (
            <View style={styles.item} key={index.toString()}>
              {item && renderItem?.({ item, index, indexRow })}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default GridList;
