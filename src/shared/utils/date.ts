export function getTimeAgoString(previousTime: string): string {
  const currentTime = new Date();
  const previousDate = new Date(previousTime);
  const elapsedTime = currentTime.getTime() - previousDate.getTime();

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} yil oldin`;
  } else if (months > 0) {
    return `${months} oy oldin`;
  } else if (days > 0) {
    return `${days} kun oldin`;
  } else if (hours > 0) {
    return `${hours} soat oldin`;
  } else if (minutes > 0) {
    return `${minutes} minut oldin`;
  } else {
    return `${seconds} sekund oldin`;
  }
}
