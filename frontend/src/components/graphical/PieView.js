import { Cell, Pie, PieChart } from "recharts"
import PieItem from "./PieItem"
import styles from './PieView.module.css'

export default function PieView({ title, data, description, colors, size }) {

    if (data === null || data.length === 0) return (<><div className={styles.container}><h3>Not enough data to make a Pie chart on <br></br> {title}</h3></div></>)
    return (<div className="graph-item">
        <div className={styles.container}>
            <h2 className={styles.description}>
                {title}
            </h2>
            <div className={styles.innercont}>
                <div className={styles.visual}>
                    <PieChart width={25 * size} height={25 * size}>
                        <Pie data={data} cx="50%" cy="50%" outerRadius={8 * size} label>
                            {
                                data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index]}
                                    />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </div>
                <div className={styles.title}>
                    {description}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: "center" }}>
                    {data.map((entry, index) => (
                        <PieItem
                            key={`cell-${index}`}
                            entry={entry}
                            color={'white'}
                            bgcolor={colors[index]}
                        />
                    ))}
                </div>
            </div>
            <br></br>

        </div>
    </div>)
}

{/* <PieView title={'Calories burned from diet'} data={weeklyJson} colors={randomColorArray(weeklyJson.length, graphColor)} size={10} description={type + ' view of your daily intake calories. Each block of the graph shows amount of calories you ate a day.'} />
         */}