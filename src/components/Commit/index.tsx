import { COLORS, addAlpha } from '@/shared/constants/colors';
import RN from '../RN';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { SourceSansProFonts } from '@/shared/assets/fonts/source-sans-pro.fonts';
import { AntDesign as AntDesignIcon } from '@expo/vector-icons';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { CommitType } from '../Video/types';
import { getTimeAgoString } from '@/shared/utils/date';
import config from '@/config';
import { useCallback } from 'react';
import { useAddLikeOrDislikeMutation } from '@/store/services/features/MovieApi';

export default function Commit({
  message,
  count_dislike,
  count_like,
  created_at,
  user,
  is_dislike,
  is_like,
  id,
}: CommitType) {
  console.log({ is_dislike, is_like, name: user.name });
  const [addLikeOrDislike] = useAddLikeOrDislikeMutation();

  const onPressLikeOrDislike = useCallback(
    (type: 'dislike' | 'like') => {
      addLikeOrDislike({
        type,
        id,
      });
    },
    [addLikeOrDislike, id],
  );
  return (
    <RN.View p={10} bgColor={COLORS.black2} bdrs={11} mv={10}>
      <RN.View fd={'row'} ai={'center'} g={8} pb={15}>
        {user.image ? (
          <RN.Image
            source={{ uri: config.IMAGE_URL + '/' + user.image }}
            style={styles.image}
          />
        ) : (
          <RN.View
            style={[
              styles.image,
              {
                borderWidth: 1,
                borderColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <RN.Text style={styles.firstLetter}>{user.name[0]}</RN.Text>
          </RN.View>
        )}
        <RN.View>
          <RN.Text style={styles.username}>{user.name}</RN.Text>
          <RN.Text style={styles.date}>{getTimeAgoString(created_at)}</RN.Text>
        </RN.View>
      </RN.View>
      <RN.Text style={styles.commit}>{message}</RN.Text>
      <RN.View fd={'row'} ai={'center'} g={10} pv={7} pt={14}>
        <RN.TouchableOpacity
          style={styles.fd}
          disabled={is_like}
          onPress={() => onPressLikeOrDislike('like')}
        >
          <AntDesignIcon
            name={'like1'}
            size={24}
            color={is_like ? COLORS.orange : COLORS.black}
          />
          <RN.Text
            style={[styles.likeCount, is_like && styles.activeLinkeCount]}
          >
            {`${count_like}`}
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          style={[styles.fd, { paddingTop: 3 }]}
          disabled={is_dislike}
          onPress={() => onPressLikeOrDislike('dislike')}
        >
          <AntDesignIcon
            name={'dislike1'}
            size={24}
            color={is_dislike ? COLORS.orange : COLORS.black}
          />
          <RN.Text
            style={[
              styles.likeCount,
              is_dislike && styles.activeLinkeCount,
              { transform: [{ translateY: -4 }] },
            ]}
          >
            {`${count_dislike}`}
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  commit: {
    fontSize: normalizeHeight(16),
    fontFamily: SourceSansProFonts.SourceSansPro_400,
    color: COLORS.darkwhite,
  },
  firstLetter: {
    fontSize: normalizeHeight(22),
    fontFamily: SourceSansProFonts.SourceSansPro_700,
    color: COLORS.white,
  },
  username: {
    fontSize: normalizeHeight(18),
    fontFamily: SourceSansProFonts.SourceSansPro_600,
    color: COLORS.white,
  },
  date: {
    fontSize: normalizeHeight(14),
    fontFamily: SourceSansProFonts.SourceSansPro_600,
    color: addAlpha(COLORS.white, 0.4),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  fd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    fontFamily: PoppinsFonts.Poppins_400,
    color: COLORS.dark,
    paddingLeft: 5,
  },
  activeLinkeCount: {
    color: COLORS.orange,
  },
});
