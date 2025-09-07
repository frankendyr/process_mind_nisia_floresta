import React, { useState } from 'react';

const OpenStreetMapComponent = ({ unidades, tipo }) => {
  const [selectedUnidade, setSelectedUnidade] = useState(null);

  // Coordenadas aproximadas de Nísia Floresta, RN
  const defaultCenter = { lat: -6.09083, lng: -35.2089 };

  // Função para obter coordenadas fixas das unidades
  // Coordenadas reais ou aproximadas baseadas na localização de Nísia Floresta
  const getCoordinates = (unidade, index) => {
    // Se a unidade já tem coordenadas definidas, usar essas
    if (unidade.lat && unidade.lng) {
      return { lat: unidade.lat, lng: unidade.lng };
    }

    // Coordenadas fixas baseadas no tipo e localização
    const coordenadasFixas = {
      // Unidades urbanas - Centro de Nísia Floresta
      'Hospital': { lat: -6.0900, lng: -35.2080 },
      'Centro de Saúde': { lat: -6.0890, lng: -35.2070 },
      'CAPS': { lat: -6.0895, lng: -35.2075 },
      'CEO': { lat: -6.0905, lng: -35.2085 },
      'Centro Especializado': { lat: -6.0910, lng: -35.2090 },
      'UBS_urbana': { lat: -6.0915, lng: -35.2095 },
      
      // Distritos rurais/litorâneos - coordenadas aproximadas
      'Alcaçuz': { lat: -6.0950, lng: -35.2150 },
      'Barreta': { lat: -6.0100, lng: -35.0600 },
      'Búzios': { lat: -6.0000, lng: -35.0500 },
      'Currais': { lat: -6.1000, lng: -35.2200 },
      'Morrinhos': { lat: -6.1100, lng: -35.2300 },
      'Timbó': { lat: -6.1200, lng: -35.2400 },
      'Pirangi do Sul': { lat: -6.0300, lng: -35.0800 },
      'Pium': { lat: -6.0200, lng: -35.0700 },
      'Tabatinga': { lat: -6.0400, lng: -35.0900 },
      'Porto': { lat: -6.1300, lng: -35.2500 },
      'Tororomba': { lat: -6.1400, lng: -35.2600 },
      'Campo de Santana': { lat: -6.1500, lng: -35.2700 },
      'Hortigranjeira': { lat: -6.1600, lng: -35.2800 },
      'Lago Azul': { lat: -6.1700, lng: -35.2900 },
      'Mazapas': { lat: -6.1800, lng: -35.3000 },
    };

    // Determinar coordenadas baseadas no tipo e zona
    if (unidade.zona === 'rural') {
      const rurais = ['Alcaçuz', 'Currais', 'Morrinhos', 'Timbó', 'Porto', 'Tororomba', 'Campo de Santana', 'Hortigranjeira', 'Mazapas'];
      const ruralIndex = index % rurais.length;
      return coordenadasFixas[rurais[ruralIndex]];
    } else if (unidade.zona === 'litorânea') {
      const litoraneas = ['Barreta', 'Búzios', 'Pirangi do Sul', 'Pium', 'Tabatinga'];
      const litoraneaIndex = index % litoraneas.length;
      return coordenadasFixas[litoraneas[litoraneaIndex]];
    } else {
      // Para unidades urbanas
      return coordenadasFixas[unidade.tipo] || coordenadasFixas['UBS_urbana'];
    }
  };

  // Gerar URL do OpenStreetMap Embed
  const generateMapUrl = () => {
    // Exemplo de URL para um mapa estático ou iframe do OpenStreetMap
    // Para marcadores dinâmicos, seria necessário uma biblioteca JS de mapas
    return `https://www.openstreetmap.org/export/embed.html?bbox=${defaultCenter.lng - 0.05},${defaultCenter.lat - 0.05},${defaultCenter.lng + 0.05},${defaultCenter.lat + 0.05}&layer=mapnik&marker=${defaultCenter.lat},${defaultCenter.lng}`;
  };

  return (
    <div className="relative h-full">
      {/* Mapa base do OpenStreetMap */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={generateMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
        
        {/* Overlay com marcadores customizados (simulados) */}
        {/* Esta parte é para simular marcadores sobre o iframe, mas não são interativos com o mapa */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            {unidades.slice(0, 30).map((unidade, index) => {
              const coords = getCoordinates(unidade, index);
              // Converter coordenadas geográficas para pixels (aproximação)
              // Estes valores são muito dependentes do zoom e da área do mapa no iframe
              // Para um mapa real, usaríamos as coordenadas do mapa base
              const x = ((coords.lng - (defaultCenter.lng - 0.05)) / 0.1) * 100;
              const y = ((defaultCenter.lat + 0.05 - coords.lat) / 0.1) * 100;
              
              return (
                <g key={index}>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="6"
                    fill="red"
                    stroke="white"
                    strokeWidth="2"
                    className="pointer-events-auto cursor-pointer hover:r-8 transition-all"
                    onClick={() => setSelectedUnidade(unidade)}
                  />
                  <text
                    x={`${x}%`}
                    y={`${y + 15}%`}
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-800 pointer-events-none"
                    style={{ fontSize: '10px' }}
                  >
                    {unidade.nome?.split(' ')[0] || unidade.unidade?.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Modal de detalhes */}
      {selectedUnidade && (
        <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg border max-w-xs z-10">
          <button
            onClick={() => setSelectedUnidade(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <h4 className="font-bold text-sm mb-2 text-gray-800">
            {selectedUnidade.nome || selectedUnidade.unidade}
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Tipo:</strong> {selectedUnidade.tipo}</p>
            <p><strong>Endereço:</strong> {selectedUnidade.endereco}</p>
            <p><strong>Zona:</strong> {selectedUnidade.zona}</p>
            {selectedUnidade.telefone && (
              <p><strong>Telefone:</strong> {selectedUnidade.telefone}</p>
            )}
            {selectedUnidade.email && (
              <p><strong>Email:</strong> {selectedUnidade.email}</p>
            )}
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Clique nos marcadores para ver detalhes das unidades
      </div>
    </div>
  );
};

export default OpenStreetMapComponent;
