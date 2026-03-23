export const C = {
  blue:        '#001e5a',
  blueBright:  '#1e5af0',
  orange:      '#d25a00',
  orangeLight: '#d29678',
  magenta:     '#d20096',
  green:       '#00783c',
  yellow:      '#f0d23c',
  white:       '#ffffff',
  textSoft:    '#5a6070',
}

export const CATEGORIES = [
  {
    id: 'alimentation',
    label: 'Alimentation',
    emoji: '🍽️',
    color: '#d25a00',
    bg: '#fdf3ec',
    description: 'Glucides, index glycémique, équilibre alimentaire',
  },
  {
    id: 'activite',
    label: 'Activité physique',
    emoji: '🏃',
    color: '#1e5af0',
    bg: '#edf3ff',
    description: 'Sport, activité quotidienne, sédentarité',
  },
  {
    id: 'traitements',
    label: 'Traitements',
    emoji: '💊',
    color: '#d20096',
    bg: '#fdeef8',
    description: 'Médicaments, insuline, injections',
  },
  {
    id: 'surveillance',
    label: 'Surveillance',
    emoji: '📊',
    color: '#00783c',
    bg: '#edf8f2',
    description: 'HbA1c, glycémie, objectifs',
  },
  {
    id: 'urgences',
    label: 'Urgences & complications',
    emoji: '⚠️',
    color: '#cc0000',
    bg: '#fff0f0',
    description: 'Hypoglycémie, pieds, yeux, reins',
  },
  {
    id: 'vie',
    label: 'Vie quotidienne',
    emoji: '🌍',
    color: '#b08800',
    bg: '#fdfaed',
    description: 'Voyage, Ramadan, alcool, tabac',
  },
]

export const FICHES = [
  { id: 1, title: 'Alimentation & glucides',  emoji: '🥗', file: '/fiches/alimentation-glucides.pdf',   color: '#d25a00', bg: '#fdf3ec', categorie: 'alimentation' },
  { id: 2, title: 'Activité physique',         emoji: '🏃', file: '/fiches/activite-physique.pdf',       color: '#1e5af0', bg: '#edf3ff', categorie: 'activite' },
  { id: 3, title: 'Médicaments & insuline',    emoji: '💊', file: '/fiches/medicaments-insuline.pdf',    color: '#d20096', bg: '#fdeef8', categorie: 'traitements' },
  { id: 4, title: 'Surveillance glycémique',   emoji: '📊', file: '/fiches/surveillance-glycemique.pdf', color: '#00783c', bg: '#edf8f2', categorie: 'surveillance' },
  { id: 5, title: 'Hypoglycémie',              emoji: '⚠️', file: '/fiches/hypoglycemie.pdf',            color: '#cc0000', bg: '#fff0f0', categorie: 'urgences' },
  { id: 6, title: 'Complications & dépistage', emoji: '🔍', file: '/fiches/complications-depistage.pdf', color: '#00783c', bg: '#edf8f2', categorie: 'urgences' },
]
