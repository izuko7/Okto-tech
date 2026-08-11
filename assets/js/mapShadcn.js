/* ==========================================================================
   OKTO Technologies — Globe des partenaires pays (amCharts 5)
   ==========================================================================
   Pour ajouter / modifier un pays :
   1. Trouver le code ISO 3166-1 alpha-2 du pays (ex: "SN" pour le Sénégal)
   2. Ajouter/éditer une entrée dans PARTNERS_DATA ci-dessous
   3. coords = [longitude, latitude] de la capitale (sert au marqueur + à l'arc)
   4. partners = tableau de noms (laisser vide [] si pas encore connu,
      un texte par défaut s'affichera alors dans l'infobulle).
   ========================================================================== */

const OKTO_HQ = {
  name: "Côte d'Ivoire",
  coords: [-4.0083, 5.3599], // Abidjan [longitude, latitude]
};

const PARTNERS_DATA = {
  // ---------------------- Afrique de l'Ouest ----------------------
  CI: {
    name: "Côte d'Ivoire", flag: "🇨🇮", region: "Afrique de l'Ouest", isHQ: true,
    coords: [-4.0083, 5.3599],
    partners: ["RTI", "ARTCI", "ANSUT", "CIE", "SODECI", "ISTC", "SIR", "Orange CI", "MTN CI", "Moov Africa", "SEFTIM", "IHA", "Gs2E"],
  },
  SN: { name: "Sénégal", flag: "🇸🇳", region: "Afrique de l'Ouest", coords: [-17.4441, 14.6928], partners: [] },
  ML: { name: "Mali", flag: "🇲🇱", region: "Afrique de l'Ouest", coords: [-7.9922, 12.6392], partners: ["AMRTP (Autorité Malienne de Régulation des Télécommunications)"] },
  BF: { name: "Burkina Faso", flag: "🇧🇫", region: "Afrique de l'Ouest", coords: [-1.5197, 12.3714], partners: [] },
  NE: { name: "Niger", flag: "🇳🇪", region: "Afrique de l'Ouest", coords: [2.1098, 13.5137], partners: [] },
  GH: { name: "Ghana", flag: "🇬🇭", region: "Afrique de l'Ouest", coords: [-0.1870, 5.6037], partners: [] },
  TG: { name: "Togo", flag: "🇹🇬", region: "Afrique de l'Ouest", coords: [1.2255, 6.1725], partners: [] },
  BJ: { name: "Bénin", flag: "🇧🇯", region: "Afrique de l'Ouest", coords: [2.4283, 6.3703], partners: [] },
  GN: { name: "Guinée", flag: "🇬🇳", region: "Afrique de l'Ouest", coords: [-13.7122, 9.6412], partners: [] },
  GW: { name: "Guinée-Bissau", flag: "🇬🇼", region: "Afrique de l'Ouest", coords: [-15.5984, 11.8636], partners: [] },
  GM: { name: "Gambie", flag: "🇬🇲", region: "Afrique de l'Ouest", coords: [-16.5790, 13.4549], partners: [] },
  MR: { name: "Mauritanie", flag: "🇲🇷", region: "Afrique de l'Ouest", coords: [-15.9785, 18.0735], partners: [] },

  // ---------------------- Afrique centrale & de l'Est ----------------------
  CM: { name: "Cameroun", flag: "🇨🇲", region: "Afrique centrale et de l'Est", coords: [11.5021, 3.8480], partners: [] },
  TD: { name: "Tchad", flag: "🇹🇩", region: "Afrique centrale et de l'Est", coords: [15.0557, 12.1348], partners: [] },
  SD: { name: "Soudan", flag: "🇸🇩", region: "Afrique centrale et de l'Est", coords: [32.5599, 15.5007], partners: [] },
  CD: { name: "Rép. Démocratique du Congo", flag: "🇨🇩", region: "Afrique centrale et de l'Est", coords: [15.2663, -4.4419], partners: [] },
  RW: { name: "Rwanda", flag: "🇷🇼", region: "Afrique centrale et de l'Est", coords: [30.0619, -1.9441], partners: [] },
  KE: { name: "Kenya", flag: "🇰🇪", region: "Afrique centrale et de l'Est", coords: [36.8219, -1.2921], partners: [] },
  UG: { name: "Ouganda", flag: "🇺🇬", region: "Afrique centrale et de l'Est", coords: [32.5825, 0.3476], partners: [] },
  TZ: { name: "Tanzanie", flag: "🇹🇿", region: "Afrique centrale et de l'Est", coords: [35.7382, -6.1630], partners: [] },

  // ---------------------- Afrique australe ----------------------
  ZA: { name: "Afrique du Sud", flag: "🇿🇦", region: "Afrique australe", coords: [28.2293, -25.7479], partners: [] },
  ZM: { name: "Zambie", flag: "🇿🇲", region: "Afrique australe", coords: [28.3228, -15.3875], partners: [] },
  ZW: { name: "Zimbabwe", flag: "🇿🇼", region: "Afrique australe", coords: [31.0522, -17.8292], partners: [] },
  MZ: { name: "Mozambique", flag: "🇲🇿", region: "Afrique australe", coords: [32.5732, -25.9692], partners: [] },

  // ---------------------- Afrique du Nord ----------------------
  MA: { name: "Maroc", flag: "🇲🇦", region: "Afrique du Nord", coords: [-6.8498, 34.0209], partners: [] },

  // ---------------------- Europe ----------------------
  FR: {
    name: "France", flag: "🇫🇷", region: "Europe", coords: [2.3522, 48.8566],
    partners: ["Eurovision", "France 24", "Videlio", "TDF", "Lagardère", "Eutelsat", "Rohde & Schwarz"],
  },
  BE: { name: "Belgique", flag: "🇧🇪", region: "Europe", coords: [4.3517, 50.8503], partners: [] },
  DE: { name: "Allemagne", flag: "🇩🇪", region: "Europe", coords: [13.4050, 52.5200], partners: [] },
};

const DEFAULT_PARTNER_TEXT = "Partenariats en cours de référencement";

/* ---------- Interpolation grand cercle (pour les arcs sur le globe) ---------- */
function toRad(d) { return (d * Math.PI) / 180; }
function toDeg(r) { return (r * 180) / Math.PI; }

function greatCircleLine(start, end, segments = 80) {
  const [lon1, lat1] = [toRad(start[0]), toRad(start[1])];
  const [lon2, lat2] = [toRad(end[0]), toRad(end[1])];
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
      )
    );
  if (d === 0) return [start, end];

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const f = i / segments;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lon = Math.atan2(y, x);
    points.push([toDeg(lon), toDeg(lat)]);
  }
  return points;
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof am5 === "undefined" || typeof am5map === "undefined") {
    console.error("amCharts 5 n'a pas pu être chargé.");
    return;
  }

  am5.ready(function () {
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo?.dispose();

    const HOME_ROTATION = { rotationX: -5, rotationY: -12, rotationZ: 0 };

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: HOME_ROTATION.rotationX,
        rotationY: HOME_ROTATION.rotationY,
        homeRotationX: HOME_ROTATION.rotationX,
        homeRotationY: HOME_ROTATION.rotationY,
        paddingTop: 10,
        paddingBottom: 10,
        wheelY: "zoom",
        minZoomLevel: 1,
        maxZoomLevel: 6,
      })
    );

    // ---------- Fond du globe (façon papier / vintage, palette OKTO) ----------
    const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0xefe6d4),
      fillOpacity: 1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    // ---------- Grille de longitudes / latitudes ----------
    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0xb7a988),
      strokeOpacity: 0.35,
      strokeWidth: 0.4,
    });

    // ---------- Couche des pays ----------
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "",
      interactive: true,
      fill: am5.color(0xd9cdb0),
      stroke: am5.color(0xefe6d4),
      strokeWidth: 0.5,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 1,
    });

    polygonSeries.mapPolygons.template.adapters.add("fill", function (fill, target) {
      const dataContext = target.dataItem && target.dataItem.dataContext;
      const info = dataContext && PARTNERS_DATA[dataContext.id];
      if (info) return info.isHQ ? am5.color(0x8b0000) : am5.color(0xc0476b);
      return fill;
    });

    polygonSeries.mapPolygons.template.adapters.add("fillOpacity", function (opacity, target) {
      const dataContext = target.dataItem && target.dataItem.dataContext;
      return PARTNERS_DATA[dataContext && dataContext.id] ? 1 : 0.9;
    });

    // ---------- Arcs de connexion (siège -> pays partenaires) ----------
    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0xc0476b),
      strokeOpacity: 0.55,
      strokeWidth: 1.2,
    });

    Object.entries(PARTNERS_DATA).forEach(([code, info]) => {
      if (info.isHQ || !info.coords) return;
      lineSeries.data.push({
        geometry: { type: "LineString", coordinates: greatCircleLine(OKTO_HQ.coords, info.coords) },
      });
    });

    // ---------- Points des pays partenaires ----------
    const dotSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    dotSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 3.5,
          fill: am5.color(0x8b0000),
          stroke: am5.color(0xffffff),
          strokeWidth: 1,
          cursorOverStyle: "pointer",
        }),
      });
    });
    dotSeries.data.setAll(
      Object.entries(PARTNERS_DATA)
        .filter(([code, info]) => !info.isHQ && info.coords)
        .map(([code, info]) => ({ geometry: { type: "Point", coordinates: info.coords }, id: code }))
    );

    // ---------- Tooltip personnalisé (carte façon OKTO) ----------
    const tooltipEl = document.getElementById("country-tooltip");

    function buildTooltipHTML(info) {
      const list =
        info.partners && info.partners.length
          ? info.partners.map((p) => `<li>${p}</li>`).join("")
          : `<li class="tooltip-empty">${info.isHQ ? "" : DEFAULT_PARTNER_TEXT}</li>`;

      return `
        <div class="tooltip-header">
          <span class="tooltip-flag">${info.flag}</span>
          <span class="tooltip-country">${info.name.toUpperCase()}</span>
        </div>
        ${info.isHQ ? `<div class="tooltip-hq-badge">🏢 Siège social OKTO</div>` : ""}
        <div class="tooltip-label">Partenaires</div>
        <ul class="tooltip-list">${list}</ul>
      `;
    }

    function showTooltip(info, ev) {
      tooltipEl.innerHTML = buildTooltipHTML(info);
      tooltipEl.classList.add("is-visible");
      moveTooltip(ev);
    }

    function moveTooltip(ev) {
      if (!ev || !ev.point) return;
      const chartRect = document.getElementById("chartdiv").getBoundingClientRect();
      let x = ev.point.x + 18;
      let y = ev.point.y + 18;
      const tooltipWidth = tooltipEl.offsetWidth || 240;
      if (x + tooltipWidth > chartRect.width) x = ev.point.x - tooltipWidth - 18;
      tooltipEl.style.left = x + "px";
      tooltipEl.style.top = y + "px";
    }

    function hideTooltip() {
      tooltipEl.classList.remove("is-visible");
    }

    polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
      const dataContext = ev.target.dataItem && ev.target.dataItem.dataContext;
      const info = dataContext && PARTNERS_DATA[dataContext.id];
      if (info) showTooltip(info, ev);
    });
    polygonSeries.mapPolygons.template.events.on("pointerout", hideTooltip);
    polygonSeries.mapPolygons.template.events.on("globalpointermove", function (ev) {
      if (tooltipEl.classList.contains("is-visible")) moveTooltip(ev);
    });

    dotSeries.mapPoints.template.events.on("pointerover", function (ev) {
      const dataContext = ev.target.dataItem && ev.target.dataItem.dataContext;
      const info = dataContext && PARTNERS_DATA[dataContext.id];
      if (info) showTooltip(info, ev);
    });
    dotSeries.mapPoints.template.events.on("pointerout", hideTooltip);
    dotSeries.mapPoints.template.events.on("globalpointermove", function (ev) {
      if (tooltipEl.classList.contains("is-visible")) moveTooltip(ev);
    });

    // ---------- Marqueur du siège OKTO (Abidjan, avec pulsation) ----------
    const hqSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    hqSeries.bullets.push(function () {
      const container = am5.Container.new(root, { cursorOverStyle: "pointer" });

      const pulse = container.children.push(
        am5.Circle.new(root, { radius: 9, fill: am5.color(0xff4040), fillOpacity: 0.35 })
      );
      pulse.animate({ key: "radius", to: 20, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) });
      pulse.animate({ key: "fillOpacity", to: 0, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) });

      container.children.push(
        am5.Circle.new(root, { radius: 7, fill: am5.color(0x8b0000), stroke: am5.color(0xffffff), strokeWidth: 2 })
      );

      container.events.on("pointerover", (ev) => showTooltip(PARTNERS_DATA.CI, ev));
      container.events.on("pointerout", hideTooltip);
      container.events.on("globalpointermove", moveTooltip);

      return am5.Bullet.new(root, { sprite: container });
    });
    hqSeries.data.setAll([{ geometry: { type: "Point", coordinates: OKTO_HQ.coords } }]);

    chart.appear(1000, 100);

    // ---------- Rotation automatique du globe ----------
    let rotationAnimation;
    function startRotation() {
      rotationAnimation = chart.animate({
        key: "rotationX",
        from: chart.get("rotationX"),
        to: chart.get("rotationX") + 360,
        duration: 45000,
        loops: Infinity,
      });
    }
    function stopRotation() {
      if (rotationAnimation) rotationAnimation.stop();
    }
    startRotation();
    chart.events.on("panstarted", stopRotation);
    chart.events.on("panended", () => setTimeout(startRotation, 4000));

    // ---------- Bascule Globe / Carte ----------
    const viewToggle = document.getElementById("view-toggle");
    const labelGlobe = document.getElementById("label-globe");
    const labelMap = document.getElementById("label-map");

    if (viewToggle) {
      viewToggle.addEventListener("change", function () {
        if (this.checked) {
          // Vue carte plate
          stopRotation();
          chart.set("panY", "translateY");
          chart.set("projection", am5map.geoEqualEarth());
          chart.set("homeGeoPoint", { longitude: 8, latitude: 10 });
          chart.set("homeZoomLevel", 1);
          chart.goHome();
          labelGlobe.classList.remove("is-active");
          labelMap.classList.add("is-active");
        } else {
          // Vue globe
          chart.set("panY", "rotateY");
          chart.set("projection", am5map.geoOrthographic());
          chart.set("homeRotationX", HOME_ROTATION.rotationX);
          chart.set("homeRotationY", HOME_ROTATION.rotationY);
          chart.goHome();
          startRotation();
          labelMap.classList.remove("is-active");
          labelGlobe.classList.add("is-active");
        }
      });
    }

    // ---------- Boutons Home / Zoom personnalisés ----------
    document.getElementById("btn-home")?.addEventListener("click", () => chart.goHome());
    document.getElementById("btn-zoom-in")?.addEventListener("click", () => chart.zoomIn());
    document.getElementById("btn-zoom-out")?.addEventListener("click", () => chart.zoomOut());

    // ---------- Statistiques (hero + légende sous le globe) ----------
    const countryCount = Object.keys(PARTNERS_DATA).length;
    const regionCount = new Set(Object.values(PARTNERS_DATA).map((c) => c.region)).size;
    ["stat-countries", "stat-countries-inline"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = countryCount;
    });
    ["stat-regions", "stat-regions-inline"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = regionCount;
    });

    // ---------- Légende / liste accessible par région ----------
    const legendContainer = document.getElementById("region-legend");
    if (legendContainer) {
      const byRegion = {};
      Object.values(PARTNERS_DATA).forEach((c) => {
        byRegion[c.region] = byRegion[c.region] || [];
        byRegion[c.region].push(c);
      });

      legendContainer.innerHTML = Object.entries(byRegion)
        .map(
          ([region, countries]) => `
            <div class="region-card">
              <h4>${region}</h4>
              <ul>
                ${countries
                  .map((c) => `<li>${c.flag} ${c.name}${c.isHQ ? ' <span class="hq-tag">Siège</span>' : ""}</li>`)
                  .join("")}
              </ul>
            </div>`
        )
        .join("");
    }
  });
});