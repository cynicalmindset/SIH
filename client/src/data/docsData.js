/**
 * Centralized Technical Documentation Knowledge Store for Planet
 * ─────────────────────────────────────────────────────────────────
 * Contains structured, authoritative technical product documentation for all
 * Planet platform capabilities:
 *   • Oil Spill Detection
 *   • Satellite Intelligence
 *   • AIS Intelligence
 *   • Vessel Correlation
 *   • Ocean & Weather
 *   • Incident Attribution
 *   • SaaS Platform Architecture
 */

export const PLANET_DOCUMENTS = [
  {
    slug: 'oil-spill-detection',
    title: 'Oil Spill Detection',
    category: 'SATELLITE CAPABILITY',
    description: 'Automated satellite synthetic aperture radar (SAR) backscatter analysis and optical slick detection for ocean oil spills.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `Planet's Oil Spill Detection module provides continuous, automated monitoring of maritime regions to detect, characterize, and track oil slicks on the ocean surface. By fusing spaceborne Synthetic Aperture Radar (SAR) imagery with high-resolution optical satellite passes, the system identifies surface film anomalies with high spatial precision regardless of cloud cover or daylight conditions.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Oil films damp sea-surface capillary and short gravity waves (Bragg waves), causing a distinct reduction in radar backscatter relative to surrounding clean water. Planet's deep neural networks process normalized radar cross-section (NRCS) imagery to detect these low-backscatter 'dark spots', separating true mineral oil slicks from natural lookalikes such as biogenic films, calm wind sea zones, and rain cells.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Automated SAR Dark Spot Extraction: Instant segmentation of surface backscatter anomalies.
• Lookalike Discrimination: Multi-parameter filtering incorporating local wind speed, wave height, and spatial texture.
• Slick Thickness & Area Estimation: Estimation of total slick surface footprint (km²) and volumetric range.
• Historical Temporal Baseline: Comparison against historical radar reflectivity records to eliminate static bathymetric artifacts.`,
      },
      {
        id: 'data-sources',
        title: 'Data Sources & Sensors',
        content: `• Sentinel-1A / 1B C-band Synthetic Aperture Radar (SAR)
• TerraSAR-X / TanDEM-X High-Resolution X-band Radar
• Sentinel-2 MSI Optical Spectral Bands (B2, B3, B4, B8)
• Copernicus Marine Environment Monitoring Service (CMEMS) Sea State Telemetry`,
      },
      {
        id: 'analysis-workflow',
        title: 'Analysis Workflow',
        content: `1. Ingestion: Automated orbital satellite pass metadata ingestion.
2. Calibration: Radiometric calibration and terrain correction (EEZ / Coastal Buffer).
3. Feature Extraction: Convolutional segmentation of candidate slick polygons.
4. Confidence Scoring: Automated Bayesian evidentiary classification (Low, Medium, High).
5. Incident Alert Dispatch: Automated alert notification sent to active duty rosters.`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• GeoJSON / KML Vector Slick Polygons
• GeoTIFF Geo-Referenced Radar Backscatter Layers
• PDF Incident Evidence Summary Reports
• REST API GeoJSON Endpoints for GIS Integration`,
      },
    ],
    relatedSlugs: ['satellite-intelligence', 'vessel-correlation', 'incident-attribution'],
  },
  {
    slug: 'satellite-intelligence',
    title: 'Satellite Intelligence',
    category: 'EARTH OBSERVATION',
    description: 'Multi-orbit satellite remote sensing fusion combining C-band, X-band SAR, and multispectral optical imaging.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `Satellite Intelligence forms the earth observation foundation of Planet. By orchestrating satellite constellations across radar and optical spectrums, Planet delivers persistent surveillance over high-risk marine corridors, economic exclusion zones (EEZs), and sensitive coastal habitats.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Commercial and public satellite tasking requests are automatically prioritized based on active vessel traffic density and transponder dropout flags. Raw orbital telemetry is ingested, radiometrically calibrated, and cross-registered with maritime spatial layers within minutes of downlink.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Day/Night All-Weather Radar Sensing: C-band and X-band radar penetrating cloud cover and maritime storms.
• Multispectral Water Quality Inspection: Sentinel-2 and Landsat-9 optical spectral band processing.
• Automated Ship Hull Target Extraction: Detection of non-reporting vessel hulls against radar sea clutter.
• Orbital Revisit Optimization: Automated satellite pass schedule optimization over target areas.`,
      },
      {
        id: 'data-sources',
        title: 'Data Sources & Sensors',
        content: `• European Space Agency (ESA) Sentinel Constellations
• Commercial High-Resolution SAR Satellites
• Planet Labs Optical Constellation Data Feeds
• NOAA Surface Winds & Bathymetry Layer Registries`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• High-Resolution GeoTIFF Imagery Layers
• Target Hull Radar Cross Section (RCS) Profiles
• Cloud-Optimized GeoTIFF (COG) Feeds`,
      },
    ],
    relatedSlugs: ['oil-spill-detection', 'ais-intelligence', 'ocean-and-weather'],
  },
  {
    slug: 'ais-intelligence',
    title: 'AIS Intelligence',
    category: 'VESSEL TELEMETRY',
    description: 'Global terrestrial and satellite AIS transponder decoding, trajectory fitting, and transponder gap analysis.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `AIS Intelligence provides continuous tracking of commercial maritime traffic using terrestrial and satellite Automatic Identification System (AIS) transponder signals. It detects dark fleet maneuvers, transponder tampering, and deliberate communication dropouts around environmental incidents.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `The system decodes Class A and Class B AIS messages in real-time, validating static vessel metadata (IMO, MMSI, Vessel Name, Ship Type) against dynamic position reports (Latitude, Longitude, Course Over Ground, Speed Over Ground). Gaps in transponder broadcasting are flagged automatically for kinematic reconstruction.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Transponder Gap Detection: Flagging unannounced broadcast dropouts exceeding threshold durations.
• Spoofing & Identity Verification: Cross-referencing broadcast positions against satellite radar hull detections.
• Trajectory Smoothing & Interpolation: Cubic spline kinematic trajectory reconstruction during broadcast outages.
• IMO Registry Match: Real-time verification of ship dimensions, draft depth, and flag state registry.`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• Live AIS Telemetry Stream (JSON / WebSockets)
• Vessel Track CSV & GeoJSON Export
• Anomaly Log & Dark Fleet Suspect Roster`,
      },
    ],
    relatedSlugs: ['vessel-correlation', 'incident-attribution', 'satellite-intelligence'],
  },
  {
    slug: 'vessel-correlation',
    title: 'Vessel Correlation',
    category: 'KINEMATIC ANALYTICS',
    description: 'Spatiotemporal matching of candidate vessel tracks against detected oil slick origin coordinates.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `Vessel Correlation bridges environmental slick detections with maritime traffic records. It calculates the exact spatial and temporal proximity between passing candidate ships and the reverse-simulated origin of an oil slick.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Given a confirmed slick polygon detected via SAR imagery, Planet's kinematic model executes a backward drift trajectory simulation to estimate the slick origin point at preceding timestamps. All vessel tracks passing within a spatial buffer (e.g. 5 nautical miles) during the estimated discharge window are ranked for correlation.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Backward Drift Origin Simulation: Estimating exact coordinates of initial discharge.
• Nautical Proximity Buffer Matrix: Calculating closest point of approach (CPA) for candidate hulls.
• Kinematic Heading Deviation Analysis: Flagging unexpected course maneuvers surrounding slick timestamps.
• Multi-Vessel Candidate Ranking: Scoring candidate ships based on spatial offset, vessel type, and speed profile.`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• Candidate Correlation Matrix
• Interactive Track & Slick Overlay Map Layer
• Evidentiary Kinematic Timeline Plot`,
      },
    ],
    relatedSlugs: ['incident-attribution', 'oil-spill-detection', 'ocean-and-weather'],
  },
  {
    slug: 'ocean-and-weather',
    title: 'Ocean & Weather',
    category: 'ENVIRONMENTAL INTELLIGENCE',
    description: 'Hydrodynamic ocean current and meteorological wind vector integration for drift simulations.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `Ocean & Weather provides the environmental forcing context essential for accurate oil spill drift modeling. By integrating high-resolution surface ocean currents, sea-surface temperature, and wind fields, Planet accurately simulates how slicks move, spread, and weather over time.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Oil slick movement is driven by a combination of ocean surface currents (typically 100% vector contribution) and surface wind drift (typically 3% wind leeway factor). Planet ingests real-time and forecast hydrodynamic models to drive particle trajectory simulation algorithms.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• HYCOM & Copernicus Surface Current Integration: 1/12th degree global ocean current velocity vectors.
• ECMWF & GFS Wind Field Processing: 10-meter U and V wind velocity vector extraction.
• Weathering & Spreading Kinetics: Emulsification, evaporation, and spreading velocity estimation.
• Coastal Impact Probability Forecasting: Estimating time-to-shoreline landfall for active slicks.`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• NetCDF Environmental Data Layers
• Hydrodynamic Drift Vector Map Layers
• Landfall Risk & Ecological Impact Timeline`,
      },
    ],
    relatedSlugs: ['oil-spill-detection', 'vessel-correlation', 'incident-attribution'],
  },
  {
    slug: 'incident-attribution',
    title: 'Incident Attribution',
    category: 'FORENSIC AUDIT',
    description: 'Multi-criteria evidentiary scoring matrix for legal enforcement and regulatory compliance submission.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `Incident Attribution synthesizes all available satellite imagery, AIS transponder records, hydrodynamic drift vectors, and vessel metadata into a single, legally defensible forensic evidence score.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Planet evaluates candidate vessels using a Multi-Criteria Decision Analysis (MCDA) framework. Individual evidence weights—such as SAR backscatter alignment, AIS proximity, speed anomaly, and dark fleet risk rating—are combined into a composite confidence percentage (0-100%).`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Composite Evidence Scoring: Quantitative confidence rating backed by verifiable mathematical model.
• Legal Audit Trail Export: Formatted documentation ready for maritime tribunal and enforcement submission.
• Chain of Custody Metadata: Cryptographically stamped timestamps and satellite sensor provenance.
• Comparative Candidate Breakdown: Clear attribution ranking explaining why suspect hull A ranked above candidate hull B.`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• Official Forensic Evidence Audit Report (PDF)
• Encrypted GIS Package (.gpkg)
• Regulatory Submission Data Summary`,
      },
    ],
    relatedSlugs: ['oil-spill-detection', 'vessel-correlation', 'ais-intelligence'],
  },
  {
    slug: 'saas',
    title: 'Planet SaaS Platform',
    category: 'ENTERPRISE ARCHITECTURE',
    description: 'Cloud-native, multi-tenant maritime intelligence platform architecture, APIs, and security controls.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `The Planet SaaS Platform is an enterprise-grade cloud operational platform engineered for maritime authorities, Coast Guard agencies, environmental monitoring bodies, and shipping operators.`,
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content: `Built on scalable microservice architecture, Planet processes petabytes of satellite imagery and billions of AIS position pings daily. Multi-tenant isolation ensures strict organization data boundaries while enabling seamless team access control.`,
      },
      {
        id: 'core-capabilities',
        title: 'Core Capabilities',
        content: `• Role-Based Access Control (RBAC): Admin, Analyst, and Viewer operational role boundaries.
• REST & WebSocket API Suite: Programmatic access to incidents, tracks, and intelligence alerts.
• Automated Webhook Alerts: Immediate event dispatch to external emergency management systems.
• SOC-2 & ISO-27001 Security Standards: End-to-end encryption at rest (AES-256) and in transit (TLS 1.3).`,
      },
      {
        id: 'outputs',
        title: 'Outputs & Export Formats',
        content: `• Web Console Access
• Developer REST API Keys
• Enterprise SSO & SAML 2.0 Integration`,
      },
    ],
    relatedSlugs: ['oil-spill-detection', 'satellite-intelligence', 'incident-attribution'],
  },
];

/**
 * Utility to search documentation by query string
 */
export function searchPlanetDocs(query) {
  if (!query || typeof query !== 'string') return PLANET_DOCUMENTS;
  const q = query.toLowerCase().trim();
  if (!q) return PLANET_DOCUMENTS;

  return PLANET_DOCUMENTS.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.slug.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.sections.some(
        (sec) =>
          sec.title.toLowerCase().includes(q) ||
          sec.content.toLowerCase().includes(q)
      )
    );
  });
}

/**
 * Get document by slug
 */
export function getDocBySlug(slug) {
  return PLANET_DOCUMENTS.find((d) => d.slug === slug) || PLANET_DOCUMENTS[0];
}
