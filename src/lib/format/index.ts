import dayjs from 'dayjs';

export function parseBool(v: string | boolean) {
	if (v === '' || v === 'null' || v == null) {
		return null;
	}
	return v === true || v === 'true';
}

export function dateTime(v: string) {
	if (!v) {
		return '';
	}
	return dayjs(v).format('DD/MM/YYYY HH:mm:ss');
}

export function currency(v: number): string {
	if (!v) {
		return '';
	}
	return Number(v).toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
}
