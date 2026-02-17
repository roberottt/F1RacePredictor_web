export const translations = {
  en: {
    // Header
    appTitle1: "THE PADDOCK",
    appTitle2: "PROPHET",
    appSubtitle: "AI-Powered Race Outcome Predictions",
    
    // Navigation
    navHome: "Home",
    navPredictions: "Predictions",
    navStandings: "Standings",
    
    // Footer
    footerText: "Powered by Machine Learning • Data from F1 API",
    
    // Home Page
    welcomeTitle: "Welcome to The Paddock Prophet",
    welcomeSubtitle: "Harness the power of artificial intelligence to predict Formula 1 race outcomes with unprecedented accuracy",
    featureAITitle: "AI-Powered Predictions",
    featureAIDescription: "Our advanced machine learning model analyzes historical data, driver performance, and track conditions to generate accurate race predictions.",
    featurePredictionsTitle: "Race Predictions",
    featurePredictionsDescription: "Get detailed predictions for every F1 race, including podium finishes and championship points distribution.",
    featureStandingsTitle: "Live Standings",
    featureStandingsDescription: "Track driver and constructor championship standings with interactive charts showing season evolution.",
    howItWorksTitle: "How It Works",
    step1: "Select a season and race from our comprehensive F1 calendar",
    step2: "Our AI analyzes thousands of data points to generate predictions",
    step3: "View predicted results with probability scores for each driver",
    startPredicting: "Start Predicting",
    
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
    navHome: "Inicio",
    navPredictions: "Predicciones",
    navStandings: "Clasificación",
    
    // Footer
    footerText: "Impulsado por Aprendizaje Automático • Datos de API F1",
    
    // Home Page
    welcomeTitle: "Bienvenido a The Paddock Prophet",
    welcomeSubtitle: "Aprovecha el poder de la inteligencia artificial para predecir resultados de carreras de Fórmula 1 con precisión sin precedentes",
    featureAITitle: "Predicciones con IA",
    featureAIDescription: "Nuestro avanzado modelo de aprendizaje automático analiza datos históricos, rendimiento de pilotos y condiciones de pista para generar predicciones precisas.",
    featurePredictionsTitle: "Predicciones de Carreras",
    featurePredictionsDescription: "Obtén predicciones detalladas para cada carrera de F1, incluyendo podios y distribución de puntos del campeonato.",
    featureStandingsTitle: "Clasificaciones en Vivo",
    featureStandingsDescription: "Sigue las clasificaciones de pilotos y constructores con gráficos interactivos que muestran la evolución de la temporada.",
    howItWorksTitle: "Cómo Funciona",
    step1: "Selecciona una temporada y carrera de nuestro calendario completo de F1",
    step2: "Nuestra IA analiza miles de datos para generar predicciones",
    step3: "Visualiza los resultados predichos con puntuaciones de probabilidad para cada piloto",
    startPredicting: "Comenzar a Predecir",
    
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
