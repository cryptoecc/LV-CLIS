"use client";
import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
const NewsChart = () => {
  useEffect(() => {
    const root = am5.Root.new("linechartdiv");
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
      })
    );
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 25,
        }),
      })
    );
    let xAxis = chart.yAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 25,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        fill: am5.color(0x095256),
        stroke: am5.color(0x095256),
      })
    );
    let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        fill: am5.color(0x095256),
        stroke: am5.color(0xf95256),
      })
    );
    series.data.setAll([
      { date: new Date(2023, 0, 1).getTime(), value: 27 },
      { date: new Date(2023, 0, 2).getTime(), value: 50 },
      { date: new Date(2023, 0, 3).getTime(), value: 73 },
      { date: new Date(2023, 0, 4).getTime(), value: 22 },
    ]);
    series2.data.setAll([
      { date: new Date(2023, 0, 1).getTime(), value: 75 },
      { date: new Date(2023, 0, 2).getTime(), value: 22 },
      { date: new Date(2023, 0, 3).getTime(), value: 35 },
      { date: new Date(2023, 0, 4).getTime(), value: 60 },
    ]);

    return () => {
      root.dispose();
    };
  }, []);
  return (
    <div className="chart">
      <div className="title">기사량 추이</div>
      <div id="linechartdiv" className="w-full h-full"></div>
    </div>
  );
};

export default NewsChart;
//am5 network chart
