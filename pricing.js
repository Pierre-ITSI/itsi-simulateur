// Table des tranches de crédits et tarifs
const tranches = [
    {id: 1, min: 0, max: 100, coef: 1.00},
    {id: 2, min: 100, max: 200, coef: 1.02},
    {id: 3, min: 200, max: 500, coef: 1.05},
    {id: 4, min: 500, max: 1000, coef: 1.08},
    {id: 5, min: 1000, max: 2000, coef: 1.10},
    {id: 6, min: 2000, max: 5000, coef: 1.12},
    {id: 7, min: 5000, max: Infinity, coef: 1.12}
];

/**
 * Détermine la tranche basée sur le total des crédits.
 * @param {number} totalCredits - Le total des crédits.
 * @returns {Object} La tranche correspondante.
 */
function determineTranche(totalCredits) {
    for (let i = 0; i < tranches.length; i++) {
        if (totalCredits >= tranches[i].min && totalCredits < tranches[i].max) {
            return tranches[i];
        }
    }
    return tranches[0];
}

/**
 * Calcule le coût total avec remise et TVA.
 * @param {number} total_credits - Le total des crédits.
 * @param {number} [tvaRate=0.2] - Le taux de TVA (par défaut 20%).
 * @returns {Object} Un objet contenant le total HT, la TVA et le total TTC.
 */
function calculateTotalWithDiscount(total_credits, tvaRate = 0.2) {
    const tranche = determineTranche(total_credits);
    const totalHt = total_credits / tranche.coef;
    const tva = totalHt * tvaRate;
    const totalTtc = totalHt + tva;

    return {
        totalHt: totalHt,
        tva: tva,
        totalTtc: totalTtc
    };
}

// Définir les constantes de prix
    const tech_price_credit = 3;
    const artist_price_credit = 3;
    const renfort_price_credit = 3;
    const figuration_price_credit = 3;
    const weeks_price_credit = 0;

// Rendre les constantes disponibles globalement
    window.tech_price_credit = tech_price_credit;
    window.artist_price_credit = artist_price_credit;
    window.renfort_price_credit = renfort_price_credit;
    window.figuration_price_credit = figuration_price_credit;
    window.weeks_price_credit = weeks_price_credit;

// Rendre les fonctions disponibles globalement
    window.calculateTotalWithDiscount = calculateTotalWithDiscount;
    window.determineTranche = determineTranche;
