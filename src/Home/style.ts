import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    rowGap: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 12,
    padding: 15,
  },
  value: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  ratesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 5,
  },
  rateButton: (selected: any) => ({
    backgroundColor: selected ? '#1f2937' : 'grey',
    padding: 8,
    borderRadius: 20,
  }),
  rateText: {color: '#fff', fontSize: 14},
});
export default styles;
