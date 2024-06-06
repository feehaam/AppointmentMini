import React, { PureComponent } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
import styles from "../graphical/PieView.module.css";
import PieItem from "./PieItem";

function MultilineView({ title, data, description, colors, key1, key2, key3 }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.description}>{description}</div>
        <div className={styles.innercont}>
          <div className={styles.visual}>
            <LineChart width={350} height={150} data={data}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {key2 !== null ? (
                <Line
                  type="monotone"
                  dataKey={key2}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              ) : (
                ""
              )}
              ;
              {key3 !== null ? (
                <Line
                  type="monotone"
                  dataKey={key3}
                  stroke="#ff66ff"
                  activeDot={{ r: 8 }}
                />
              ) : (
                ""
              )}
              ;
              <Line type="monotone" dataKey={key1} stroke="#82ca9d" />
            </LineChart>
          </div>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </div>
  );
}

export default MultilineView;

{
  /* <MultilineView title={'Calories from carbohydrate(A), protein(B) and fat(C)'} data={weeklyCPF} key1={'A'} key2={'B'} key3={'C'} colors={randomColorArray(weeklyCPF.length, graphColor)} description={type + ' view of your daily intake calories from carbohydrate, protein and fat. Each block of the graph shows 3 bars presenting 3 different amount of nutritions you ate a day.'} />*/
}
