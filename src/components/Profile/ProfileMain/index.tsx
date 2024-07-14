import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { FC, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useUserSettings } from '@/store/hooks/useSettings';

enum ProfileMenu {
  PAYMENT,
  USER_EDIT,
  LOG_OUT,
  DELETE,
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
  {
    type: ProfileMenu.DELETE,
    title: "Hisobni o'chirish (delete account)",
  },
];

interface ProfileMainProps {
  onLogout(): void;
  onBuyPremium(): void;
  onProfileEdit(): void;
}

const ProfileMain: FC<ProfileMainProps> = ({
  onLogout,
  onBuyPremium,
  onProfileEdit,
}) => {
  const { settings, deleteAccountHandler } = useUserSettings();

  const onPressHandler = useCallback(
    async ({ type }: { type: ProfileMenu }) => {
      if (type === ProfileMenu.LOG_OUT) {
        await onLogout();
        return;
      }
      if (type === ProfileMenu.PAYMENT) {
        await onBuyPremium();
        return;
      }
      if (type === ProfileMenu.USER_EDIT) {
        await onProfileEdit();
        return;
      }
      if (type === ProfileMenu.DELETE) {
        await deleteAccountHandler();
        return;
      }
    },
    [deleteAccountHandler, onBuyPremium, onLogout, onProfileEdit],
  );

  const renderItem: ListRenderItem<(typeof profileData)[0]> = useCallback(
    ({ item }) => {
      if (
        item.type === ProfileMenu.PAYMENT &&
        !!settings &&
        !settings.isPremium
      ) {
        // @TODO: it should be improved
        return null;
      }
      return (
        <RN.TouchableOpacity
          activeOpacity={0.5}
          style={styles.item}
          onPress={() => onPressHandler({ type: item.type })}
        >
          <RN.Text
            style={[
              styles.itemText,
              item.type === ProfileMenu.DELETE && styles.deleteAccount,
            ]}
          >
            {item.title}
          </RN.Text>
          <SimpleLineIcons
            name={'arrow-right'}
            size={20}
            color={COLORS.white}
            style={styles.icon}
          />
        </RN.TouchableOpacity>
      );
    },
    [onPressHandler, settings],
  );
  return (
    <RN.FlatList
      data={profileData}
      keyExtractor={(_, key) => `key - ${key}`}
      renderItem={renderItem}
      scrollEnabled={false}
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
  deleteAccount: {
    color: COLORS.orange,
  },
});
export default ProfileMain;
