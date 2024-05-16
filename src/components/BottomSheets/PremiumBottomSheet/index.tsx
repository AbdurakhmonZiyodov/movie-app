import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import RN from '@/components/RN';
import { PremiumDiscountType } from '@/components/Video/types';
import { PaymeSvg, PremiumCrownSvg } from '@/shared/assets/images/svg';
import { COLORS } from '@/shared/constants/colors';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { formatPrice } from '@/shared/utils/number';
import {
  useAllPremiumDiscountQuery,
  useGetOrderQuery,
  useMakePaymentOrderMutation,
} from '@/store/services/features/MovieApi';
import { Portal } from '@gorhom/portal';
import { find, isEqual } from 'lodash';
import { ReactNode, RefObject, useCallback, useMemo, useState } from 'react';
import { Alert, ListRenderItem } from 'react-native';
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
  const { data: order } = useGetOrderQuery();
  const [makeOrderToPremium, { isLoading, isSuccess }] =
    useMakePaymentOrderMutation();
  const [selectedStatus, setSelectedStatus] =
    useState<PremiumDiscountType | null>(null);

  const paymentStatusInfo = useMemo(() => {
    if (order?.data.plan_id) {
      const item = find(allPremiumDiscount ?? [], { id: order.data.plan_id });
      return { message: item?.name, price: item?.price, isPremium: true };
    }
    return {
      message: "Sizda xali premium tarif yo'q",
      price: 0,
      isPremium: false,
    };
  }, [allPremiumDiscount, order]);

  const onReset = useCallback(() => {
    setSelectedStatus(null);
  }, []);

  const onBuyPremium = useCallback(async () => {
    if (selectedStatus) {
      if (paymentStatusInfo.isPremium) {
        Alert.alert(
          'Xatolik',
          'Sizda xali premium bor, vaqti tugamasidan boshqasini sotib ololmaysiz',
          [{ text: 'Tushunarli', style: 'cancel' }],
        );
      } else {
        await makeOrderToPremium({ premium_id: selectedStatus.id });
        if (isSuccess) {
          Alert.alert(
            'Tabriklayman 🥳',
            'Siz mufaqiyatli premium sotib oldingiz! 🎉🎉',
          );
        }
      }
    }
  }, [isSuccess, makeOrderToPremium, paymentStatusInfo, selectedStatus]);

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
            paymentStatusInfo.isPremium && styles.activePreModalPaymentButton,
          ]}
        >
          <RN.Text style={styles.preModalPaymentButtonTitle}>
            {paymentStatusInfo.message}
          </RN.Text>
          {!!paymentStatusInfo?.price && (
            <RN.Text style={styles.preModalPaymentButtonSubTitle}>
              {formatPrice(paymentStatusInfo.price)}
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
      paymentStatusInfo,
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
