import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from '../Graphical/PieView.module.css'
import PieItem from "./PieItem"
import { useTheme } from "@mui/material";

function TwowayBarView({ title, data, description, colors }) {

    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.innercont}>
                    <div className={styles.visual}>
                        <BarChart
                            width={250}
                            height={250}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <ReferenceLine y={0} stroke="#000" />
                            <Bar dataKey="value" fill={colors[0]} />
                        </BarChart>
                    </div>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'justify' }}>
                        {data.map((entry, index) => (
                            <PieItem
                                key={`cell-${index}`}
                                entry={entry}
                                color={mode === 'dark' ? 'black' : 'white'}
                                bgcolor={colors[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TwowayBarView;

{/* <MultibarView title={'Calories from carbohydrate, protein and fat'} data={weeklyCPF} colors={randomColorArray(weeklyCPF.length, graphColor)} description={type + ' view of your daily intake calories from carbohydrate, protein and fat. Each block of the graph shows 3 bars presenting 3 different amount of nutritions you ate a day.'} />
         */}