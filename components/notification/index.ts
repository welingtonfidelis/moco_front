import { notification } from "antd"

interface Props {
  message: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number
}

export const Notification = (props: Props) => {
    return notification[props.type]({
      message: props.message,
      description: props.description,
      duration: props.duration ?? 8
    });
}