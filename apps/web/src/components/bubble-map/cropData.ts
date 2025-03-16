interface CropData {
  name: string;
  province: string;
  coordinates: [number, number];
  size: number;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
}

const cropData: CropData[] = [
  // Spring Crops
  {
    name: 'Asparagus',
    province: 'Ontario',
    coordinates: [435.32, 487.19],
    size: 50,
    season: 'Spring',
  },
  {
    name: 'Strawberries',
    province: 'British Columbia',
    coordinates: [100.67, 400.83],
    size: 70,
    season: 'Spring',
  },
  {
    name: 'Maple Syrup',
    province: 'Quebec',
    coordinates: [506.91, 451.72],
    size: 120,
    season: 'Spring',
  },
  // Summer Crops
  {
    name: 'Wheat',
    province: 'Manitoba',
    coordinates: [320.84, 430.98],
    size: 200,
    season: 'Summer',
  },
  {
    name: 'Canola',
    province: 'Saskatchewan',
    coordinates: [230.89, 378.56],
    size: 180,
    season: 'Summer',
  },
  {
    name: 'Barley',
    province: 'Alberta',
    coordinates: [170.48, 400.05],
    size: 150,
    season: 'Summer',
  },
  // Fall Crops
  {
    name: 'Pumpkins',
    province: 'Ontario',
    coordinates: [455.32, 487.19],
    size: 90,
    season: 'Fall',
  },
  { name: 'Apples', province: 'Quebec', coordinates: [506.91, 401.72], size: 110, season: 'Fall' },
  {
    name: 'Cranberries',
    province: 'Nova Scotia',
    coordinates: [640.78, 500.66],
    size: 70,
    season: 'Fall',
  },
  // Winter Crops
  {
    name: 'Greenhouse Tomatoes',
    province: 'British Columbia',
    coordinates: [105.67, 419.83],
    size: 60,
    season: 'Winter',
  },
  {
    name: 'Greenhouse Peppers',
    province: 'Alberta',
    coordinates: [172.48, 362.05],
    size: 50,
    season: 'Winter',
  },
  {
    name: 'Greenhouse Cucumbers',
    province: 'Quebec',
    coordinates: [506.91, 451.72],
    size: 40,
    season: 'Winter',
  },
];

export default cropData;
