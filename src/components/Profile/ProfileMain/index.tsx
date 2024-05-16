import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { FC, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

enum ProfileMenu {
  PAYMENT,
  USER_EDIT,
  LOG_OUT,
}

const profileData = [
  {
    type: ProfileMenu.PAYMENT,
    title: 'Premium sotib olish',
  },
  {
    type: ProfileMenu.USER_EDIT,
    title: 'Profileni yangilash',
  },
  {
    type: ProfileMenu.LOG_OUT,
    title: 'Chiqish',
  },
];

interface ProfileMainProps {
  onLogout(): void;
  onBuyPremium(): void;
}

const ProfileMain: FC<ProfileMainProps> = ({ onLogout, onBuyPremium }) => {
  const onPressHandler = useCallback(
    ({ type }: { type: ProfileMenu }) => {
      if (type === ProfileMenu.LOG_OUT) {
        return onLogout();
      }
      if (type === ProfileMenu.PAYMENT) {
        return onBuyPremium();
      }
    },
    [onBuyPremium, onLogout],
  );

  const renderItem: ListRenderItem<(typeof profileData)[0]> = useCallback(
    ({ item }) => (
      <RN.TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() => onPressHandler({ type: item.type })}
      >
        <RN.Text style={styles.itemText}>{item.title}</RN.Text>
        <SimpleLineIcons
          name={'arrow-right'}
          size={20}
          color={COLORS.white}
          style={styles.icon}
        />
      </RN.TouchableOpacity>
    ),
    [onPressHandler],
  );
  return (
    <RN.FlatList
      data={profileData}
      keyExtractor={(_, key) => `key - ${key}`}
      renderItem={renderItem}
      contentContainerStyle={{
        gap: 2,
        backgroundColor: COLORS.black2,
        borderRadius: 4,
      }}
    />
  );
};

const styles = RN.StyleSheet.create({
  item: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    minHeight: 65,
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: addAlpha(COLORS.dark, 0.7),
  },
  itemText: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: MontserratFonts.Montserrat_500,
  },
  icon: {
    position: 'absolute',
    right: 8,
  },
});
export default ProfileMain;
