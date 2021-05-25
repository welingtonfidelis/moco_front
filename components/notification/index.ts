import { notification } from "antd"
import { handleUnauthorized } from "../../services/auth";

interface Props {
  message: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  statusCode?: number;
}

export const Notification = (props: Props) => {
    const unauthorizedMessage = handleUnauthorized(props.statusCode);
    
    return notification[props.type]({
      message: props.message,
      description: unauthorizedMessage || props.description,
      duration: 5
    });
}