import { DeleteFilled, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

interface Props {
    key: number;
    title: string;
    subtitle?: string;
    detail1?: string;
    detail2?: string;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
    onDeleteLoad: boolean;
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
            <EditOutlined title="Editar" onClick={props.onEdit}/>

            <Popconfirm 
                placement="left" 
                title={'Deseja realmente excluir esta informação?'} 
                onConfirm={props.onDelete} 
                okText="Sim" 
                cancelText="Não"
            >
                { props.onDeleteLoad ? <LoadingOutlined /> : <DeleteFilled title="Excluir"/> }
            </Popconfirm> 
        </div>
    </div>
)