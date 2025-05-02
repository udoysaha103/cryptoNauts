export const formatPrice = (mcap) => mcap >= Math.pow(10, 9)
    ? Math.floor(mcap / Math.pow(10, 9)) + "B"
    : mcap >= Math.pow(10, 6)
        ? Math.floor(mcap / Math.pow(10, 6)) + "M"
        : mcap >= Math.pow(10, 3)
            ? Math.floor(mcap / Math.pow(10, 3)) + "K"
            : mcap;