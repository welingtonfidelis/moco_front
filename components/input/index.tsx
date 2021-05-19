import { Input as InputAntd, InputProps } from 'antd';
import { SearchProps } from 'antd/lib/input';

interface Props extends InputProps { }
interface InputSearchProps extends SearchProps {}

export const Input: React.FC<Props> = (props) => (
    <InputAntd
        size="large"
        allowClear
        className="input-simple"
        {...props}
    />
)

export const InputPassword: React.FC<Props> = (props) => (
    <InputAntd.Password
        size="large"
        allowClear
        className="input-simple"
        {...props}
    />
)

export const InputSearch: React.FC<InputSearchProps> = (props) => (
    <InputAntd.Search
        size="large"
        allowClear
        enterButton="Buscar"
        {...props}
    />
)