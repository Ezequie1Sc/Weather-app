/* ========================================
   ATMÓSFERA v3.1 - Con Banderas e Iconos Profesionales
   ======================================== */

// ---------- CONFIGURACIÓN ----------
const CONFIG = {
    GEOCODING_API: 'https://nominatim.openstreetmap.org/search',
    WEATHER_API: 'https://api.open-meteo.com/v1/forecast',
    CACHE_DURATION: 10 * 60 * 1000,
};

// ---------- MAPEO DE PAÍSES A BANDERAS ----------
const COUNTRY_FLAGS = {
    'españa': '🇪🇸', 'spain': '🇪🇸',
    'francia': '🇫🇷', 'france': '🇫🇷',
    'reino unido': '🇬🇧', 'united kingdom': '🇬🇧', 'uk': '🇬🇧',
    'inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'england': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'alemania': '🇩🇪', 'germany': '🇩🇪',
    'italia': '🇮🇹', 'italy': '🇮🇹',
    'portugal': '🇵🇹',
    'países bajos': '🇳🇱', 'netherlands': '🇳🇱', 'holanda': '🇳🇱',
    'bélgica': '🇧🇪', 'belgium': '🇧🇪',
    'suiza': '🇨🇭', 'switzerland': '🇨🇭',
    'austria': '🇦🇹',
    'suecia': '🇸🇪', 'sweden': '🇸🇪',
    'noruega': '🇳🇴', 'norway': '🇳🇴',
    'dinamarca': '🇩🇰', 'denmark': '🇩🇰',
    'finlandia': '🇫🇮', 'finland': '🇫🇮',
    'irlanda': '🇮🇪', 'ireland': '🇮🇪',
    'polonia': '🇵🇱', 'poland': '🇵🇱',
    'grecia': '🇬🇷', 'greece': '🇬🇷',
    'rusia': '🇷🇺', 'russia': '🇷🇺',
    'estados unidos': '🇺🇸', 'united states': '🇺🇸', 'usa': '🇺🇸', 'ee.uu.': '🇺🇸',
    'canadá': '🇨🇦', 'canada': '🇨🇦',
    'méxico': '🇲🇽', 'mexico': '🇲🇽',
    'brasil': '🇧🇷', 'brazil': '🇧🇷',
    'argentina': '🇦🇷',
    'chile': '🇨🇱',
    'colombia': '🇨🇴',
    'perú': '🇵🇪', 'peru': '🇵🇪',
    'japón': '🇯🇵', 'japan': '🇯🇵',
    'china': '🇨🇳',
    'corea del sur': '🇰🇷', 'south korea': '🇰🇷',
    'india': '🇮🇳',
    'australia': '🇦🇺',
    'nueva zelanda': '🇳🇿', 'new zealand': '🇳🇿',
    'singapur': '🇸🇬', 'singapore': '🇸🇬',
    'egipto': '🇪🇬', 'egypt': '🇪🇬',
    'sudáfrica': '🇿🇦', 'south africa': '🇿🇦',
    'emiratos árabes': '🇦🇪', 'uae': '🇦🇪', 'dubái': '🇦🇪',
    'turquía': '🇹🇷', 'turkey': '🇹🇷',
};

// ---------- MAPEO DE CÓDIGOS WMO A WEATHER ICONS ----------
const WMO_ICONS = {
    0: { icon: 'wi-day-sunny', desc: 'Despejado', color: 'sunny' },
    1: { icon: 'wi-day-sunny-overcast', desc: 'Mayormente despejado', color: 'sunny' },
    2: { icon: 'wi-day-cloudy', desc: 'Parcialmente nublado', color: 'cloudy' },
    3: { icon: 'wi-cloud', desc: 'Nublado', color: 'cloudy' },
    45: { icon: 'wi-fog', desc: 'Niebla', color: 'fog' },
    48: { icon: 'wi-fog', desc: 'Niebla helada', color: 'fog' },
    51: { icon: 'wi-sprinkle', desc: 'Llovizna ligera', color: 'rainy' },
    53: { icon: 'wi-sprinkle', desc: 'Llovizna', color: 'rainy' },
    55: { icon: 'wi-sprinkle', desc: 'Llovizna densa', color: 'rainy' },
    61: { icon: 'wi-rain', desc: 'Lluvia ligera', color: 'rainy' },
    63: { icon: 'wi-rain', desc: 'Lluvia moderada', color: 'rainy' },
    65: { icon: 'wi-rain', desc: 'Lluvia fuerte', color: 'rainy' },
    71: { icon: 'wi-snow', desc: 'Nieve ligera', color: 'snowy' },
    73: { icon: 'wi-snow', desc: 'Nieve moderada', color: 'snowy' },
    75: { icon: 'wi-snow', desc: 'Nieve fuerte', color: 'snowy' },
    77: { icon: 'wi-snow', desc: 'Granizo', color: 'snowy' },
    80: { icon: 'wi-showers', desc: 'Chubascos ligeros', color: 'rainy' },
    81: { icon: 'wi-showers', desc: 'Chubascos moderados', color: 'rainy' },
    82: { icon: 'wi-showers', desc: 'Chubascos fuertes', color: 'rainy' },
    85: { icon: 'wi-snow', desc: 'Nevadas ligeras', color: 'snowy' },
    86: { icon: 'wi-snow', desc: 'Nevadas fuertes', color: 'snowy' },
    95: { icon: 'wi-thunderstorm', desc: 'Tormenta', color: 'stormy' },
    96: { icon: 'wi-thunderstorm', desc: 'Tormenta con granizo', color: 'stormy' },
    99: { icon: 'wi-thunderstorm', desc: 'Tormenta severa', color: 'stormy' },
};

// ---------- ESTADO GLOBAL ----------
const state = {
    currentWeather: null,
    currentCity: null,
    favorites: JSON.parse(localStorage.getItem('atmosfera_favorites')) || [],
    cache: new Map(),
    searchTimeout: null,
};

// ---------- UTILIDADES DE BANDERAS ----------
const FlagUtils = {
    getFlag(countryName) {
        if (!countryName) return '🌍';
        
        const normalized = countryName.toLowerCase().trim();
        
        // Buscar coincidencia exacta
        if (COUNTRY_FLAGS[normalized]) {
            return COUNTRY_FLAGS[normalized];
        }
        
        // Buscar coincidencia parcial
        for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return flag;
            }
        }
        
        return '🌍';
    },
    
    getCountryCode(countryName) {
        const flag = this.getFlag(countryName);
        // Convertir emoji de bandera a código de país
        if (flag === '🇪🇸') return 'es';
        if (flag === '🇫🇷') return 'fr';
        if (flag === '🇬🇧') return 'gb';
        if (flag === '🇩🇪') return 'de';
        if (flag === '🇮🇹') return 'it';
        if (flag === '🇺🇸') return 'us';
        if (flag === '🇯🇵') return 'jp';
        if (flag === '🇦🇺') return 'au';
        return 'un';
    }
};

// ---------- GESTIÓN DE FAVORITOS ----------
const FavoritesManager = {
    add(city) {
        const exists = state.favorites.some(f => 
            f.name.toLowerCase() === city.name.toLowerCase()
        );
        
        if (!exists) {
            state.favorites.push(city);
            this.save();
            this.render();
            return true;
        }
        return false;
    },
    
    remove(cityName) {
        state.favorites = state.favorites.filter(f => 
            f.name.toLowerCase() !== cityName.toLowerCase()
        );
        this.save();
        this.render();
        
        if (state.currentCity?.name.toLowerCase() === cityName.toLowerCase()) {
            UI.updateFavoriteToggle(false);
        }
    },
    
    isFavorite(cityName) {
        return state.favorites.some(f => 
            f.name.toLowerCase() === cityName.toLowerCase()
        );
    },
    
    save() {
        localStorage.setItem('atmosfera_favorites', JSON.stringify(state.favorites));
        document.getElementById('favorites-count').textContent = state.favorites.length;
    },
    
    render() {
        const container = document.getElementById('favorites-list');
        const count = document.getElementById('favorites-count');
        
        count.textContent = state.favorites.length;
        
        if (state.favorites.length === 0) {
            container.innerHTML = '<div class="empty-favorites"><i class="fa-regular fa-star"></i> Añade ciudades a favoritos</div>';
            return;
        }
        
        container.innerHTML = state.favorites.map(city => {
            const flag = FlagUtils.getFlag(city.country);
            return `
                <div class="favorite-item" data-city="${city.name}" data-lat="${city.lat}" data-lon="${city.lon}" data-country="${city.country || ''}">
                    <span class="favorite-flag">${flag}</span>
                    <i class="fa-solid fa-star"></i>
                    <span>${city.name}</span>
                    <span class="favorite-remove" data-remove="${city.name}">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </span>
                </div>
            `;
        }).join('');
        
        container.querySelectorAll('.favorite-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-remove')) {
                    const lat = parseFloat(item.dataset.lat);
                    const lon = parseFloat(item.dataset.lon);
                    const name = item.dataset.city;
                    const country = item.dataset.country;
                    
                    WeatherService.getWeatherByCoords(lat, lon, { name, country });
                }
            });
        });
        
        container.querySelectorAll('.favorite-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const cityName = btn.dataset.remove;
                FavoritesManager.remove(cityName);
            });
        });
    },
};

// ---------- SERVICIO DE BÚSQUEDA ----------
const SearchService = {
    async searchCity(query) {
        if (query.length < 2) return [];
        
        try {
            const params = new URLSearchParams({
                q: query,
                format: 'json',
                limit: 5,
                addressdetails: 1,
            });
            
            const response = await fetch(`${CONFIG.GEOCODING_API}?${params}`, {
                headers: {
                    'Accept-Language': 'es',
                    'User-Agent': 'Atmosfera-Weather-App/3.1'
                }
            });
            
            const data = await response.json();
            
            return data.map(place => ({
                name: place.address.city || place.address.town || place.address.village || query,
                country: place.address.country || '',
                lat: parseFloat(place.lat),
                lon: parseFloat(place.lon),
                displayName: place.display_name,
                flag: FlagUtils.getFlag(place.address.country || ''),
            }));
            
        } catch (error) {
            console.error('Error en búsqueda:', error);
            return [];
        }
    },
    
    showSuggestions(results) {
        const container = document.getElementById('search-suggestions');
        
        if (results.length === 0) {
            container.classList.remove('active');
            return;
        }
        
        container.innerHTML = results.map(place => `
            <div class="suggestion-item" data-lat="${place.lat}" data-lon="${place.lon}" data-name="${place.name}" data-country="${place.country}">
                <span class="suggestion-flag">${place.flag}</span>
                <div class="suggestion-info">
                    <div class="suggestion-name">${place.name}</div>
                    <div class="suggestion-country">${place.country}</div>
                </div>
            </div>
        `).join('');
        
        container.classList.add('active');
        
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const lat = parseFloat(item.dataset.lat);
                const lon = parseFloat(item.dataset.lon);
                const name = item.dataset.name;
                const country = item.dataset.country;
                
                container.classList.remove('active');
                document.getElementById('city-search').value = '';
                
                WeatherService.getWeatherByCoords(lat, lon, { name, country });
            });
        });
    },
};

// ---------- SERVICIO METEOROLÓGICO ----------
const WeatherService = {
    async getWeatherByCoords(lat, lon, cityInfo = {}) {
        UI.showLoading();
        UI.hideError();
        
        try {
            const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
            const cached = state.cache.get(cacheKey);
            
            let weatherData;
            if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
                weatherData = cached.data;
            } else {
                const params = new URLSearchParams({
                    latitude: lat,
                    longitude: lon,
                    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,weather_code,pressure_msl,visibility,is_day',
                    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                    timezone: 'auto',
                    forecast_days: 6,
                });
                
                const response = await fetch(`${CONFIG.WEATHER_API}?${params}`);
                weatherData = await response.json();
                
                state.cache.set(cacheKey, {
                    data: weatherData,
                    timestamp: Date.now(),
                });
            }
            
            if (!cityInfo.name) {
                cityInfo = await this.getCityInfo(lat, lon);
            }
            
            state.currentWeather = weatherData;
            state.currentCity = { ...cityInfo, lat, lon };
            
            UI.renderWeather(weatherData, cityInfo);
            UI.hideLoading();
            
        } catch (error) {
            console.error('Error obteniendo clima:', error);
            UI.showError('Error al obtener datos meteorológicos');
            UI.hideLoading();
        }
    },
    
    async getCityInfo(lat, lon) {
        try {
            const params = new URLSearchParams({ lat, lon, format: 'json', addressdetails: 1 });
            const response = await fetch(`${CONFIG.GEOCODING_API}?${params}`, {
                headers: { 'Accept-Language': 'es' }
            });
            const data = await response.json();
            
            return {
                name: data.address?.city || data.address?.town || 'Ubicación',
                country: data.address?.country || '',
            };
        } catch {
            return { name: 'Ubicación', country: '' };
        }
    },
};

// ---------- RENDERIZADO DE UI ----------
const UI = {
    showLoading() {
        document.getElementById('search-btn')?.classList.add('loading');
    },
    
    hideLoading() {
        document.getElementById('search-btn')?.classList.remove('loading');
    },
    
    showError(message) {
        const banner = document.getElementById('error-banner');
        banner.textContent = message;
        banner.classList.add('visible');
        setTimeout(() => banner.classList.remove('visible'), 5000);
    },
    
    hideError() {
        document.getElementById('error-banner').classList.remove('visible');
    },
    
    updateFavoriteToggle(isFavorite) {
        const btn = document.getElementById('favorite-toggle');
        const icon = btn.querySelector('i');
        
        if (isFavorite) {
            btn.classList.add('active');
            icon.className = 'fa-solid fa-star';
        } else {
            btn.classList.remove('active');
            icon.className = 'fa-regular fa-star';
        }
    },
    
    renderWeather(data, city) {
        const current = data.current;
        const display = document.getElementById('weather-display');
        const isDay = current.is_day === 1;
        
        // Obtener icono WMO
        const wmoCode = current.weather_code;
        let wmoInfo = WMO_ICONS[wmoCode];
        
        if (!wmoInfo) {
            wmoInfo = { icon: 'wi-na', desc: 'Desconocido', color: 'default' };
        }
        
        // Ajustar icono para noche
        let iconClass = wmoInfo.icon;
        if (!isDay && iconClass.includes('day-')) {
            iconClass = iconClass.replace('day-', 'night-');
        }
        
        // Bandera y ubicación
        const flag = FlagUtils.getFlag(city.country);
        document.getElementById('country-flag').textContent = flag;
        document.getElementById('location').textContent = city.name;
        document.getElementById('country-info').textContent = city.country || '';
        
        // Condición climática con icono
        const weatherCondition = document.getElementById('weather-main');
        weatherCondition.innerHTML = `<i class="wi ${iconClass}"></i><span>${wmoInfo.desc}</span>`;
        
        // Icono principal
        const iconElement = document.getElementById('weather-icon');
        iconElement.className = `wi ${iconClass}`;
        
        // Temperaturas y métricas
        document.getElementById('main-temperature').textContent = `${Math.round(current.temperature_2m)}°C`;
        document.getElementById('feels-like').textContent = `${Math.round(current.apparent_temperature)}°C`;
        document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
        document.getElementById('wind').textContent = `${Math.round(current.wind_speed_10m * 3.6)} km/h`;
        document.getElementById('wind-gust').textContent = `${Math.round(current.wind_gusts_10m * 3.6)} km/h`;
        document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
        document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;
        
        // Timestamp
        const now = new Date();
        document.getElementById('fetch-time').textContent = 
            `Actualizado: ${now.toLocaleDateString('es-MX')} ${now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
        
        // Previsión 5 días
        this.renderForecast(data.daily);
        
        // Toggle de favorito
        this.updateFavoriteToggle(FavoritesManager.isFavorite(city.name));
        
        // Mostrar panel
        display.classList.add('visible');
    },
    
    renderForecast(daily) {
        const container = document.getElementById('forecast-container');
        
        container.innerHTML = daily.time.slice(1, 6).map((time, i) => {
            const date = new Date(time);
            const wmoCode = daily.weather_code[i + 1];
            let wmoInfo = WMO_ICONS[wmoCode] || { icon: 'wi-na', desc: 'N/A' };
            
            return `
                <div class="forecast-day">
                    <div class="forecast-day-name">
                        ${date.toLocaleDateString('es-MX', { weekday: 'short' })}
                    </div>
                    <div class="forecast-icon">
                        <i class="wi ${wmoInfo.icon}"></i>
                    </div>
                    <div class="forecast-temp">
                        <span class="forecast-temp-max">${Math.round(daily.temperature_2m_max[i + 1])}°</span>
                        <span class="forecast-temp-min">${Math.round(daily.temperature_2m_min[i + 1])}°</span>
                    </div>
                </div>
            `;
        }).join('');
    },
};

// ---------- INICIALIZACIÓN ----------
document.addEventListener('DOMContentLoaded', () => {
    FavoritesManager.render();
    
    const searchInput = document.getElementById('city-search');
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(state.searchTimeout);
        
        state.searchTimeout = setTimeout(async () => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                const results = await SearchService.searchCity(query);
                SearchService.showSuggestions(results);
            } else {
                document.getElementById('search-suggestions').classList.remove('active');
            }
        }, 300);
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) {
            document.getElementById('search-suggestions').classList.remove('active');
        }
    });
    
    document.getElementById('search-btn').addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) return;
        
        const results = await SearchService.searchCity(query);
        if (results.length > 0) {
            const first = results[0];
            WeatherService.getWeatherByCoords(first.lat, first.lon, first);
            document.getElementById('search-suggestions').classList.remove('active');
            searchInput.value = '';
        }
    });
    
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query.length < 2) return;
            
            const results = await SearchService.searchCity(query);
            if (results.length > 0) {
                const first = results[0];
                WeatherService.getWeatherByCoords(first.lat, first.lon, first);
                document.getElementById('search-suggestions').classList.remove('active');
                searchInput.value = '';
            }
        }
    });
    
    document.getElementById('favorite-toggle').addEventListener('click', () => {
        if (!state.currentCity) return;
        
        if (FavoritesManager.isFavorite(state.currentCity.name)) {
            FavoritesManager.remove(state.currentCity.name);
        } else {
            FavoritesManager.add(state.currentCity);
            UI.updateFavoriteToggle(true);
        }
    });
    
    console.log('🌤️ Atmósfera v3.1 - Con banderas e iconos profesionales');
});