import { Modal as ModalAntd, ModalProps } from 'antd';

interface Props extends ModalProps {
    title: string;
    isVisible: boolean;
    onOk: (item: any) => void;
    onCancel: (item: any) => void;
}

export const Modal: React.FC<Props> = (props) => (
    <ModalAntd
        title={props.title}
        okText="SIM"
        cancelText="NÃO"
        visible={props.isVisible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        {...props}
    >
        {props.children}
    </ModalAntd>
)