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
        Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
      height = Math.min(
        width,
        window.innerHeight - margin.top - margin.bottom - 20
      );

    var data = this.transformData(this.features);

    var color = d3.scaleOrdinal().range(["#f2921d", "#f21b6a", "#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: true,
      color: color,
    };
    radar.default(".radarChart", data, radarChartOptions);
  },
};
</script>

<style>
.legend {
  font-family: "Raleway", sans-serif;
  fill: var(--primary-color);
}

.tooltip {
  fill: var(--primary-color);
  font-weight: bolder;
}

.legend__info-box {
  fill: var(--background-color);
  stroke: var(--primary-color);
  stroke-width: 1px;
}

.legend__info {
  fill: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-size: 10px;
}
</style>