import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../Graphical/PieView.module.css'
import PieItem from "./PieItem"
import { useTheme } from "@mui/material";

function MultibarView({ title, data, description, colors }) {

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
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="carbohydrate" fill="#8884d8" />
                <Bar dataKey="protein" fill="#82ca9d" />
                <Bar dataKey="fat" fill="#ff66ff" />
                {/* <Bar dataKey="carbohydrate" fill={colors[0]} />
                <Bar dataKey="protein" fill={colors[1]} />
                <Bar dataKey="fat" fill={colors[2]} /> */}

            </BarChart>
                </div>
                <div className={styles.title}>
                    {title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'justify' }}>
                        {/* <PieItem
                            key={`cell-${1}`}
                            color={mode === 'dark' ? 'black' : 'white'}
                            bgcolor={'#8884d8'}
                        /> */}
                        {/* <PieItem
                            key={2}
                            color={mode === 'dark' ? 'black' : 'white'}
                            bgcolor={'#82ca9d'}
                        />
                        <PieItem
                            key={3}
                            color={mode === 'dark' ? 'black' : 'white'}
                            bgcolor={'#ff66ff'}
                        /> */}
                    {data.map((entry, index) => (
                        <PieItem
                            key={`cell-${index}`}
                            entry={{
                                'name': entry.name,
                                'value': entry.carbohydrate+"+"+entry.protein+"+"+entry.fat
                            }}
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

export default MultibarView;

{/* <MultibarView title={'Calories from carbohydrate, protein and fat'} data={weeklyCPF} colors={randomColorArray(weeklyCPF.length, graphColor)} description={type + ' view of your daily intake calories from carbohydrate, protein and fat. Each block of the graph shows 3 bars presenting 3 different amount of nutritions you ate a day.'} />
         */}