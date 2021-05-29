import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, PieChart } from '../../components/chart';
import { listService } from '../../services/apiRequest';
import { haveToken } from '../../services/auth';
import { cashOnHandStartLoading, cashOnHandStopLoading, cashOnHandUpdateValue } from '../../store/cashOnHand/actions';
import { CashOnHandReducerInterface } from '../../store/cashOnHand/model';
import { cashRegisterReportStartListLoading, cashRegisterReportUpdateList } from '../../store/cashRegisterReport/actions';
import { CashRegisterReportReducerInterface } from '../../store/cashRegisterReport/model';
import { UserReducerInterface } from '../../store/user/model';
import { maskDate, maskValue } from '../../util';

export default function Home() {
    const [actualMonthName] = useState(moment().subtract(1, "month").startOf("month").format('MMMM'));

    const dispatch = useDispatch();
    const userInfo = useSelector(
        (
            state: { user: UserReducerInterface }
        ) => state.user
    );
    const cashOnHandInfo = useSelector(
        (
            state: { cashOnHand: CashOnHandReducerInterface }
        ) => state.cashOnHand
    );
    const cashRegisterReportInfo = useSelector(
        (
            state: { cashRegisterReport: CashRegisterReportReducerInterface }
        ) => state.cashRegisterReport
    );
    const authorization = userInfo.token;
    const pieData = {
        labels: ['Entrada', 'Saída'],
        series: [cashRegisterReportInfo.profit, cashRegisterReportInfo.expense]
    }

    const barDataIn = {
        labels: cashRegisterReportInfo.list.filter(item => item.type === 'in').map(item => item.paid_in + ''),
        seriesName: "R$",
        seriesData: cashRegisterReportInfo.list.filter(item => item.type === 'in').map(item => item.value)
    }

    const barDataOut = {
        labels: cashRegisterReportInfo.list.filter(item => item.type === 'out').map(item => item.paid_in + ''),
        seriesName: "R$",
        seriesData: cashRegisterReportInfo.list.filter(item => item.type === 'out').map(item => item.value)
    }

    useEffect(() => {
        if (haveToken(userInfo)) {
            getCashRegisterReportList();
            getCashOnHandValue();
        }
    }, []);

    const getCashRegisterReportList = async () => {
        dispatch(cashRegisterReportStartListLoading());

        const startOfMonth = moment().clone().startOf('month');
        const endOfMonth = moment().clone().endOf('month');

        const url = '/cash-registers/report';
        const props = {
            url,
            authorization,
            date_start: startOfMonth.toString(),
            date_end: endOfMonth.toString()
        }

        const data = await listService(props);

        if (data.ok) {
            dispatch(cashRegisterReportUpdateList({
                loadingList: false,
                date_end: data.date_end,
                date_start: data.date_start,
                expense: data.expense,
                profit: data.profit,
                revenue: data.revenue,
                list: data.rows.map((item, index) => {
                    const paid_in = maskDate(new Date(item.paid_in));

                    return { ...item, key: index + 1, paid_in }
                })
            }));
        }
    }
    const getCashOnHandValue = async () => {
        dispatch(cashOnHandStartLoading());

        const props = {
            url: '/cash-registers/report/cash-on-hand',
            authorization
        }

        const data = await listService(props);

        if (data.ok) {
            const { total } = data;
            dispatch(cashOnHandUpdateValue(total));
        }

        dispatch(cashOnHandStopLoading());
    }

    return (
        <div id="home-page">
            <h3>Principal</h3>

            <div className="home-charts">
                <div className="home-chart">
                    <strong>Registros do mês de {actualMonthName}</strong>

                    <div className="home-cash-register-resume">
                        <span>Total em caixa: {maskValue(cashOnHandInfo.value)}</span>
                        <span>Receitas do mês: {maskValue(cashRegisterReportInfo.revenue)}</span>
                        <span>Despesas do mês: {maskValue(cashRegisterReportInfo.expense)}</span>
                        <span>Lucro do mês: {maskValue(cashRegisterReportInfo.profit)}</span>
                    </div>
                </div>

                <div className="home-chart">
                    <strong>Entradas e Saídas do mês de {actualMonthName}</strong>

                    <div className="home-cash-register-chart">
                        {
                            cashOnHandInfo.loading
                                ? <LoadingOutlined />
                                : <PieChart labels={pieData.labels} series={pieData.series} />
                        }
                    </div>
                </div>

                <div className="home-chart">
                    <strong>Entradas do mês de {actualMonthName}</strong>

                    <div className="home-cash-register-chart">
                        {
                            cashRegisterReportInfo.loadingList
                                ? <LoadingOutlined />
                                : <BarChart labels={barDataIn.labels} seriesData={barDataIn.seriesData} seriesName={barDataIn.seriesName} />
                        }
                    </div>
                </div>

                <div className="home-chart">
                    <strong>Saídas do mês de {actualMonthName}</strong>

                    <div className="home-cash-register-chart">
                        {
                            cashRegisterReportInfo.loadingList
                                ? <LoadingOutlined />
                                : <BarChart labels={barDataOut.labels} seriesData={barDataOut.seriesData} seriesName={barDataOut.seriesName} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}