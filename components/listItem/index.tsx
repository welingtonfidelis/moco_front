import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Button as ButtonAntd, ButtonProps } from 'antd';

interface Props {
    key: number;
    title: string;
    subtitle?: string;
    detail1?: string;
    detail2?: string;
}

export const ListItem: React.FC<Props> = (props) => (
    <div className="list-item" key={props.key}>
        <div className="list-item-icon"></div>

        <div className="list-item-col1">
            <strong>{props.title}</strong>
            <span>{props.subtitle}</span>
        </div>

        <div className="list-item-col2">
            <span>{props.detail1}</span>
            <span>{props.detail2}</span>
        </div>

        <div className="list-item-action">
            <EditOutlined title="Editar" />

            <DeleteFilled title="Excluir" />
        </div>
    </div>
)