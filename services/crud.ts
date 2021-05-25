import { Notification } from "../components/notification";
import { api } from "./api";

interface RequestInterface {
    url: string;
    authorization: string;
}

interface ParamFilters extends RequestInterface {
    description?: string;
    date_start?: string;
    date_end?: string;
    cash_register_group_id?: string;
}
interface ListAllInterface extends ParamFilters {
    limit: number;
    page: number;
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

export const listAllService = async (props: ListAllInterface) => {
    const returnedValues = { ok: false, rows: [], count: 0 }

    const url = props.url;
    const authorization = props.authorization;

    delete props.url;
    delete props.authorization;

    try {
        const response = await api.get(
            url,
            {
                params: { ...props },
                headers: { authorization }
            }
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;
        returnedValues.rows = data.rows;
        returnedValues.count = data.count;
        returnedValues.ok = true;

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

export const listAllServiceWithoutParams = async (props: RequestInterface) => {
    const returnedValues = { ok: false, rows: [], count: 0 }

    try {
        const response = await api.get(
            props.url,
            {
                headers: { authorization: props.authorization }
            }
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;
        returnedValues.rows = data.rows;
        returnedValues.count = data.count;
        returnedValues.ok = true;

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

export const createService = async (props: CreateInterface) => {
    const returnedValues = { ok: false, data: {} }

    try {
        const response = await api.post(
            props.url,
            props.values,
            { headers: { authorization: props.authorization } }
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
            { headers: { authorization: props.authorization } }
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
            { headers: { authorization: props.authorization } }
        );

        const { data: dataResponse } = response;
        const { data } = dataResponse;
        returnedValues.data = data;
        returnedValues.ok = true;

        Notification({
            type: 'success',
            message: 'Excluido.',
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