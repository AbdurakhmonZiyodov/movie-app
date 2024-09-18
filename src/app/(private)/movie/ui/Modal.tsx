import RN from '@/components/RN';
import RNVideo from '@/components/RNVideo';
import useVisibility, { UseVisibility } from '@/shared/hooks/useVisibility';
import { RefObject, useImperativeHandle } from 'react';
import RNModal from 'react-native-modal';

interface ModalProps {
  id: string;
  modalRef: RefObject<UseVisibility>;
}

export default function Modal({ id, modalRef }: ModalProps) {
  const modalVisibltiy = useVisibility();

  useImperativeHandle(modalRef, () => modalVisibltiy, [modalVisibltiy]);

  return (
    <RNModal isVisible={modalVisibltiy.visible} style={styles.modal}>
      <RNVideo
        id={id}
        onBack={() => {
          modalRef.current?.hide();
        }}
      />
    </RNModal>
  );
}

const styles = RN.StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
});
