import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { Portal } from '@gorhom/portal';
import { ReactNode, RefObject, useCallback } from 'react';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const config: any = {
  holderColor: 'white',
  fromZero: true,
  backgroundColor: 'dark',
};

const PrivatePoliceBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef?: RefObject<BottomSheetRef>;
}) => {
  const renderChild = useCallback(
    (child: ReactNode) => (
      <RN.View style={styles.wrapper}>
        {child}
        <ScrollView>
          <RN.Text style={styles.title}>{'Maxfiylik siyosati'}</RN.Text>

          <RN.Text style={styles.description}>
            {`Bu ilova haqida\n\n"BananaTV" onlayn ilovasi`}
            {`\nMazkur koʻngilochar platforma orqali siz oʻzbek tilida sifatli tarzda  ovozlashtirgan xujjatli - badiiy kinofilmlar, seriallar, multfilmlar, dorama va xatto eng mashhur animelargacha koʻra olish imkoniyatiga ega boʻlasiz.`}
            {
              '\n\nNafaqat yaxshi ovozlashtirish, balki yuqori sifat uygʻunligi va ajoyib tezlik bilan ham ilova foydalanuvchilarini xursand qila olamiz.\n\nIlovamizda katalog tizimi mavjud boʻlib, janrlariga koʻra tizimlashtirilgan va siz uchun qulay tarzda taqdim qilingan.\nBarcha boʻlimlar esa doimiy ravishda yangilanadi va toʻldiriladi.\nYana bizda barchasi yuqori formatda ( 1080 full HD ) taqdim qilib boriladi.'
            }
            {`\n\nBundan tashqari ilovamizda siz yoqtirgan loyihalarning chiqish jadvallari bilan ham tanishib borishingiz mumkin.\nDastur 3G, 4G mobil tarmoqlari va Wi-Fi orqali ishlaydi.`}
            {`\n\nTexnik yordam so'rash yoki dastur ishlashini yaxshilash bilan bog'liq takliflaringizni quyidagi manzillarga yuborishinigiz mumkin:`}
          </RN.Text>
          <RN.TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={() => {
              Linking.openURL('https://t.me/bananatv_uz');
            }}
          >
            <RN.Text style={[styles.description, styles.link]}>
              {'https://t.me/bananatv_uz'}
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={() => {
              Linking.openURL('mailto:bananatv.uz@gmail.com');
            }}
          >
            <RN.Text style={[styles.description, styles.link]}>
              {'bananatv.uz@gmail.com'}
            </RN.Text>
          </RN.TouchableOpacity>

          <RN.Text style={styles.description}>
            {'\nSiz eng yaxshisiga loyiqsiz !!!\nHurmat bilan BananaTV'}
          </RN.Text>
        </ScrollView>
      </RN.View>
    ),
    [],
  );

  return (
    <Portal>
      <BottomSheet {...config} bottomSheetRef={bottomSheetRef}>
        {renderChild}
      </BottomSheet>
    </Portal>
  );
};

const styles = RN.StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  title: {
    fontSize: 25,
    color: COLORS.white,
    fontFamily: PoppinsFonts.Poppins_600,
    paddingVertical: 20,
  },
  description: {
    fontSize: 14,
    color: addAlpha(COLORS.white, 0.7),
  },
  link: {
    color: COLORS.orange,
  },
});
export default PrivatePoliceBottomSheet;
