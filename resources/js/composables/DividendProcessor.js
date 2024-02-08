import { ref, watchEffect } from "vue";
import { useDividendStore } from "../store/dividends.js";

export function useDividendProcessor(stockId) {
    const dividendStore = useDividendStore();
    const error = ref(null);

    const dividendData = ref(null);
    const totalDividendsCurrentYearForStock = ref(null);

    watchEffect(async () => {
        // Reset state before fetching
        dividendData.value = null;
        totalDividendsCurrentYearForStock.value = null;
        error.value = null;

        try {
            // Fetch and process dividend data
            const dividends = await dividendStore.getByStockId(stockId);
            dividendData.value = transformDividends(dividends);
            // Calculate dividend for the current year
            totalDividendsCurrentYearForStock.value =
                calculateTotalDividendsCurrentYear(dividendData);
        } catch (err) {
            console.error("Error fetching data for stockId:", err);
            // Set error state
            error.value = err;
        }
    });

    const transformDividends = (dividends) => {
        return dividends.map((dividend) => {
            const paymentYear = new Date(dividend.paymentDates).getFullYear();
            return [dividend.dividendYield, paymentYear];
        });
    };

    const calculateTotalDividendsCurrentYear = (dividendData) => {
        // Check if there is no dividend data
        if (!dividendData.value || dividendData.value.length === 0) {
            return "No dividend data available";
        }

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Filter dividends for the current year
        // console.log(dividendData.value);
        const dividendsForCurrentYear = dividendData.value.filter(
            (dividend) => {
                const paymentYear = dividend[1];
                return paymentYear === currentYear;
            }
        );

        // Calculate and return the total dividend for the current year
        const totalDividends = dividendsForCurrentYear.reduce(
            (total, dividend) => total + dividend[0],
            0
        );

        return totalDividends;
    };

    // Return methods
    return {
        dividendData,
        totalDividendsCurrentYearForStock,
        error,
    };
}
