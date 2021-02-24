import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import { CertificateItemPresets } from './certificate-item.props';

interface CertificateItemStyles {
  container: ViewStyle;
  titleContainer: ViewStyle;
  titleImage: ImageStyle;
  titleIssuer: TextStyle;
  name: TextStyle;
  description: TextStyle;
  valueTitle: TextStyle;
  value: TextStyle;
  separatorContainer: ViewStyle;
  moreButtonContainer: ViewStyle;
  moreButtonImage: ImageStyle;
  modalLine: ViewStyle;
  buttonShareContainer: ViewStyle;
  buttonShare: TextStyle;
}

const baseStyles: CertificateItemStyles = {
  container: {
    width: '100%',
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.FRENCH_LILAC,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleImage: {
    width: 64,
    height: 40,
    marginRight: 16,
  },
  titleIssuer: {
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25.5,
    color: COLORS.BAY_OF_MANY,
  },
  name: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    lineHeight: 21,
  },
  description: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 13,
  },
  valueTitle: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    lineHeight: 21,
  },
  value: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 13,
  },
  separatorContainer: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.LAVENDER_PURPLE,
  },
  moreButtonContainer: {},
  moreButtonImage: {},
  modalLine: {},
  buttonShareContainer: {},
  buttonShare: {},
};

const carouselStyles = StyleSheet.create<CertificateItemStyles>({
  ...baseStyles,
  moreButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  moreButtonImage: {
    width: 30,
    height: 30,
  },
});

const modalStyles = StyleSheet.create<CertificateItemStyles>({
  ...baseStyles,
  modalLine: {
    height: 3,
    borderRadius: 1.5,
    width: 40,
    alignSelf: 'center',
    backgroundColor: COLORS.LAVENDER_PURPLE,
    marginBottom: 19,
    marginTop: -6,
  },
  buttonShareContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 140,
    height: 30,
    width: 100,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.BAY_OF_MANY,
  },
  buttonShare: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    color: COLORS.BAY_OF_MANY,
  },
});

export const presetStyles: Record<
  CertificateItemPresets,
  CertificateItemStyles
> = {
  [CertificateItemPresets.Carousel]: carouselStyles,
  [CertificateItemPresets.Modal]: modalStyles,
  [CertificateItemPresets.Fullscreen]: baseStyles,
};
