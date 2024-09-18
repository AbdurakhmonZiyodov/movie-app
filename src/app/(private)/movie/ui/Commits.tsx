import { Button } from '@/components/Button';
import Commit from '@/components/Commit';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import { CommitType } from '@/components/Video/types';
import { map, orderBy } from 'lodash';
import { memo } from 'react';

interface CommitsProps {
  data: CommitType[];
  onPress?: () => void;
  isLoading?: boolean;
  control?: any;
}
function Commits({ data, onPress, isLoading, control }: CommitsProps) {
  if (!data || data.length === 0) return null;
  return (
    <>
      <FormInput
        placeholder={'Izoh yozing...'}
        multiline={true}
        control={control}
        name={'commit'}
        inputStyle={styles.textAreaInput}
      />
      <RN.View w={150} pt={10} pb={30}>
        <Button title={'Yuborish'} onPress={onPress} loading={isLoading} />
      </RN.View>
      <RN.ScrollView nestedScrollEnabled={true} style={{ height: 500 }}>
        {map(orderBy(data, ['created_at']).reverse() ?? [], (commit) => (
          <Commit key={commit.id} {...commit} />
        ))}
      </RN.ScrollView>
    </>
  );
}

const styles = RN.StyleSheet.create({
  textAreaInput: {
    minHeight: 60,
  },
});

export default memo(Commits);
