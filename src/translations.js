export const translations = {
  en: {
    // Header
    appTitle1: "THE PADDOCK",
    appTitle2: "PROPHET",
    appSubtitle: "AI-Powered Race Outcome Predictions",
    
    // Navigation
    navHome: "Predictions",
    navStandings: "Standings",
    
    // Footer
    footerText: "Powered by Machine Learning • Data from F1 API",
    
    // Race Selector
    selectSeason: "Select Season",
    season2026Coming: "2026 Coming Soon",
    selectRace: "Select Race",
    round: "Round",
    
    // Prediction Display
    analyzingRaceData: "Analyzing race data...",
    errorLoadingPredictions: "Error loading predictions. Please try again.",
    retry: "Retry",
    racePrediction: "Race Prediction",
    grid: "Grid",
    probability: "Probability",
    
    // Standings
    standingsTitle: "Championship Standings",
    driversStandings: "Drivers Championship",
    constructorsStandings: "Constructors Championship",
    evolutionChart: "Evolution Chart",
    loadingStandings: "Loading standings...",
    errorLoadingStandings: "Error loading standings. Please try again.",
    position: "Pos",
    driver: "Driver",
    constructor: "Constructor",
    nationality: "Nationality",
    points: "Points",
    wins: "Wins",
    
    // Chart
    driverEvolutionChart: "Driver Championship Evolution",
    constructorEvolutionChart: "Constructor Championship Evolution",
    driversChart: "Drivers",
    constructorsChart: "Constructors",
    showTop: "Show Top",
    selectAll: "Select All",
    deselectAll: "Deselect All",
    race: "Race",
    raceNumber: "Race Number",
    pts: "pts",
    noChartData: "No data available for chart",
    chartDescriptionDrivers: "This chart shows the evolution of accumulated points throughout the season for each driver.",
    chartDescriptionConstructors: "This chart shows the evolution of accumulated points throughout the season for each constructor.",
    
    // Language selector
    language: "Language"
  },
  es: {
    // Header
    appTitle1: "THE PADDOCK",
    appTitle2: "PROPHET",
    appSubtitle: "Predicciones de Carreras con Inteligencia Artificial",
    
    // Navigation
    navHome: "Predicciones",
    navStandings: "Clasificación",
    
    // Footer
    footerText: "Impulsado por Aprendizaje Automático • Datos de API F1",
    
    // Race Selector
    selectSeason: "Selecciona Temporada",
    season2026Coming: "2026 Próximamente",
    selectRace: "Selecciona Carrera",
    round: "Ronda",
    
    // Prediction Display
    analyzingRaceData: "Analizando datos de carrera...",
    errorLoadingPredictions: "Error al cargar predicciones. Por favor, inténtalo de nuevo.",
    retry: "Reintentar",
    racePrediction: "Predicción de Carrera",
    grid: "Parrilla",
    probability: "Probabilidad",
    
    // Standings
    standingsTitle: "Clasificación del Campeonato",
    driversStandings: "Campeonato de Pilotos",
    constructorsStandings: "Campeonato de Constructores",
    evolutionChart: "Gráfico de Evolución",
    loadingStandings: "Cargando clasificación...",
    errorLoadingStandings: "Error al cargar clasificación. Por favor, inténtalo de nuevo.",
    position: "Pos",
    driver: "Piloto",
    constructor: "Constructor",
    nationality: "Nacionalidad",
    points: "Puntos",
    wins: "Victorias",
    
    // Chart
    driverEvolutionChart: "Evolución del Campeonato de Pilotos",
    constructorEvolutionChart: "Evolución del Campeonato de Constructores",
    driversChart: "Pilotos",
    constructorsChart: "Constructores",
    showTop: "Mostrar Top",
    selectAll: "Seleccionar Todo",
    deselectAll: "Deseleccionar Todo",
    race: "Carrera",
    raceNumber: "Número de Carrera",
    pts: "pts",
    noChartData: "No hay datos disponibles para el gráfico",
    chartDescriptionDrivers: "Este gráfico muestra la evolución de los puntos acumulados a lo largo de la temporada para cada piloto.",
    chartDescriptionConstructors: "Este gráfico muestra la evolución de los puntos acumulados a lo largo de la temporada para cada constructor.",
    
    // Language selector
    language: "Idioma"
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
