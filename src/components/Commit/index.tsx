import { COLORS, addAlpha } from '@/shared/constants/colors';
import RN from '../RN';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { SourceSansProFonts } from '@/shared/assets/fonts/source-sans-pro.fonts';
import { AntDesign as AntDesignIcon } from '@expo/vector-icons';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { CommitType } from '../Video/types';

export default function Commit({
  message,
  count_dislike,
  count_like,
}: CommitType) {
  return (
    <RN.View p={10} bgColor={COLORS.black2} bdrs={11} mv={10}>
      <RN.View fd={'row'} ai={'center'} g={8} pb={15}>
        <RN.Image source={require('./image.png')} style={styles.image} />
        <RN.View>
          <RN.Text style={styles.username}>{'Jane Doe'}</RN.Text>
          <RN.Text style={styles.date}>{'5 min ago'}</RN.Text>
        </RN.View>
      </RN.View>
      <RN.Text style={styles.commit}>{message}</RN.Text>
      <RN.View fd={'row'} ai={'center'} g={10} pv={7} pt={14}>
        <RN.TouchableOpacity style={styles.fd}>
          <AntDesignIcon name={'like1'} size={24} color={COLORS.orange} />
          <RN.Text style={[styles.likeCount, styles.activeLinkeCount]}>
            {`${count_like}`}
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity style={[styles.fd, { paddingTop: 3 }]}>
          <AntDesignIcon name={'dislike1'} size={24} />
          <RN.Text
            style={[styles.likeCount, { transform: [{ translateY: -4 }] }]}
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
