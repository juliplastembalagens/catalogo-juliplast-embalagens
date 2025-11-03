// script.js
// VERSÃO FINAL LIMPA E OTIMIZADA PARA CONVERSÃO (SEM PDF.JS)

// --- 1. Dados e Constantes do Projeto ---
const TELE_VENDAS_PHONE = '554630101547';
const DEFAULT_WHATSAPP_MESSAGE = "Olá! Gostaria de fazer um pedido. Sou de ";

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

// --- 2. Funções de Lógica de Negócio ---

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

function populateCitySelectors() {
    const cityList = getCityList();
    const citySelectPage = document.getElementById('city-select-page');

    const createOptions = (selector) => {
        const defaultOption = selector.querySelector('option[disabled]');
        if (defaultOption) {
             selector.innerHTML = defaultOption.outerHTML;
        } else {
             selector.innerHTML = '<option value="default" disabled selected>Escolha sua Cidade...</option>';
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
    
    createOptions(citySelectPage);
}

function setTeleVendasDefault() {
    const whatsappCTAPage = document.getElementById('whatsapp-cta-page');
    const whatsappText = document.getElementById('whatsapp-text');
    const repInfoDiv = document.getElementById('representative-info');
    const navbarWhatsappBtn = document.getElementById('navbar-whatsapp-btn');
    const mobileWhatsappBtn = document.getElementById('mobile-whatsapp-btn');
    const fixedWhatsappBtn = document.getElementById('fixed-whatsapp-btn');
    
    const defaultMessage = `Olá! Gostaria de fazer um pedido. Sou de [CIDADE NÃO SELECIONADA]`;
    const defaultLink = `https://wa.me/${TELE_VENDAS_PHONE}?text=${encodeURIComponent(defaultMessage)}`;
    
    whatsappCTAPage.href = defaultLink;
    whatsappText.textContent = 'Fale com nosso Tele Vendas';
    repInfoDiv.classList.add('hidden');
    
    navbarWhatsappBtn.href = defaultLink;
    mobileWhatsappBtn.href = defaultLink;
    if (fixedWhatsappBtn) fixedWhatsappBtn.href = defaultLink; 

    const navbarSpan = navbarWhatsappBtn.querySelector('span');
    if (navbarSpan) navbarSpan.textContent = 'WhatsApp';
}

function updateWhatsAppLinks(selectElement) {
    const whatsappCTAPage = document.getElementById('whatsapp-cta-page');
    const whatsappText = document.getElementById('whatsapp-text');
    const repInfoDiv = document.getElementById('representative-info');
    const repNameSpan = document.getElementById('rep-name');
    const repDeliveryDaySpan = document.getElementById('rep-delivery-day');
    const navbarWhatsappBtn = document.getElementById('navbar-whatsapp-btn');
    const mobileWhatsappBtn = document.getElementById('mobile-whatsapp-btn');
    const fixedWhatsappBtn = document.getElementById('fixed-whatsapp-btn');

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

    let whatsappMessage = `${DEFAULT_WHATSAPP_MESSAGE} Sou de ${city}.`;
    
    if (isTeleVendas) {
        whatsappMessage = `Olá! Gostaria de fazer um pedido. Sou de [CIDADE NÃO LISTADA]`;
    }

    const phone = isTeleVendas ? TELE_VENDAS_PHONE : repPhone;
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
    
    whatsappCTAPage.href = waLink;
    whatsappText.textContent = isTeleVendas ? 'Fale com o Tele Vendas' : `Falar com ${repName} via WhatsApp`;
    
    if (isTeleVendas) {
        repInfoDiv.classList.add('hidden');
    } else {
        repInfoDiv.classList.remove('hidden');
        repNameSpan.textContent = repName;
        repDeliveryDaySpan.textContent = deliveryDay;
    }
    
    // Atualiza todos os botões de WhatsApp
    navbarWhatsappBtn.href = waLink;
    mobileWhatsappBtn.href = waLink;
    if (fixedWhatsappBtn) fixedWhatsappBtn.href = waLink;
    
    const navbarSpan = navbarWhatsappBtn.querySelector('span');
    if (navbarSpan) {
         navbarSpan.textContent = isTeleVendas ? 'Tele Vendas' : `Falar com ${repName}`;
    }
}


// --- 3. Funções Auxiliares ---

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


// --- 4. Execução Principal do Script (Chamada no DOM pronto) ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos DOM ---
    const citySelectPage = document.getElementById('city-select-page');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Inicialização da Lógica de Negócio
    populateCitySelectors(); // Preenche os dropdowns
    setTeleVendasDefault();  // Configura os links para o Tele Vendas (Padrão)
    setupScrollReveal();     // Ativa as animações de scroll

    // --- Eventos ---
    // Evento principal de seleção de cidade (Atualiza todos os CTAs)
    citySelectPage.addEventListener('change', (e) => updateWhatsAppLinks(e.target));
    
    // Evento do menu mobile
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.querySelector('i').classList.toggle('bx-menu');
        mobileMenuButton.querySelector('i').classList.toggle('bx-x');
    });

    // Oculta/Exibe o botão WhatsApp flutuante ao rolar
    const fixedWhatsappBtn = document.getElementById('fixed-whatsapp-btn');
    if (fixedWhatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Mostra se rolou para baixo
                fixedWhatsappBtn.classList.remove('opacity-0', 'pointer-events-none');
                fixedWhatsappBtn.classList.add('opacity-100');
            } else { // Oculta no topo da página
                fixedWhatsappBtn.classList.add('opacity-0', 'pointer-events-none');
                fixedWhatsappBtn.classList.remove('opacity-100');
            }
        });
        // Oculta no carregamento inicial (no mobile, para não cobrir o CTA do Hero)
        fixedWhatsappBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});