import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './DriverDetail.css';

const DriverDetail = () => {
  const { driverCode } = useParams();
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageAttempt, setImageAttempt] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState('2025');
  const { language } = useContext(LanguageContext);

  // Mapeo de información de pilotos con múltiples fuentes de imágenes
  const driversInfo = {
    'VER': { 
      name: 'Max Verstappen', 
      nationality: 'Dutch', 
      birthDate: '1997-09-30',
      number: 3,
      teams: {
        '2025': ['Toro Rosso (2015)', 'Red Bull Racing (2016-present)'],
        '2026': ['Toro Rosso (2015)', 'Red Bull Racing (2016-present)']
      },
      championships: 4,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/verstappen.jpg',
        'https://placehold.co/400x500/0600EF/white?text=MAX+VERSTAPPEN+1'
      ]
    },
    'NOR': { 
      name: 'Lando Norris', 
      nationality: 'British', 
      birthDate: '1999-11-13',
      number: 1,
      teams: {
        '2025': ['McLaren (2019-present)'],
        '2026': ['McLaren (2019-present)']
      },
      championships: 1,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/norris.jpg',
        'https://placehold.co/400x500/FF8700/white?text=LANDO+NORRIS+4'
      ]
    },
    'PIA': { 
      name: 'Oscar Piastri', 
      nationality: 'Australian', 
      birthDate: '2001-04-06',
      number: 81,
      teams: {
        '2025': ['McLaren (2023-present)'],
        '2026': ['McLaren (2023-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/piastri.jpg',
        'https://placehold.co/400x500/FF8700/white?text=OSCAR+PIASTRI+81'
      ]
    },
    'RUS': { 
      name: 'George Russell', 
      nationality: 'British', 
      birthDate: '1998-02-15',
      number: 63,
      teams: {
        '2025': ['Williams (2019-2021)', 'Mercedes (2022-present)'],
        '2026': ['Williams (2019-2021)', 'Mercedes (2022-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/russell.jpg',
        'https://placehold.co/400x500/00D2BE/000000?text=GEORGE+RUSSELL+63'
      ]
    },
    'LEC': { 
      name: 'Charles Leclerc', 
      nationality: 'Monegasque', 
      birthDate: '1997-10-16',
      number: 16,
      teams: {
        '2025': ['Sauber (2018)', 'Ferrari (2019-present)'],
        '2026': ['Sauber (2018)', 'Ferrari (2019-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/leclerc.jpg',
        'https://placehold.co/400x500/DC0000/white?text=CHARLES+LECLERC+16'
      ]
    },
    'HAM': { 
      name: 'Lewis Hamilton', 
      nationality: 'British', 
      birthDate: '1985-01-07',
      number: 44,
      teams: {
        '2025': ['McLaren (2007-2012)', 'Mercedes (2013-2024)', 'Ferrari (2025-present)'],
        '2026': ['McLaren (2007-2012)', 'Mercedes (2013-2024)', 'Ferrari (2025-present)']
      },
      championships: 7,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/hamilton.jpg',
        'https://placehold.co/400x500/DC0000/white?text=LEWIS+HAMILTON+44'
      ]
    },
    'SAI': { 
      name: 'Carlos Sainz', 
      nationality: 'Spanish', 
      birthDate: '1994-09-01',
      number: 55,
      teams: {
        '2025': ['Toro Rosso (2015)', 'Renault (2017-2018)', 'McLaren (2019-2020)', 'Ferrari (2021-2024)', 'Williams (2025-present)'],
        '2026': ['Toro Rosso (2015)', 'Renault (2017-2018)', 'McLaren (2019-2020)', 'Ferrari (2021-2024)', 'Williams (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/sainz.jpg',
        'https://placehold.co/400x500/005AFF/white?text=CARLOS+SAINZ+55'
      ]
    },
    'ALO': { 
      name: 'Fernando Alonso', 
      nationality: 'Spanish', 
      birthDate: '1981-07-29',
      number: 14,
      teams: {
        '2025': ['Minardi (2001)', 'Renault (2003-2006, 2008-2009)', 'McLaren (2007, 2015-2018)', 'Ferrari (2010-2014)', 'Alpine (2021-2022)', 'Aston Martin (2023-present)'],
        '2026': ['Minardi (2001)', 'Renault (2003-2006, 2008-2009)', 'McLaren (2007, 2015-2018)', 'Ferrari (2010-2014)', 'Alpine (2021-2022)', 'Aston Martin (2023-present)']
      },
      championships: 2,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/alonso.jpg',
        'https://placehold.co/400x500/006F62/white?text=FERNANDO+ALONSO+14'
      ]
    },
    'ANT': {
      name: 'Andrea Kimi Antonelli',
      nationality: 'Italian',
      birthDate: '2006-08-25',
      number: 12,
      teams: {
        '2025': ['Mercedes (2025-present)'],
        '2026': ['Mercedes (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/A/ANDANT01_Andrea_Antonelli/andant01.png',
        'https://placehold.co/400x500/00D2BE/000000?text=KIMI+ANTONELLI+12'
      ]
    },
    'ALB': {
      name: 'Alexander Albon',
      nationality: 'Thai',
      birthDate: '1996-03-23',
      number: 23,
      teams: {
        '2025': ['Toro Rosso (2019)', 'Red Bull (2019-2020)', 'Williams (2022-present)'],
        '2026': ['Toro Rosso (2019)', 'Red Bull (2019-2020)', 'Williams (2022-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/albon.jpg',
        'https://placehold.co/400x500/005AFF/white?text=ALEX+ALBON+23'
      ]
    },
    'HUL': {
      name: 'Nico Hulkenberg',
      nationality: 'German',
      birthDate: '1987-08-19',
      number: 27,
      teams: {
        '2025': ['Williams (2010)', 'Force India (2011-2012)', 'Sauber (2013)', 'Force India (2014-2016)', 'Renault (2017-2019)', 'Haas (2023-2024)', 'Kick Sauber (2025)'],
        '2026': ['Williams (2010)', 'Force India (2011-2012)', 'Sauber (2013)', 'Force India (2014-2016)', 'Renault (2017-2019)', 'Haas (2023-2024)', 'Kick Sauber (2025)', 'Audi (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/hulkenberg.jpg',
        'https://placehold.co/400x500/00E701/000000?text=NICO+HULKENBERG+27'
      ]
    },
    'HAD': {
      name: 'Isack Hadjar',
      nationality: 'French',
      birthDate: '2004-09-28',
      number: 6,
      teams: {
        '2025': ['Racing Bulls (2025)'],
        '2026': ['Racing Bulls (2025)', 'Red Bull Racing (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png',
        'https://placehold.co/400x500/2B4562/white?text=ISACK+HADJAR+6'
      ]
    },
    'BEA': {
      name: 'Oliver Bearman',
      nationality: 'British',
      birthDate: '2005-05-08',
      number: 87,
      teams: {
        '2025': ['Haas F1 Team (2025-present)'],
        '2026': ['Haas F1 Team (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
        'https://placehold.co/400x500/B6BABD/000000?text=OLIVER+BEARMAN+87'
      ]
    },
    'LAW': {
      name: 'Liam Lawson',
      nationality: 'New Zealander',
      birthDate: '2002-02-11',
      number: 30,
      teams: {
        '2025': ['Racing Bulls (2025-present)'],
        '2026': ['Racing Bulls (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
        'https://placehold.co/400x500/2B4562/white?text=LIAM+LAWSON+30'
      ]
    },
    'OCO': {
      name: 'Esteban Ocon',
      nationality: 'French',
      birthDate: '1996-09-17',
      number: 31,
      teams: {
        '2025': ['Manor (2016)', 'Force India (2017-2018)', 'Renault/Alpine (2020-2024)', 'Haas (2025-present)'],
        '2026': ['Manor (2016)', 'Force India (2017-2018)', 'Renault/Alpine (2020-2024)', 'Haas (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/ocon.jpg',
        'https://placehold.co/400x500/B6BABD/000000?text=ESTEBAN+OCON+31'
      ]
    },
    'STR': {
      name: 'Lance Stroll',
      nationality: 'Canadian',
      birthDate: '1998-10-29',
      number: 18,
      teams: {
        '2025': ['Williams (2017-2018)', 'Racing Point (2019-2020)', 'Aston Martin (2021-present)'],
        '2026': ['Williams (2017-2018)', 'Racing Point (2019-2020)', 'Aston Martin (2021-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/stroll.jpg',
        'https://placehold.co/400x500/006F62/white?text=LANCE+STROLL+18'
      ]
    },
    'TSU': {
      name: 'Yuki Tsunoda',
      nationality: 'Japanese',
      birthDate: '2000-05-11',
      number: 22,
      teams: {
        '2025': ['AlphaTauri (2021-2023)', 'Racing Bulls (2024)', 'Red Bull Racing (2025)'],
        '2026': null
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/tsunoda.jpg',
        'https://placehold.co/400x500/0600EF/white?text=YUKI+TSUNODA+22'
      ]
    },
    'BOR': {
      name: 'Gabriel Bortoleto',
      nationality: 'Brazilian',
      birthDate: '2004-10-14',
      number: 5,
      teams: {
        '2025': ['Kick Sauber (2025)'],
        '2026': ['Kick Sauber (2025)', 'Audi (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png',
        'https://placehold.co/400x500/00E701/000000?text=GABRIEL+BORTOLETO+5'
      ]
    },
    'GAS': {
      name: 'Pierre Gasly',
      nationality: 'French',
      birthDate: '1996-02-07',
      number: 10,
      teams: {
        '2025': ['Toro Rosso (2017-2018)', 'Red Bull (2019)', 'Toro Rosso/AlphaTauri (2019-2022)', 'Alpine (2023-present)'],
        '2026': ['Toro Rosso (2017-2018)', 'Red Bull (2019)', 'Toro Rosso/AlphaTauri (2019-2022)', 'Alpine (2023-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
        'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/gasly.jpg',
        'https://placehold.co/400x500/0090FF/white?text=PIERRE+GASLY+10'
      ]
    },
    'DOO': {
      name: 'Jack Doohan',
      nationality: 'Australian',
      birthDate: '2003-01-20',
      number: 7,
      teams: {
        '2025': ['Alpine (2025)'],
        '2026': null
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png',
        'https://placehold.co/400x500/0090FF/white?text=JACK+DOOHAN+7'
      ]
    },
    'COL': {
      name: 'Franco Colapinto',
      nationality: 'Argentine',
      birthDate: '2003-05-27',
      number: 43,
      teams: {
        '2025': ['Alpine (2025)'],
        '2026': ['Alpine (2025-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png',
        'https://placehold.co/400x500/0090FF/white?text=FRANCO+COLAPINTO+43'
      ]
    },
    'HER': {
      name: 'Colton Herta',
      nationality: 'American',
      birthDate: '2000-03-30',
      number: 26,
      teams: {
        '2025': null,
        '2026': null
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/C/COLHER01_Colton_Herta/colher01.png',
        'https://placehold.co/400x500/D4AF37/000000?text=COLTON+HERTA+26'
      ]
    },
    'HIR': {
      name: 'Ryo Hirakawa',
      nationality: 'Japanese',
      birthDate: '1994-07-08',
      number: 99,
      teams: {
        '2025': null,
        '2026': null
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/R/RYOHIR01_Ryo_Hirakawa/ryohir01.png',
        'https://placehold.co/400x500/D4AF37/000000?text=RYO+HIRAKAWA+99'
      ]
    },
    'LIN': {
      name: 'Arvid Lindblad',
      nationality: 'British',
      birthDate: '2005-08-17',
      number: 41,
      teams: {
        '2025': null,
        '2026': ['Racing Bulls (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png',
        'https://placehold.co/400x500/2B4562/white?text=ARVID+LINDBLAD+41'
      ]
    },
    'MEX': {
      name: 'Sergio Pérez',
      nationality: 'Mexican',
      birthDate: '1990-01-26',
      number: 11,
      teams: {
        '2025': null,
        '2026': ['Cadillac F1 Team (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png',
        'https://placehold.co/400x500/D4AF37/000000?text=SERGIO+PEREZ+11'
      ]
    },
    'BOT': {
      name: 'Valtteri Bottas',
      nationality: 'Finnish',
      birthDate: '1989-08-28',
      number: 77,
      teams: {
        '2025': null,
        '2026': ['Cadillac F1 Team (2026-present)']
      },
      championships: 0,
      images: [
        'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png',
        'https://placehold.co/400x500/D4AF37/000000?text=VALTTERI+BOTTAS+77'
      ]
    },
  };

  useEffect(() => {
    fetchDriverData();
  }, [driverCode, selectedSeason]);

  const fetchDriverData = async () => {
    setLoading(true);
    setError(null);
    setImageAttempt(0);
    
    try {
      // Si es 2026, usar datos estáticos sin puntos
      if (selectedSeason === '2026') {
        const additionalInfo = driversInfo[driverCode] || {};
        const teamsForSeason = additionalInfo.teams?.['2026'];
        
        // Si el piloto no está en 2026
        if (teamsForSeason === null) {
          setError('Driver not racing in this season');
          setLoading(false);
          return;
        }

        // Mapeo de posiciones finales 2025 para 2026
        const positions2026 = {
          'NOR': 1, 'PIA': 2, 'ANT': 3, 'RUS': 4, 'VER': 5,
          'HAD': 6, 'LEC': 7, 'HAM': 8, 'ALB': 9, 'SAI': 10,
          'LAW': 11, 'LIN': 12, 'ALO': 13, 'STR': 14, 'OCO': 15,
          'BEA': 16, 'BOR': 17, 'HUL': 18, 'GAS': 19, 'COL': 20,
          'MEX': 21, 'BOT': 22
        };

        // Obtener el equipo actual del piloto para 2026
        let currentTeam = 'Unknown Team';
        if (teamsForSeason && teamsForSeason.length > 0) {
          const lastTeam = teamsForSeason[teamsForSeason.length - 1];
          const teamMatch = lastTeam.match(/^([^(]+)/);
          currentTeam = teamMatch ? teamMatch[1].trim() : lastTeam;
        }

        // Datos estáticos para 2026 (sin puntos ni victorias)
        const staticDriverData2026 = {
          driver: additionalInfo.name || 'Unknown Driver',
          driver_code: driverCode,
          team: currentTeam,
          position: positions2026[driverCode] || 21,
          total_points: 0,
          wins: 0,
          race_history: []
        };

        setDriverData({
          ...staticDriverData2026,
          ...additionalInfo,
          name: additionalInfo.name || staticDriverData2026.driver,
          nationality: additionalInfo.nationality || 'Unknown',
          birthDate: additionalInfo.birthDate || '2000-01-01',
          number: additionalInfo.number || '?',
          teams: teamsForSeason,
          championships: additionalInfo.championships || 0,
          images: additionalInfo.images || ['https://placehold.co/400x500/333333/white?text=DRIVER+PHOTO']
        });
        
        setLoading(false);
        return;
      }

      // Obtener datos de standings para estadísticas actuales (solo 2025)
      const response = await axios.get(`https://f1racepredictor.onrender.com/standings/drivers/${selectedSeason}`);
      const standings = response.data?.standings || [];
      
      // Buscar el piloto por código
      const driverStanding = standings.find(d => d.driver_code === driverCode);
      
      if (driverStanding) {
        // Combinar datos de API con información adicional si existe
        const additionalInfo = driversInfo[driverCode] || {};
        const teamsForSeason = additionalInfo.teams?.[selectedSeason] || additionalInfo.teams?.['2025'] || [driverStanding.team || 'Unknown Team'];
        
        // Si el piloto no está en esta temporada (teams es null)
        if (teamsForSeason === null) {
          setError('Driver not racing in this season');
          return;
        }
        
        setDriverData({
          ...driverStanding,
          ...additionalInfo,
          // Usar valores por defecto si no existen
          name: additionalInfo.name || driverStanding.driver,
          nationality: additionalInfo.nationality || 'Unknown',
          birthDate: additionalInfo.birthDate || '2000-01-01',
          number: additionalInfo.number || driverStanding.driver_number || '?',
          teams: teamsForSeason,
          championships: additionalInfo.championships || 0,
          images: additionalInfo.images || ['https://placehold.co/400x500/333333/white?text=DRIVER+PHOTO']
        });
      } else {
        setError('Driver not found');
      }
    } catch (err) {
      console.error('Error fetching driver data:', err);
      setError('Error loading driver data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    if (driverData && driverData.images && imageAttempt < driverData.images.length - 1) {
      setImageAttempt(prev => prev + 1);
      e.target.src = driverData.images[imageAttempt + 1];
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getCountryFlag = (nationality) => {
    const flags = {
      'Dutch': '🇳🇱', 'British': '🇬🇧', 'Monegasque': '🇲🇨', 'Spanish': '🇪🇸',
      'Mexican': '🇲🇽', 'Australian': '🇦🇺', 'French': '🇫🇷', 'Canadian': '🇨🇦',
      'German': '🇩🇪', 'Japanese': '🇯🇵', 'Danish': '🇩🇰', 'Finnish': '🇫🇮',
      'Chinese': '🇨🇳', 'Thai': '🇹🇭', 'Italian': '🇮🇹', 'New Zealander': '🇳🇿',
      'Brazilian': '🇧🇷', 'Argentine': '🇦🇷', 'American': '🇺🇸',
    };
    return flags[nationality] || '🏁';
  };

  if (loading) {
    return (
      <div className="driver-detail-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading driver information...</p>
        </div>
      </div>
    );
  }

  if (error || !driverData) {
    return (
      <div className="driver-detail-container">
        <div className="error">
          <p>Error loading driver information</p>
          <button onClick={() => navigate('/standings')} className="back-button">
            ← Back to Standings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="driver-detail-container">
      <motion.button
        className="back-button"
        onClick={() => navigate('/standings')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Standings
      </motion.button>

      <div className="season-selector-driver">
        <motion.button
          className={`season-btn-driver ${selectedSeason === '2025' ? 'active' : ''}`}
          onClick={() => setSelectedSeason('2025')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          2025
        </motion.button>
        <motion.button
          className={`season-btn-driver ${selectedSeason === '2026' ? 'active' : ''}`}
          onClick={() => setSelectedSeason('2026')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          2026
        </motion.button>
      </div>

      <motion.div
        className="driver-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="driver-photo-container">
          <img 
            src={driverData.images[imageAttempt]} 
            alt={driverData.name}
            className="driver-photo"
            onError={handleImageError}
          />
          <div className="driver-number-badge">{driverData.number}</div>
        </div>

        <div className="driver-header-info">
          <h1 className="driver-name">{driverData.name}</h1>
          <div className="driver-basic-info">
            <span className="nationality">
              <span className="flag-large">{getCountryFlag(driverData.nationality)}</span>
              {driverData.nationality}
            </span>
            <span className="age">Age: {calculateAge(driverData.birthDate)}</span>
            <span className="birth-date">Born: {new Date(driverData.birthDate).toLocaleDateString()}</span>
          </div>
          <div className="current-team">
            <span className="team-label">Current Team:</span>
            <span className="team-name">{driverData.team}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="driver-stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="stat-card championships"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4)' }}
        >
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{driverData.championships}</div>
          <div className="stat-label">Championships</div>
        </motion.div>

        <motion.div 
          className="stat-card wins"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(239, 0, 0, 0.4)' }}
        >
          <div className="stat-icon">🥇</div>
          <div className="stat-value">{driverData.wins}</div>
          <div className="stat-label">Race Wins</div>
        </motion.div>

        <motion.div 
          className="stat-card points"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(239, 0, 0, 0.4)' }}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-value">{driverData.total_points}</div>
          <div className="stat-label">Points ({selectedSeason})</div>
        </motion.div>

        <motion.div 
          className="stat-card position"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(239, 0, 0, 0.4)' }}
        >
          <div className="stat-icon">🏁</div>
          <div className="stat-value">P{driverData.position}</div>
          <div className="stat-label">Current Position</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="driver-career"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2>Career History</h2>
        <div className="teams-list">
          {driverData.teams.map((team, index) => (
            <motion.div
              key={index}
              className="team-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="team-bullet"></div>
              <span>{team}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {driverData.race_history && driverData.race_history.length > 0 && (
        <motion.div
          className="driver-season-progress"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2>{selectedSeason} Season Progress</h2>
          <div className="race-history-grid">
            {driverData.race_history.slice(0, 10).map((race, index) => (
              <motion.div
                key={index}
                className="race-result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="race-round">R{race.round}</div>
                <div className={`race-position ${race.position <= 3 ? 'podium' : ''}`}>
                  P{race.position}
                </div>
                <div className="race-points">+{race.points_gained} pts</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DriverDetail;
