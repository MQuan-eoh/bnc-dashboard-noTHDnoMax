import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getPath = (x, y, width, height) => {
  return `M${x},${y + height} L${x + width},${y + height} L${
    x + width
  },${y} L${x},${y} Z`;
};

const Bar3D = (props) => {
  const { fill, x, y, width, height } = props;
  const depth = 10; // Depth of the 3D effect

  // Main front face
  const frontPath = getPath(x, y, width, height);

  // Top face
  const topPath = `
    M${x},${y}
    L${x + depth},${y - depth}
    L${x + width + depth},${y - depth}
    L${x + width},${y}
    Z
  `;

  // Side face
  const sidePath = `
    M${x + width},${y}
    L${x + width + depth},${y - depth}
    L${x + width + depth},${y + height - depth}
    L${x + width},${y + height}
    Z
  `;

  return (
    <g>
      <path d={frontPath} fill={fill} />
      <path
        d={topPath}
        fill={fill}
        style={{ filter: "brightness(1.2)" }}
        opacity="0.8"
      />
      <path
        d={sidePath}
        fill={fill}
        style={{ filter: "brightness(0.8)" }}
        opacity="0.8"
      />
    </g>
  );
};

const Bar3DChart = ({ data, height = "150px" }) => {
  return (
    <div style={{ height: height, width: "100%", marginTop: "1rem" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20, // Extra space for 3D top
            right: 20, // Extra space for 3D side
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#ccc"
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#ccc" tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Bar dataKey="value" shape={<Bar3D />} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar3DChart;
