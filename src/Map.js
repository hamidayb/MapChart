import { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_pakistanHigh from '@amcharts/amcharts4-geodata/pakistanHigh'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { width } from '@amcharts/amcharts4/.internal/core/utils/Utils'

am4core.useTheme(am4themes_animated)

const Map = () => {
  useEffect(() => {
    const map = am4core.create('chartdiv', am4maps.MapChart)
    map.geodata = am4geodata_pakistanHigh
    map.projection = new am4maps.projections.Miller()

    const polygonSeries = new am4maps.MapPolygonSeries()
    polygonSeries.useGeodata = true
    polygonSeries.data = [
      {
        id: 'PK-BA',
        name: 'BALOCHISTAN',
        fill: am4core.color('#ff2b2b'),
      },
      {
        id: 'PK-KP',
        name: 'KPK',
        fill: am4core.color('#ffc300'),
      },
      {
        id: 'PK-PB',
        name: 'PUNJAB',
        fill: am4core.color('#3ca88f'),
      },
      {
        id: 'PK-SD',
        name: 'SINDH',
        fill: am4core.color('#3e4ea0'),
      },
      {
        id: 'PK-IS',
        name: 'ICT',
        fill: am4core.color('#cc6900'),
      },
    ]
    map.series.push(polygonSeries)
    polygonSeries.margin(0, 0, 0, 0)
    polygonSeries.padding(0, 0, 0, 0)

    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipHTML = `<div style='color: black;  padding: 5px; width: 150px;height: 100%; line-height: 24px; text-decoration: underline; text-align: left; font-size: 12px'><span style='font-size: 16px; margin-bottom: 8px; font-weight: bold; color: {fill}; opacity: 1; text-decoration: none; display: inline-block;'>{name}</span><br />Literacy Rate <br /> Enrollment Rate <br /> Completion Rate <br /> Number of Schools <br />Number of Teachers <br /> Budget Expenditure</div>`
    polygonTemplate.propertyFields.fill = 'fill'

    polygonSeries.tooltip.getFillFromObject = false
    polygonSeries.tooltip.background.fill = am4core.color('#fafcff')
    const hs = polygonTemplate.states.create('hover')
    hs.properties.opacity = 0.8

    const legend = new am4charts.Legend()
    legend.parent = map.chartContainer
    legend.useDefaultMarker = true

    const marker = legend.markers.template.children.getIndex(0)
    // marker.width = 24
    // marker.height = 24
    marker.cornerRadius(12, 12, 12, 12)

    let width = window.innerWidth
    if (width > 1020) {
      legend.position = 'left'
      legend.align = 'left'
    } else {
      legend.position = 'bottom'
      legend.align = 'none'
      legend.valign = 'bottom'
    }

    window.addEventListener('resize', () => {
      let width = document.body.clientWidth
      if (width > 1020) {
        legend.position = 'left'
        legend.align = 'left'
      } else {
        legend.position = 'bottom'
        legend.align = 'none'
        legend.valign = 'bottom'
      }
    })
    legend.fontSize = 18
    legend.fontWeight = 'bold'
    legend.labels.template.propertyFields.fill = 'fill'
    legend.data = [
      {
        name: 'BALOCHISTAN',
        fill: am4core.color('#ff2b2b'),
      },
      {
        name: 'KPK',
        fill: am4core.color('#ffc300'),
      },
      {
        name: 'PUNJAB',
        fill: am4core.color('#3ca88f'),
      },
      {
        name: 'SINDH',
        fill: am4core.color('#3e4ea0'),
      },
      {
        name: 'ICT',
        fill: am4core.color('#cc6900'),
      },
    ]

    return () => {
      map.dispose()
    }
  })

  return (
    <div
      className="chartdiv"
      style={{
        width: '80%',
        height: '100vh',
        paddingLeft: '100px',
        // backgroundColor: '#ff0',
      }}
    ></div>
  )
}

export default Map
