import {
    Modal as Md,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { forwardRef, useImperativeHandle } from 'react';

interface IModalProps{
    title?:string,
    children?:any
};

export interface IModalRef{
    handleOpen: () => void, 
    handleClose: () => void, 
    isOpen:Boolean
};

export const Modal = forwardRef<IModalRef, IModalProps>((props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
          handleOpen = () => onOpen(),
          handleClose = () => onClose();

    useImperativeHandle(ref, () => ({
        handleOpen,
        handleClose,
        isOpen
    }));

    return (
        <>
            <Md isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{ props?.title }</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        { props['children'] }
                    </ModalBody>
                </ModalContent>
            </Md>
        </>
    )
});

Modal.displayName = "Modal";