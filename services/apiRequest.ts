import { Notification } from "../components/notification";
import { api } from "./api";

interface RequestInterface {
    url: string;
}

interface ListInterface extends RequestInterface {
    limit?: number;
    page?: number;
    description?: string;
    date_start?: string;
    date_end?: string;
    cash_register_group_id?: string;
}

interface CreateInterface extends RequestInterface {
    values: object;
}

interface UpdateInterface extends RequestInterface {
    id: string;
    values: object;
}

interface DeleteInterface extends RequestInterface {
    id: string;
}

interface ResponseDataInterface {
    ok: boolean;
    count?: number;
    rows?: Array<any>;
    date_start?: Date;
    date_end?: Date;
    revenue?: number;
    expense?: number;
    profit?: number;
    total?: number;
}

export const listService = async (props: ListInterface) => {
    const returnedValues: ResponseDataInterface = { ok: false }

    const url = props.url;

    delete props.url;

    try {
        const response = await api.get(
            url,
            {
                params: { ...props },
            }
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;

        Object.assign(returnedValues, { ok: true, ...data })

    } catch (error) {
        const message = 'Erro ao trazer a lista.'
        const description = 'Houve um problema ao trazer esta lista. Por favor, tente novamente.';

        Notification({
            type: 'error',
            message,
            description,
            statusCode: error?.response?.status
        });
    } finally {
        return returnedValues;
    }
}

export const downloadFileBufferService = async (props: ListInterface, fileName: string) => {
    const url = props.url;

    delete props.url;

    try {
        const response = await api.get(
            url,
            {
                params: { ...props },
                responseType: 'blob'
            }
        );

        const { data } = response;

        //open file in new tab
        // const file = new Blob([data], { type: 'application/pdf'});
        // const fileURL = URL.createObjectURL(file);
        // window.open(fileURL);

        //download file
        const tmpUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = tmpUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
    } catch (error) {
        const message = 'Erro ao baixar o arquivo.'
        const description = 'Houve um problema ao baixar este arquivo. Por favor, tente novamente.';

        Notification({
            type: 'error',
            message,
            description,
            statusCode: error?.response?.status
        });
    }
}

export const createService = async (props: CreateInterface) => {
    const returnedValues = { ok: false, data: {} }

    try {
        const response = await api.post(
            props.url,
            props.values,
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;

        returnedValues.data = data;
        returnedValues.ok = true;

        Notification({
            type: 'success',
            message: 'Salvo.',
            description: 'Informação salva com sucesso.'
        });
    } catch (error) {
        const message = 'Erro ao salvar informação.'
        const description = 'Houve um problema ao salvar esta informação. Por favor, tente novamente.';

        Notification({
            type: 'error',
            message,
            description,
            statusCode: error?.response?.status
        });
    } finally {
        return returnedValues;
    }
}

export const updateService = async (props: UpdateInterface) => {
    const returnedValues = { ok: false, data: {} }

    try {
        const response = await api.put(
            `${props.url}/${props.id}`,
            props.values,
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;

        returnedValues.data = data;
        returnedValues.ok = true;

        Notification({
            type: 'success',
            message: 'Salvo.',
            description: 'Informação salva com sucesso.'
        });
    } catch (error) {
        const message = 'Erro ao salvar informação.'
        const description = 'Houve um problema ao salvar esta informação. Por favor, tente novamente.';

        Notification({
            type: 'error',
            message,
            description,
            statusCode: error?.response?.status
        });
    } finally {
        return returnedValues;
    }
}

export const deleteService = async (props: DeleteInterface) => {
    const returnedValues = { ok: false, data: {} }

    try {
        const response = await api.delete(
            `${props.url}/${props.id}`,
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;

        returnedValues.data = data;
        returnedValues.ok = true;

        Notification({
            type: 'success',
            message: 'Excluído.',
            description: 'Informação excluida com sucesso.'
        });

    } catch (error) {
        const message = 'Erro ao excluir informação.'
        const description = 'Houve um problema ao excluir esta informação. Por favor, tente novamente.';

        Notification({
            type: 'error',
            message,
            description,
            statusCode: error?.response?.status
        });
    } finally {
        return returnedValues;
    }
}