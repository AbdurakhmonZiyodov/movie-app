import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import RN from '@/components/RN';
import { PremiumDiscountType } from '@/components/Video/types';
import { PaymeSvg, PremiumCrownSvg } from '@/shared/assets/images/svg';
import { COLORS } from '@/shared/constants/colors';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { MoviePaymentStatusType } from '@/shared/types';
import {
  convertToShortDate,
  howManyDaysPremiumLeft,
} from '@/shared/utils/date';
import { formatPrice } from '@/shared/utils/number';
import { useProfileInfoQuery } from '@/store/services/features/AuthApi';
import {
  useAllPremiumDiscountQuery,
  // useGetOrderQuery,
  useMakePaymentOrderMutation,
} from '@/store/services/features/MovieApi';
import { Portal } from '@gorhom/portal';
import { isEqual } from 'lodash';
import { ReactNode, RefObject, useCallback, useState } from 'react';
import { ListRenderItem } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { styles } from './styles';

const config: any = {
  holderColor: 'white',
  fromZero: true,
  backgroundColor: 'dark',
};

const PremiumBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef?: RefObject<BottomSheetRef>;
}) => {
  const { data: allPremiumDiscount } = useAllPremiumDiscountQuery();
  // const { data: order } = useGetOrderQuery();
  const { data: profileInfoData } = useProfileInfoQuery();
  const [makeOrderToPremium, { isLoading }] = useMakePaymentOrderMutation();

  const isPremium =
    profileInfoData?.data.status_type === MoviePaymentStatusType.premium;

  const [selectedStatus, setSelectedStatus] =
    useState<PremiumDiscountType | null>(null);

  const onReset = useCallback(() => {
    setSelectedStatus(null);
  }, []);

  const onBuyPremium = useCallback(async () => {
    if (selectedStatus) {
      if (isPremium) {
        return RN.Alert.alert(
          'Kechirasiz 😕',
          'Siz premium sotib olgansiz! Premium vaqtiz tugamanguncha yana premium sotib ololmaysiz!',
          [
            {
              text: 'Tushundim',
              style: 'cancel',
            },
          ],
        );
      }

      await makeOrderToPremium({
        premium_id: selectedStatus.id,
      }).then((res) => {
        if (res.data?.success) {
          RN.Linking.canOpenURL(res.data.link).then(() => {
            RN.Linking.openURL(res.data.link);
          });
        }
      });
    }
  }, [isPremium, makeOrderToPremium, selectedStatus]);

  // useEffect(() => {
  //   if (isSuccess && paymentStatusInfo.isPremium) {
  //     Alert.alert(
  //       'Tabriklayman 🥳',
  //       'Siz mufaqiyatli premium sotib oldingiz! 🎉🎉',
  //     );
  //   }
  // }, [isSuccess, paymentStatusInfo.isPremium]);

  const renderPremiumItem: ListRenderItem<PremiumDiscountType> = useCallback(
    ({ item }) => {
      const price = formatPrice(item.price);
      return (
        <Ripple
          rippleColor={COLORS.orange}
          onPress={() => setSelectedStatus(item)}
          style={[
            styles.preModalPaymentButton,
            isEqual(selectedStatus, item) && styles.activePreModalPaymentButton,
          ]}
        >
          <RN.Text style={styles.preModalPaymentButtonTitle}>
            {item.name}
          </RN.Text>
          <RN.Text style={styles.preModalPaymentButtonSubTitle}>
            {price}
          </RN.Text>
        </Ripple>
      );
    },
    [selectedStatus],
  );

  const renderChild = useCallback(
    (child: ReactNode) => (
      <RN.View style={styles.wrapper}>
        {child}
        <RN.View ai={'center'} pr={10} pb={20}>
          <PremiumCrownSvg width={100} height={100} />
          <PaymeSvg width={70} height={30} />
        </RN.View>

        <RN.View
          style={[
            styles.header,
            isPremium && styles.activePreModalPaymentButton,
          ]}
        >
          {!!isPremium ? (
            <>
              <RN.Text style={styles.preModalPaymentButtonTitle}>
                {howManyDaysPremiumLeft(
                  profileInfoData?.data?.premium_end_date as string,
                )}
              </RN.Text>
              <RN.Text style={styles.preModalPaymentButtonSubTitle}>
                {convertToShortDate(profileInfoData?.data.premium_end_date)}
              </RN.Text>
            </>
          ) : (
            <RN.Text style={styles.preModalPaymentButtonTitle}>
              {'Sizda xali premium yuq!'}
            </RN.Text>
          )}
        </RN.View>

        <RN.FlatList
          data={allPremiumDiscount ?? []}
          numColumns={2}
          columnWrapperStyle={styles.flatList}
          contentContainerStyle={{
            gap: 6,
          }}
          keyExtractor={(_, key) => key.toString()}
          renderItem={renderPremiumItem}
        />

        <RN.View style={CoreStyle.flex1} />
        <Button
          title={'Premium sotib olish'}
          onPress={onBuyPremium}
          disabled={!selectedStatus}
          loading={isLoading}
        />
      </RN.View>
    ),
    [
      isPremium,
      profileInfoData,
      allPremiumDiscount,
      renderPremiumItem,
      onBuyPremium,
      selectedStatus,
      isLoading,
    ],
  );

  return (
    <Portal>
      <BottomSheet
        {...config}
        bottomSheetRef={bottomSheetRef}
        onClose={onReset}
      >
        {renderChild}
      </BottomSheet>
    </Portal>
  );
};

export default PremiumBottomSheet;
