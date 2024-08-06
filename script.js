function calculateTotal() {
    const tech_qty = parseFloat(document.getElementById('tech_qty').value) || 0;
    const artist_qty = parseFloat(document.getElementById('artist_qty').value) || 0;
    const renfort_qty = parseFloat(document.getElementById('renfort_qty').value) || 0;
    const figuration_qty = parseFloat(document.getElementById('figuration_qty').value) || 0;
    const weeks_qty = parseFloat(document.getElementById('weeks_qty').value) || 0;

    // Obtenir les prix depuis le fichier pricing.js
    const tech_price_credit = window.tech_price_credit;
    const artist_price_credit = window.artist_price_credit;
    const renfort_price_credit = window.renfort_price_credit;
    const figuration_price_credit = window.figuration_price_credit;
    const weeks_price_credit = window.weeks_price_credit;

    // Mise à jour des cellules de prix
    document.getElementById('tech_price_cell').innerText = tech_price_credit;
    document.getElementById('artist_price_cell').innerText = artist_price_credit;
    document.getElementById('renfort_price_cell').innerText = renfort_price_credit;
    document.getElementById('figuration_price_cell').innerText = figuration_price_credit;
    document.getElementById('weeks_price_cell').innerText = weeks_price_credit;
    
    const tech_coef = Math.ceil(tech_qty * 1);
    const artist_coef = Math.ceil(artist_qty * 1);
    const renfort_coef = Math.ceil(renfort_qty * 0.66);
    const figuration_coef = Math.ceil(figuration_qty * 0.75);
    const weeks_coef = Math.ceil(weeks_qty * 0);

    const tech_total = Math.ceil(tech_qty * tech_price_credit * 1);
    const artist_total = Math.ceil(artist_qty * artist_price_credit * 1);
    const renfort_total = Math.ceil(renfort_qty * renfort_price_credit * 0.66);
    const figuration_total = Math.ceil(figuration_qty * figuration_price_credit * 0.75);
    const weeks_total = Math.ceil(weeks_qty * weeks_price_credit * 1);

    const total_credits = tech_total + artist_total + renfort_total + figuration_total + weeks_total;

    const signatures_electroniques = document.getElementById('option_signature').checked ? Math.ceil((tech_qty + artist_qty + renfort_coef + figuration_coef) * 2) : 0;
    const feuilles_de_temps = document.getElementById('option_feuilles').checked && !document.getElementById('option_signature_feuilles').checked ? Math.ceil((weeks_qty - 1) * (tech_qty + renfort_qty) * 2) : 0;
    const signatures_electroniques_feuilles = document.getElementById('option_signature_feuilles').checked ? Math.ceil((weeks_qty) * (tech_qty + renfort_qty) * 3) : 0;
    const contrats_speciaux = document.getElementById('option_contrats').checked ? 150 : 0;
    const traitement_paie = document.getElementById('option_paie').checked ? Math.ceil(weeks_qty * (tech_qty + artist_qty + renfort_qty + figuration_qty) * 16) : 0;

    const total_cost = total_credits + signatures_electroniques + feuilles_de_temps + signatures_electroniques_feuilles + contrats_speciaux + traitement_paie;

    // Calculer le total HT, la TVA et le total TTC avec les remises sur volume
    const tranche = determineTranche(total_cost);
    const tranche1 = tranches[0];
    const sousTotalHT = total_cost / tranche1.coef;
    const discountedCost = sousTotalHT / tranche.coef;
    const tva = discountedCost * 0.2;
    const totalTtc = discountedCost + tva;

    const tech_total_el = document.getElementById('tech_total');
    const artist_total_el = document.getElementById('artist_total');
    const renfort_total_el = document.getElementById('renfort_total');
    const figuration_total_el = document.getElementById('figuration_total');
    const weeks_total_el = document.getElementById('weeks_total');

    // Mettre à jour les éléments si ils existent
    if (tech_total_el) tech_total_el.innerText = `${tech_total} crédits`;
    if (artist_total_el) artist_total_el.innerText = `${artist_total} crédits`;
    if (renfort_total_el) renfort_total_el.innerText = `${renfort_total} crédits`;
    if (figuration_total_el) figuration_total_el.innerText = `${figuration_total} crédits`;
    if (weeks_total_el) weeks_total_el.innerText = `${weeks_total} crédits`;

    // Mettre à jour les bulles de coût
    const tech_bubble = document.getElementById('tech_bubble');
    const artist_bubble = document.getElementById('artist_bubble');
    const renfort_bubble = document.getElementById('renfort_bubble');
    const figuration_bubble = document.getElementById('figuration_bubble');
    const weeks_bubble = document.getElementById('weeks_bubble');
    const signature_bubble = document.getElementById('signature_bubble');
    const feuilles_bubble = document.getElementById('feuilles_bubble');
    const signature_feuilles_bubble = document.getElementById('signature_feuilles_bubble');
    const contrats_bubble = document.getElementById('contrats_bubble');
    const paie_bubble = document.getElementById('paie_bubble');

    if (tech_bubble) tech_bubble.innerText = `${tech_total} crédits`;
    if (artist_bubble) artist_bubble.innerText = `${artist_total} crédits`;
    if (renfort_bubble) renfort_bubble.innerText = `${renfort_total} crédits`;
    if (figuration_bubble) figuration_bubble.innerText = `${figuration_total} crédits`;
    if (weeks_bubble) weeks_bubble.innerText = `${weeks_total} crédits`;

    if (signature_bubble) signature_bubble.innerText = `${signatures_electroniques} crédits`;
    if (feuilles_bubble) feuilles_bubble.innerText = `${feuilles_de_temps} crédits`;
    if (signature_feuilles_bubble) signature_feuilles_bubble.innerText = `${signatures_electroniques_feuilles} crédits`;
    if (contrats_bubble) contrats_bubble.innerText = `${contrats_speciaux} crédits`;
    if (paie_bubble) paie_bubble.innerText = `${traitement_paie} crédits`;

    const total_cost_el = document.getElementById('total_cost');
    const total_cost_euros_ht_el = document.getElementById('total_cost_euros_ht');
    const total_cost_euros_ttc_el = document.getElementById('total_cost_euros_ttc');

    if (total_cost_el) total_cost_el.innerText = `Total: ${total_cost} crédits (Tranche ${tranche.id})`;
    if (total_cost_euros_ht_el) {
    document.getElementById('total_cost_credits').innerText = `Total crédits : ${total_cost} crédits`;
    document.getElementById('subtotal_euros_ht').innerText = `Sous total € HT : ${sousTotalHT.toFixed(2)} € HT`;
    document.getElementById('tranche_coef').innerText = `Remise au volume tranche ${tranche.id} : ${tranche.coef}`;
    document.getElementById('total_euros_ht').innerText = `Total € HT : ${discountedCost.toFixed(2)} € HT`;
    }

    if (total_cost_euros_ttc_el) total_cost_euros_ttc_el.innerText = `Total € TTC: ${totalTtc.toFixed(2)} € TTC`;

    console.log("Calculations complete:", {
        tech_total,
        artist_total,
        renfort_total,
        figuration_total,
        weeks_total,
        total_cost,
        totalHt: discountedCost,
        tva,
        totalTtc,
        tranche
    });
}

function toggleSignatureFeuilles() {
    const feuillesChecked = document.getElementById('option_feuilles').checked;
    const signatureFeuillesContainer = document.getElementById('signature_feuilles_container');
    const signatureFeuillesCheckbox = document.getElementById('option_signature_feuilles');

    if (feuillesChecked) {
        signatureFeuillesContainer.style.display = 'block';
    } else {
        signatureFeuillesContainer.style.display = 'none';
        signatureFeuillesCheckbox.checked = false;
    }
}



// Attacher les fonctions au window pour les rendre globales
window.calculateTotal = calculateTotal;
window.toggleSignatureFeuilles = toggleSignatureFeuilles;

// Initial calculation
window.addEventListener('load', (event) => {
    calculateTotal();
});



// Add event listeners for initial calculation
document.getElementById('tech_qty').addEventListener('input', calculateTotal);
document.getElementById('artist_qty').addEventListener('input', calculateTotal);
document.getElementById('renfort_qty').addEventListener('input', calculateTotal);
document.getElementById('figuration_qty').addEventListener('input', calculateTotal);
document.getElementById('weeks_qty').addEventListener('input', calculateTotal);
document.getElementById('option_signature').addEventListener('change', calculateTotal);
document.getElementById('option_feuilles').addEventListener('change', () => {
    toggleSignatureFeuilles();
    calculateTotal();
});
document.getElementById('option_signature_feuilles').addEventListener('change', calculateTotal);
document.getElementById('option_contrats').addEventListener('change', calculateTotal);
document.getElementById('option_paie').addEventListener('change', calculateTotal);



//Info tooltip //
document.addEventListener('DOMContentLoaded', () => {
    const infoIcons = document.querySelectorAll('.info-icon');

    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const tooltipText = icon.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = tooltipText;
            document.body.appendChild(tooltip);

            const rect = icon.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;

            icon._tooltip = tooltip;
        });

        icon.addEventListener('mouseleave', () => {
            document.body.removeChild(icon._tooltip);
            icon._tooltip = null;
        });
    });
});
    

    //Dark Mode//
document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    // Check if dark mode is already enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeSwitch.checked = true;
    }

    darkModeSwitch.addEventListener('change', () => {
        if (darkModeSwitch.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        document.querySelector('.container').classList.add('dark-mode');
        document.querySelectorAll('.bubble').forEach(el => el.classList.add('dark-mode'));
        document.querySelectorAll('.checkbox-container').forEach(el => el.classList.add('dark-mode'));
        document.querySelectorAll('.info-icon').forEach(el => el.classList.add('dark-mode'));
        document.getElementById('total_cost_euros_ht').classList.add('dark-mode');
        document.getElementById('total_cost_euros_ttc').classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        document.querySelector('.container').classList.remove('dark-mode');
        document.querySelectorAll('.bubble').forEach(el => el.classList.remove('dark-mode'));
        document.querySelectorAll('.checkbox-container').forEach(el => el.classList.remove('dark-mode'));
        document.querySelectorAll('.info-icon').forEach(el => el.classList.remove('dark-mode'));
        document.getElementById('total_cost_euros_ht').classList.remove('dark-mode');
        document.getElementById('total_cost_euros_ttc').classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});
