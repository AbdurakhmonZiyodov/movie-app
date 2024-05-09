import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export enum MontserratFonts {
  Montserrat_300 = 'Montserrat_300Light',
  Montserrat_400 = 'Montserrat_400Regular',
  Montserrat_500 = 'Montserrat_500Medium',
  Montserrat_600 = 'Montserrat_600SemiBold',
  Montserrat_700 = 'Montserrat_700Bold',
}
export function getMontserratFonts() {
  return {
    [MontserratFonts.Montserrat_300]: Montserrat_300Light,
    [MontserratFonts.Montserrat_400]: Montserrat_400Regular,
    [MontserratFonts.Montserrat_500]: Montserrat_500Medium,
    [MontserratFonts.Montserrat_600]: Montserrat_600SemiBold,
    [MontserratFonts.Montserrat_700]: Montserrat_700Bold,
  };
}
