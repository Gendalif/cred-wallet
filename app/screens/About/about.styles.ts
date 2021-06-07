import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IAboutScreenStyles {
  container: ViewStyle;
  textContainer: ViewStyle;
  introduction: TextStyle;
  link: TextStyle;
  copyrightContainer: ViewStyle;
  copyright: TextStyle;
}

export const styles = StyleSheet.create<IAboutScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginHorizontal: 7,
    flex: 1,
    marginTop: 10,
  },
  introduction: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_500,
    color: COLORS.BUNTING,
  },
  link: { color: COLORS.BAY_OF_MANY },
  copyrightContainer: {
    width: '100%',
    marginBottom: 10,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.GRAY_TRANSPARENT_BACKGROUND,
  },
});
