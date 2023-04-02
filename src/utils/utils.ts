export const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-EN', {
        maximumFractionDigits: 1,
    }).format(value)
