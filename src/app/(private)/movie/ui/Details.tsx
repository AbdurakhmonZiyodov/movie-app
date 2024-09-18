import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { addAlpha, COLORS } from '@/shared/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import { memo } from 'react';
import RenderHtml from '@/components/RenderHtml';
import { OpenSansFonts } from '@/shared/assets/fonts/open-sans.fonts';

interface DetailsProps {
  fullMovieData: any;
  movieVerticalImageUrl: string;
}

function Details({ fullMovieData, movieVerticalImageUrl }: DetailsProps) {
  return (
    <>
      <RN.Text style={styles.movieName}>{fullMovieData?.name}</RN.Text>
      <RN.View fd={'row'} ai={'flex-start'} pt={4} pb={18} g={10}>
        <RN.Text style={styles.subStatusText}>
          {fullMovieData?.min_age}
          {'+'}
        </RN.Text>
        <RN.Text style={styles.subStatusText}>
          {fullMovieData?.status_type}
        </RN.Text>
      </RN.View>
      {!!movieVerticalImageUrl && (
        <RN.Image
          source={{ uri: movieVerticalImageUrl }}
          style={styles.movieVerticalImage}
          contentFit={'cover'}
        />
      )}
      <RN.View pt={10}>
        <RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Ovoz berdi: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.sounder[0]?.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Janr: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.sounder[1]?.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Yili: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.year.year}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Mamlakat: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.country.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Tarjima: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.language}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.View>
      <Spacing height={11} />
      <RN.View p={10} bgColor={COLORS.black2} bdrs={11}>
        <RenderHtml children={fullMovieData?.descr} style={styles.body1Text} />
      </RN.View>
      <RN.Text style={styles.largeTitle}>{'Izohlar'}</RN.Text>
    </>
  );
}

const styles = RN.StyleSheet.create({
  movieName: {
    fontSize: normalizeHeight(36),
    fontFamily: PoppinsFonts.Poppins_500,
    color: COLORS.white,
    lineHeight: normalizeHeight(54),
  },
  subStatusText: {
    fontSize: normalizeHeight(12),
    fontFamily: OpenSansFonts.OpenSans_600,
    color: COLORS.darkwhite,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.darkwhite, 0.5),
    borderRadius: 4,
  },
  largeTitle: {
    fontSize: normalizeHeight(23),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    paddingVertical: 15,
  },

  body1Text: {
    fontSize: normalizeHeight(14),
    fontFamily: OpenSansFonts.OpenSans_400,
    color: COLORS.darkwhite,
  },
  body1TextOrange: {
    color: COLORS.orange,
  },
  movieVerticalImage: {
    width: normalizeWidth(170),
    height: normalizeHeight(220),
    borderRadius: 11,
  },
});

export default memo(Details);
