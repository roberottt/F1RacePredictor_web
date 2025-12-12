export const translations = {
  en: {
    // Header
    appTitle1: "THE PADDOCK",
    appTitle2: "PROPHET",
    appSubtitle: "AI-Powered Race Outcome Predictions",
    
    // Footer
    footerText: "Powered by Machine Learning • Data from F1 API",
    
    // Race Selector
    selectSeason: "Select Season",
    selectRace: "Select Race",
    round: "Round",
    
    // Prediction Display
    analyzingRaceData: "Analyzing race data...",
    errorLoadingPredictions: "Error loading predictions. Please try again.",
    retry: "Retry",
    racePrediction: "Race Prediction",
    grid: "Grid",
    probability: "Probability",
    
    // Language selector
    language: "Language"
  },
  es: {
    // Header
    appTitle1: "THE PADDOCK",
    appTitle2: "PROPHET",
    appSubtitle: "Predicciones de Carreras con Inteligencia Artificial",
    
    // Footer
    footerText: "Impulsado por Aprendizaje Automático • Datos de API F1",
    
    // Race Selector
    selectSeason: "Selecciona Temporada",
    selectRace: "Selecciona Carrera",
    round: "Ronda",
    
    // Prediction Display
    analyzingRaceData: "Analizando datos de carrera...",
    errorLoadingPredictions: "Error al cargar predicciones. Por favor, inténtalo de nuevo.",
    retry: "Reintentar",
    racePrediction: "Predicción de Carrera",
    grid: "Parrilla",
    probability: "Probabilidad",
    
    // Language selector
    language: "Idioma"
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
