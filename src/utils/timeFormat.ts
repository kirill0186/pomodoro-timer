const padTime = (time: number): string => {
    return time.toString().padStart(2, '0');
};

export const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${padTime(hours)}:${padTime(minutes)}:${padTime(remainingSeconds)}`;
};

export const formatInputToTime = (numbers: string): string => {
    const padded = numbers.padStart(6, '0');

    const hours = padded.slice(0, 2);
    const minutes = padded.slice(2, 4);
    const seconds = padded.slice(4, 6);

    return `${hours}:${minutes}:${seconds}`;
};

export const inputTimeToSeconds = (inputTime: string): number => {
    const formattedTime = formatInputToTime(inputTime);
    const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds; 
}

export const sanitizeTimerValue = (value: string) => value.replace(/\D/g, '').slice(0, 6);

export const formatOvertime = (seconds: number): string => {
    if (seconds === 0) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `+${padTime(hours)}:${padTime(minutes)}:${padTime(remainingSeconds)}`;
};