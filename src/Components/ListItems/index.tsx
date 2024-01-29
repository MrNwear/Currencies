import * as React from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './style';

interface ListItemsProps {
  data: {[key: string]: any}[];
  itemFunc: (item: any) => void;
}

const ListItems = (props: ListItemsProps) => {
  const {data, itemFunc} = props;
  return (
    <ScrollView>
      {data.map((item: any) => {
        return (
          <TouchableOpacity
            key={item.name}
            onPress={() => itemFunc(item)}
            style={styles.itemContainer}>
            <Text style={styles.value}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ListItems;
