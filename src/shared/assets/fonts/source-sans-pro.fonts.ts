import {
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
  SourceSansPro_900Black,
} from '@expo-google-fonts/source-sans-pro';

export enum SourceSansProFonts {
  SourceSansPro_300 = 'SourceSansPro_300Light',
  SourceSansPro_400 = 'SourceSansPro_400Regular',
  SourceSansPro_600 = 'SourceSansPro_600SemiBold',
  SourceSansPro_700 = 'SourceSansPro_700Bold',
  SourceSansPro_900 = 'SourceSansPro_900Black',
}
export function getSourceSansProFonts() {
  return {
    [SourceSansProFonts.SourceSansPro_300]: SourceSansPro_300Light,
    [SourceSansProFonts.SourceSansPro_400]: SourceSansPro_400Regular,
    [SourceSansProFonts.SourceSansPro_600]: SourceSansPro_600SemiBold,
    [SourceSansProFonts.SourceSansPro_700]: SourceSansPro_700Bold,
    [SourceSansProFonts.SourceSansPro_900]: SourceSansPro_900Black,
  };
}
