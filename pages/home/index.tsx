import { BarChart, PieChart } from '../../components/chart';

export default function Home() {
    // const userInfo = useSelector((state: { user: UserReducerInterface }) => state.user);

    const pieData = {
        labels: ['Entrada', 'Saída'],
        series: [250.50, 120.90]
    }

    const barData = {
        labels: ['01/05/2021', '01/05/2021', '03/05/2021', '06/05/2021',],
        seriesName: "R$",
        seriesData: [25.50, 130, 50, 9.50]
    }

    return (
        <div id="home-page">
            <h3>Principal</h3>

            <div className="home-charts">
                <div className="home-chart">
                    <span>Caixa atual: R$ 1550,00</span>
                    <span>Receitas: R$500,00</span>
                    <span>Despesas: R$500,00</span>
                    <span>Lucro: R$500,00</span>
                </div>

                <div className="home-chart">
                    <strong>Entradas e Saídas do mês de Maio</strong>

                    <PieChart labels={pieData.labels} series={pieData.series} />
                </div>

                <div className="home-chart">
                    <strong>Entradas do mês de Maio</strong>

                    <BarChart labels={barData.labels} seriesData={barData.seriesData} seriesName={barData.seriesName} />
                </div>

                <div className="home-chart">
                    <BarChart labels={barData.labels} seriesData={barData.seriesData} seriesName={barData.seriesName} />
                </div>
            </div>
        </div>
    )
}