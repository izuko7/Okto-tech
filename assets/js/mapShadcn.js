/* ==========================================================================
   OKTO Technologies — Carte des partenaires pays (amCharts 5)
   ==========================================================================
   Pour ajouter / modifier un pays :
   1. Trouver le code ISO 3166-1 alpha-2 du pays (ex: "SN" pour le Sénégal)
   2. Ajouter/éditer une entrée dans PARTNERS_DATA ci-dessous
   3. flag = emoji drapeau, region = catégorie utilisée dans la légende,
      partners = tableau de noms (laisser vide [] si pas encore connu,
      un texte par défaut s'affichera alors dans l'infobulle).
   ========================================================================== */

const OKTO_HQ = {
  name: "Côte d'Ivoire",
  city: "Abidjan (Siège social)",
  coordinates: [-4.0083, 5.3599], // [longitude, latitude]
};

const PARTNERS_DATA = {
  // ---------------------- Afrique de l'Ouest ----------------------
  CI: {
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    region: "Afrique de l'Ouest",
    isHQ: true,
    partners: ["RTI", "ARTCI", "ANSUT", "CIE", "SODECI", "ISTC", "SIR", "Orange CI", "MTN CI", "Moov Africa", "SEFTIM", "IHA", "Gs2E"],
  },
  SN: { name: "Sénégal", flag: "🇸🇳", region: "Afrique de l'Ouest", partners: [] },
  ML: { name: "Mali", flag: "🇲🇱", region: "Afrique de l'Ouest", partners: ["AMRTP (Autorité Malienne de Régulation des Télécommunications)"] },
  BF: { name: "Burkina Faso", flag: "🇧🇫", region: "Afrique de l'Ouest", partners: [] },
  NE: { name: "Niger", flag: "🇳🇪", region: "Afrique de l'Ouest", partners: [] },
  GH: { name: "Ghana", flag: "🇬🇭", region: "Afrique de l'Ouest", partners: [] },
  TG: { name: "Togo", flag: "🇹🇬", region: "Afrique de l'Ouest", partners: [] },
  BJ: { name: "Bénin", flag: "🇧🇯", region: "Afrique de l'Ouest", partners: [] },
  GN: { name: "Guinée", flag: "🇬🇳", region: "Afrique de l'Ouest", partners: [] },
  GW: { name: "Guinée-Bissau", flag: "🇬🇼", region: "Afrique de l'Ouest", partners: [] },
  GM: { name: "Gambie", flag: "🇬🇲", region: "Afrique de l'Ouest", partners: [] },
  MR: { name: "Mauritanie", flag: "🇲🇷", region: "Afrique de l'Ouest", partners: [] },

  // ---------------------- Afrique centrale & de l'Est ----------------------
  CM: { name: "Cameroun", flag: "🇨🇲", region: "Afrique centrale et de l'Est", partners: [] },
  TD: { name: "Tchad", flag: "🇹🇩", region: "Afrique centrale et de l'Est", partners: [] },
  SD: { name: "Soudan", flag: "🇸🇩", region: "Afrique centrale et de l'Est", partners: [] },
  CD: { name: "Rép. Démocratique du Congo", flag: "🇨🇩", region: "Afrique centrale et de l'Est", partners: [] },
  RW: { name: "Rwanda", flag: "🇷🇼", region: "Afrique centrale et de l'Est", partners: [] },
  KE: { name: "Kenya", flag: "🇰🇪", region: "Afrique centrale et de l'Est", partners: [] },
  UG: { name: "Ouganda", flag: "🇺🇬", region: "Afrique centrale et de l'Est", partners: [] },
  TZ: { name: "Tanzanie", flag: "🇹🇿", region: "Afrique centrale et de l'Est", partners: [] },

  // ---------------------- Afrique australe ----------------------
  ZA: { name: "Afrique du Sud", flag: "🇿🇦", region: "Afrique australe", partners: [] },
  ZM: { name: "Zambie", flag: "🇿🇲", region: "Afrique australe", partners: [] },
  ZW: { name: "Zimbabwe", flag: "🇿🇼", region: "Afrique australe", partners: [] },
  MZ: { name: "Mozambique", flag: "🇲🇿", region: "Afrique australe", partners: [] },

  // ---------------------- Afrique du Nord ----------------------
  MA: { name: "Maroc", flag: "🇲🇦", region: "Afrique du Nord", partners: [] },

  // ---------------------- Europe ----------------------
  FR: {
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    partners: ["Eurovision", "France 24", "Videlio", "TDF", "Lagardère", "Eutelsat", "Rohde & Schwarz"],
  },
  BE: { name: "Belgique", flag: "🇧🇪", region: "Europe", partners: [] },
  DE: { name: "Allemagne", flag: "🇩🇪", region: "Europe", partners: [] },
};

const DEFAULT_PARTNER_TEXT = "Partenariats en cours de référencement";

document.addEventListener("DOMContentLoaded", function () {
  if (typeof am5 === "undefined" || typeof am5map === "undefined") {
    console.error("amCharts 5 n'a pas pu être chargé.");
    return;
  }

  am5.ready(function () {
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo?.dispose();

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        homeZoomLevel: 1.35,
        homeGeoPoint: { longitude: 5, latitude: 12 },
        wheelY: "zoom",
      })
    );

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

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
      fill: am5.color(0xe3e6ec),
      stroke: am5.color(0xffffff),
      strokeWidth: 0.6,
      templateField: "polygonSettings",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 1.2,
    });

    // Colore les pays partenaires (HQ en rouge foncé, les autres en rose OKTO)
    polygonSeries.mapPolygons.template.adapters.add("fill", function (fill, target) {
      const dataContext = target.dataItem && target.dataItem.dataContext;
      const id = dataContext && dataContext.id;
      const info = id && PARTNERS_DATA[id];
      if (info) {
        return info.isHQ ? am5.color(0x8b0000) : am5.color(0xc0476b);
      }
      return fill;
    });

    polygonSeries.mapPolygons.template.adapters.add("fillOpacity", function (opacity, target) {
      const dataContext = target.dataItem && target.dataItem.dataContext;
      const id = dataContext && dataContext.id;
      return PARTNERS_DATA[id] ? 1 : 0.55;
    });

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
      if (x + tooltipWidth > chartRect.width) {
        x = ev.point.x - tooltipWidth - 18;
      }
      tooltipEl.style.left = x + "px";
      tooltipEl.style.top = y + "px";
    }

    function hideTooltip() {
      tooltipEl.classList.remove("is-visible");
    }

    polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
      const dataContext = ev.target.dataItem && ev.target.dataItem.dataContext;
      const id = dataContext && dataContext.id;
      const info = id && PARTNERS_DATA[id];
      if (info) showTooltip(info, ev);
    });

    polygonSeries.mapPolygons.template.events.on("pointerout", hideTooltip);
    polygonSeries.mapPolygons.template.events.on("globalpointermove", function (ev) {
      if (tooltipEl.classList.contains("is-visible")) moveTooltip(ev);
    });

    // ---------- Marqueur du siège OKTO (Abidjan) ----------
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(function () {
      const container = am5.Container.new(root, { cursorOverStyle: "pointer" });

      const pulse = container.children.push(
        am5.Circle.new(root, {
          radius: 9,
          fill: am5.color(0xff4040),
          fillOpacity: 0.35,
        })
      );
      pulse.animate({ key: "radius", to: 20, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) });
      pulse.animate({ key: "fillOpacity", to: 0, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) });

      container.children.push(
        am5.Circle.new(root, {
          radius: 7,
          fill: am5.color(0x8b0000),
          stroke: am5.color(0xffffff),
          strokeWidth: 2,
        })
      );

      container.events.on("pointerover", (ev) =>
        showTooltip(
          { name: OKTO_HQ.name, flag: "🇨🇮", isHQ: true, partners: PARTNERS_DATA.CI.partners },
          { point: ev.target._display ? chart.plotContainer.toLocal(ev.point) : ev.point }
        )
      );
      container.events.on("pointerout", hideTooltip);
      container.events.on("globalpointermove", moveTooltip);

      return am5.Bullet.new(root, { sprite: container });
    });

    pointSeries.data.setAll([
      { geometry: { type: "Point", coordinates: OKTO_HQ.coordinates } },
    ]);

    chart.appear(1000, 100);

    // ---------- Statistiques d'en-tête ----------
    const countryCount = Object.keys(PARTNERS_DATA).length;
    const regionCount = new Set(Object.values(PARTNERS_DATA).map((c) => c.region)).size;
    const statCountries = document.getElementById("stat-countries");
    const statRegions = document.getElementById("stat-regions");
    if (statCountries) statCountries.textContent = countryCount;
    if (statRegions) statRegions.textContent = regionCount;

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
                  .map(
                    (c) =>
                      `<li>${c.flag} ${c.name}${c.isHQ ? ' <span class="hq-tag">Siège</span>' : ""}</li>`
                  )
                  .join("")}
              </ul>
            </div>`
        )
        .join("");
    }
  });
});