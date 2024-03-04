import { ref, watchEffect } from "vue";
import { useDividendStore } from "../store/dividends.js";

interface Dividend {
    dividendYield: number;
    paymentDates: string;
}


type DividendData = [number,number][]

export function useDividendProcessor(stockId: number) {
    const dividendStore = useDividendStore();
    const error = ref<Error>();

    const dividendData = ref<DividendData>([]);
    const totalDividendsCurrentYearForStock = ref<number>();

    watchEffect(async () => {
        // Reset state before fetching
        dividendData.value = [];
        totalDividendsCurrentYearForStock.value = undefined;
        error.value = undefined;

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

    const transformDividends = (dividends:Dividend[]):DividendData => {
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
