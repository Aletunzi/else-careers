export const formatCurrentDate = (date: Date = new Date()): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const day = date.getDate();
  const suffix = (() => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  })();
  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
};