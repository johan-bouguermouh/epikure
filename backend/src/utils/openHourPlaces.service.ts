import { OpeningHoursDto } from 'src/entities/place/dto/openinghours.dto';

interface resultSearchPlaceIsOpen {
  isOpen: boolean;
  message: string;
}

/**
 * Permet de calculer si un lieu est ouvert ou non
 * @param {Date} date - Date à laquelle on souhaite savoir si le lieu est ouvert
 * @param {OpeningHoursDto} openingHours - Horaires d'ouverture du lieu
 * @returns {boolean} - True si le lieu est ouvert, false sinon
 */
export function isOpen(
  openingHours: OpeningHoursDto,
  date: Date = new Date(),
): resultSearchPlaceIsOpen {
  const day = date.getDay();
  const hours = date.getHours();
  const nameDay = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
  ];

  const { periods } = openingHours;

  let isOpen = false;
  let message = '';

  periods.forEach((period, index) => {
    if (period.open.day === day) {
      if (period.open.hour <= hours && period.close.hour >= hours) {
        isOpen = true;
        message = `Ferme à ${period.close.hour}h${period.close.minute}`;
      } else {
        const nextDay = day === 6 ? 0 : day + 1;
        const nextDayName = nameDay[nextDay];

        message = `Prochaine ouverture à ${nextDayName} ${
          periods[index + 1].open.hour
        }h${periods[index + 1].open.minute}`;
      }
    }
  });

  return {
    isOpen,
    message,
  };
}
