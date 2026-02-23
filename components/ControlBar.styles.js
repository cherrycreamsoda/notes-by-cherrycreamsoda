import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  controls: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ffffff',
    zIndex: 30,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 22,
  },

  btnText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 11,
  },
})
