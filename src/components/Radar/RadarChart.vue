<template>
  <div>
    <div class="radarChart"></div>
  </div>
</template>

<script>
import * as radar from "./radarChart.js";
import * as d3 from "d3";

export default {
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
  methods: {
    transformData(features) {
      return Object.keys(features).map((key) => ({
        axis: key,
        value: features[key],
      }));
    },
  },
  mounted() {
    var margin = { top: 100, right: 100, bottom: 100, left: 100 },
      width =
        Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
      height = Math.min(
        width,
        window.innerHeight - margin.top - margin.bottom - 20
      );

    var data = this.transformData(this.features);

    var color = d3.scaleOrdinal().range(["#EDC951", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: true,
      color: color,
    };
    console.log(data);
    radar.default(".radarChart", data, radarChartOptions);
  },
};
</script>



<style>
.legend {
  font-family: "Raleway", sans-serif;
  fill: #333333;
}

.tooltip {
  fill: #333333;
}
</style>