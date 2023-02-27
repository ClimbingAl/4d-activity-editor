import { Individual } from "amrc-activity-lib";
import * as d3 from "d3";

export interface Label {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateViewportHeight(
  config: any,
  individualsMap: Map<string, Individual>
) {
  let viewPortHeight = 0;
  const individualCount = Math.max(1, individualsMap.size);
  viewPortHeight += config.layout.individual.topMargin;
  viewPortHeight += config.layout.individual.gap;
  viewPortHeight += config.layout.individual.height * individualCount;
  viewPortHeight += config.layout.individual.gap * individualCount;
  viewPortHeight += config.layout.individual.bottomMargin;
  return viewPortHeight;
}

export function clearDiagram(svgRef: any) {
  const svgWhole = d3.select(svgRef);
  svgWhole.selectAll("#activity-diagram-group").remove();
  return svgWhole.append("g").attr("id", "activity-diagram-group");
}

export function createTooltip() {
  let body = d3.select("body");
  // remove any existing tooltips
  body.selectAll("#tooltip").remove();
  // create new tooltip
  let tooltip = body
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "white")
    .style("color", "black")
    .style("padding", "5px")
    .style("border-radius", "10px")
    .style("border", "1px solid black");

  return tooltip;
}

export function removeLabelIfItOverlaps(
  labels: Label[],
  node: SVGGraphicsElement
) {
  console.log("labels", labels);
  if (labels.length === 0) {
    return;
  }
  const bbox = node.getBBox();
  labels.forEach((l) => {
    if (bbox.x >= l.x && bbox.x <= l.x + l.width) {
      if (bbox.y >= l.y && bbox.y <= l.y + l.height) {
        node.remove();
      }
    }
  });
}
