import { musclesParts } from "./variables";


export function updateMuscles(bodyPart) {
  switch (bodyPart) {
    case 'cardio':
      return ['cardiovascular system'];
    case 'back':
      return ['lats', 'spine', 'upper back', 'traps'];
    case 'chest':
      return ['pectorals', 'serratus anterior'];
    case 'lower arms':
      return ['forearms']
    case 'lower legs':
      return ['calves']
    case 'neck':
      return ['levator scapulae']
    case 'shoulders':
      return ['delts']
    case 'upper arms':
      return ['triceps', 'biceps']
    case 'upper legs':
      return ['quads', 'glutes', 'hamstrings', 'adductors', 'abductors']
    case 'waist':
      return ['abs']
    default:
      return [...musclesParts]
  }
}