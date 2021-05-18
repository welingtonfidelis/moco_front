import { Input as InputAntd, InputProps } from 'antd';

interface Props extends InputProps {}

export const Input: React.FC<Props> = (props) => (
    <InputAntd
        size="large"
        { ...props }
    />
)

export const InputPassword: React.FC<Props> = (props) => (
    <InputAntd.Password
        size="large"
        className="input-simple"
        { ...props }
    />
)