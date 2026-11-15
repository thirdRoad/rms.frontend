export function formatTime(dateString) {
	return new Date(dateString).toLocaleTimeString('tr-TR', {
		hour: '2-digit',
		minute: '2-digit',
	})
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${day}.${month}.${year}`
}

export function formatPrice(price) {
	return `${Number(price).toFixed(2)} ₺`
}
