// script.js
// IMPORTANTE: Este script agora é um MÓDULO (type="module" no HTML).

// --- 1. Dados e Constantes do Projeto (Acessível em todo o arquivo) ---
const TELE_VENDAS_PHONE = '554630101547';
const DEFAULT_WHATSAPP_MESSAGE = "Olá! Estava olhando seu catálogo e gostaria de fazer um pedido. Sou de ";
const CATALOG_URL = 'docs/catalogo-juliplast.pdf';

const REPRESENTATIVES = [
    { name: 'Mateus', phone: '554699235364', cities: [
        { name: 'Cruzeiro do Iguaçu', delivery: 'terça-feira' },
        { name: 'Boa Esperança do Iguaçu', delivery: 'terça-feira' },
        { name: 'Dois Vizinhos', delivery: 'diariamente' },
        { name: 'Quedas do Iguaçu', delivery: 'quinta-feira' },
        { name: 'Espigão Alto do Iguaçu', delivery: 'quinta-feira' },
        { name: 'Sede Paranhos', delivery: 'quinta-feira' },
        { name: 'São Jorge D\'Oeste', delivery: 'quarta-feira' },
        { name: 'Verê', delivery: 'sexta-feira' },
        { name: 'Itapejara D\'Oeste', delivery: 'segunda-feira' },
        { name: 'Bom Sucesso', delivery: 'segunda-feira' },
    ]},
    { name: 'Reinaldo', phone: '554699076900', cities: [
        { name: 'Ampere', delivery: 'sexta-feira' },
        { name: 'Francisco Beltrão', delivery: 'segunda-feira' },
        { name: 'Coronel Vivida', delivery: 'segunda-feira' },
        { name: 'Chopinzinho', delivery: 'quarta-feira' },
        { name: 'Vista Alegre', delivery: 'a definir' },
        { name: 'Enéas Marques', delivery: 'a definir' },
        { name: 'Nova Esperança do Sudoeste', delivery: 'a definir' },
        { name: 'Salto do Lontra', delivery: 'a definir' },
        { name: 'Nova Prata do Iguaçu', delivery: 'a definir' },
        { name: 'Santa Izabel do Oeste', delivery: 'a definir' },
        { name: 'Realeza', delivery: 'a definir' },
        { name: 'Pinhal de São Bento', delivery: 'sexta-feira' },
        { name: 'Pranchita', delivery: 'a definir' },
        { name: 'Pérola d\'Oeste', delivery: 'a definir' },
        { name: 'Planalto', delivery: 'a definir' },
        { name: 'Santo Antônio do Sudoeste', delivery: 'a definir' },
        { name: 'Dionísio Cerqueira', delivery: 'a definir' },
        { name: 'Pato Branco', delivery: 'a definir' },
        { name: 'Clevelândia', delivery: 'a definir' },
        { name: 'Mariópolis', delivery: 'a definir' },
        { name: 'Palmas', delivery: 'a definir' },
        { name: 'São João', delivery: 'a definir' },
        { name: 'Saudade do Iguaçu', delivery: 'a definir' },
        { name: 'Sulina', delivery: 'a definir' },
        { name: 'Rio Bonito do Iguaçu', delivery: 'a definir' },
    ]},
];

function getCityList() {
    let cities = [];
    REPRESENTATIVES.forEach(rep => {
        rep.cities.forEach(city => {
            cities.push({
                name: city.name,
                repName: rep.name,
                repPhone: rep.phone,
                delivery: city.delivery
            });
        });
    });
    
    cities.push({ 
        name: 'Minha cidade não está na lista',
        repName: 'Tele Vendas',
        repPhone: TELE_VENDAS_PHONE,
        delivery: 'Consulte o atendimento',
        isTeleVendas: true 
    });

    const teleVendasOption = cities.pop();
    cities.sort((a, b) => a.name.localeCompare(b.name));
    cities.push(teleVendasOption);

    return cities;
}

// --- Funções Auxiliares (Scroll Reveal) ---

function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}


// --- Execução Principal do Script ---

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. Elementos DOM ---
    const modal = document.getElementById('city-selector-modal');
    const citySelectModal = document.getElementById('city-select-modal');
    const citySelectPage = document.getElementById('city-select-page');
    const accessCatalogBtnModal = document.getElementById('access-catalog-modal');
    const whatsappCTAPage = document.getElementById('whatsapp-cta-page');
    const whatsappText = document.getElementById('whatsapp-text');
    const repInfoDiv = document.getElementById('representative-info');
    const repNameSpan = document.getElementById('rep-name');
    const repDeliveryDaySpan = document.getElementById('rep-delivery-day');
    const navbarWhatsappBtn = document.getElementById('navbar-whatsapp-btn');
    const mobileWhatsappBtn = document.getElementById('mobile-whatsapp-btn');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');


    // --- 3. Funções de Manipulação do DOM (Atualizadas para o escopo) ---

    function populateCitySelectors() {
        const cityList = getCityList();
        
        const createOptions = (selector) => {
            const defaultOption = selector.querySelector('option[disabled]');
            if (defaultOption) {
                 selector.innerHTML = defaultOption.outerHTML;
            } else {
                 selector.innerHTML = '<option value="" disabled selected>Escolha sua Cidade...</option>';
            }

            cityList.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                option.dataset.repName = city.repName;
                option.dataset.repPhone = city.repPhone;
                option.dataset.delivery = city.delivery;
                option.dataset.isTeleVendas = city.isTeleVendas ? 'true' : 'false';
                selector.appendChild(option);
            });
        };
        
        createOptions(citySelectModal);
        createOptions(citySelectPage);
    }
    
    function setTeleVendasDefault() {
        const defaultMessage = `${DEFAULT_WHATSAPP_MESSAGE} uma cidade não selecionada.`;
        const defaultLink = `https://wa.me/${TELE_VENDAS_PHONE}?text=${encodeURIComponent(defaultMessage)}`;
        
        whatsappCTAPage.href = defaultLink;
        whatsappText.textContent = 'Fale com o Tele Vendas';
        repInfoDiv.classList.add('hidden');
        
        navbarWhatsappBtn.href = defaultLink;
        mobileWhatsappBtn.href = defaultLink;
        const navbarSpan = navbarWhatsappBtn.querySelector('span');
        if (navbarSpan) navbarSpan.textContent = 'WhatsApp';
        
        accessCatalogBtnModal.disabled = true;
    }

    function updateWhatsAppLinks(selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        if (selectedOption.value === 'default' || selectedOption.value === '') {
            setTeleVendasDefault();
            return;
        }

        const city = selectedOption.value;
        const repName = selectedOption.dataset.repName;
        const repPhone = selectedOption.dataset.repPhone;
        const deliveryDay = selectedOption.dataset.delivery;
        const isTeleVendas = selectedOption.dataset.isTeleVendas === 'true';

        let whatsappMessage;
        if (isTeleVendas) {
            whatsappMessage = `${DEFAULT_WHATSAPP_MESSAGE} uma cidade não listada.`;
        } else {
            whatsappMessage = `${DEFAULT_WHATSAPP_MESSAGE}${city}.`;
        }
        
        const waLink = `https://wa.me/${repPhone}?text=${encodeURIComponent(whatsappMessage)}`;
        
        whatsappCTAPage.href = waLink;
        whatsappText.textContent = isTeleVendas ? 'Fale com o Tele Vendas' : `Falar com ${repName} via WhatsApp`;
        
        if (isTeleVendas) {
            repInfoDiv.classList.add('hidden');
        } else {
            repInfoDiv.classList.remove('hidden');
            repNameSpan.textContent = repName;
            repDeliveryDaySpan.textContent = deliveryDay;
        }
        
        navbarWhatsappBtn.href = waLink;
        mobileWhatsappBtn.href = waLink;
        
        const navbarSpan = navbarWhatsappBtn.querySelector('span');
        if (navbarSpan) {
             navbarSpan.textContent = isTeleVendas ? 'Tele Vendas' : `Falar com ${repName}`;
        }
        
        if (selectElement.id === 'city-select-modal') {
             accessCatalogBtnModal.disabled = false;
        }
    }

    // --- Execução e Listeners ---
    
    populateCitySelectors(); 
    setTeleVendasDefault();  
    setupScrollReveal();

    citySelectPage.addEventListener('change', (e) => updateWhatsAppLinks(e.target));
    citySelectModal.addEventListener('change', (e) => updateWhatsAppLinks(e.target));

    accessCatalogBtnModal.addEventListener('click', () => {
        const selectedCity = citySelectModal.value;
        if (selectedCity && selectedCity !== 'default') {
            // CORREÇÃO: Adicionamos a lógica de fechar o modal aqui.
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';

            // Sincroniza a seleção do modal com o dropdown da página
            citySelectPage.value = selectedCity;
            updateWhatsAppLinks(citySelectPage);
        }
    });

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.querySelector('i').classList.toggle('bx-menu');
        mobileMenuButton.querySelector('i').classList.toggle('bx-x');
    });

});