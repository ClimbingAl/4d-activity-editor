import { MouseEvent } from "react";
import { Activity, Participation } from "amrc-activity-lib";

let mouseOverElement: any | null = null;

export function drawParticipations(
  config: any,
  svgElement: any,
  activities: Activity[],
  tooltip: any
) {
  const parts: any[] = [];
  activities.forEach((a) => {
    a.participations?.forEach((p) => {
      parts.push({
        box: getPositionOfParticipation(svgElement, a.id, p.individualId),
        activityId: a.id,
        individualId: p.individualId,
        participation: p,
      });
    });
  });

  svgElement
    .selectAll(".participation")
    .data(parts.values())
    .join("rect")
    .attr("class", "participation")
    .attr("id", (p: any) => "p" + p.activityId + p.individualId)
    .attr("x", (d: any) => d.box.x)
    .attr("y", (d: any) => d.box.y)
    .attr("width", (d: any) => d.box.width)
    .attr("height", (d: any) => d.box.height)
    .attr("stroke", config.presentation.participation.stroke)
    .attr("stroke-dasharray", config.presentation.participation.strokeDasharray)
    .attr("stroke-width", config.presentation.participation.strokeWidth)
    .attr("fill", config.presentation.participation.fill)
    .attr("opacity", config.presentation.participation.opacity);

  hoverParticipations(config, svgElement, tooltip);
}

function hoverParticipations(config: any, svgElement: any, tooltip: any) {
  svgElement
    .selectAll(".participation")
    .on("mouseover", function (event: MouseEvent) {
      mouseOverElement = event.target as HTMLElement;
      mouseOverElement.style.opacity =
        config.presentation.participation.opacityHover;
      tooltip.style("visibility", "visible");
    })
    .on("mouseout", function (event: MouseEvent) {
      if (mouseOverElement) {
        mouseOverElement.style.opacity =
          config.presentation.participation.opacity;
        mouseOverElement = null;
      }
      tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function (event: MouseEvent, d: any) {
      tooltip
        .style("top", event.pageY + 20 + "px")
        .style("left", event.pageX + "px")
        .html(participationTooltip(d));
    });
}

export function clickParticipations(
  svgElement: any,
  activities: Activity[],
  clickParticipation: any
) {
  activities.forEach((a) => {
    a.participations.forEach((p) => {
      svgElement
        .select("#p" + a.id + p.individualId)
        .on("click", function (event: MouseEvent) {
          clickParticipation(a, p);
        });
    });
  });
}

function participationTooltip(part: any) {
  let tip = "<strong>Participant</strong>";
  if (part.participation.role) tip += "<br/> Role: " + part.participation.role;
  if (part.participation.type) tip += "<br/> Type: " + part.participation.type;
  return tip;
}

function getPositionOfParticipation(
  svgElement: any,
  activityId: string,
  individualId: string
) {
  const activityElement = svgElement
    .select("#a" + activityId)
    .node()
    .getBBox();

  const x = activityElement.x;
  const width = activityElement.width;

  const individualElement = svgElement
    .select("#i" + individualId)
    .node()
    .getBBox();

  const y = individualElement.y;
  const height = individualElement.height;

  return {
    x: x,
    y: y,
    width: width,
    height: height,
  };
}